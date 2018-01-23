const issueValidator = require('./issue.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
let db;

/* const issues = [
	{
		id: 1, status: 'Open', owner: 'Ravan',
		created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
		title: 'Error in console when 1 clicking Add',
	},
	{
		id: 2, status: 'Assigned', owner: 'Eddie',
		created: new Date('2016-08-16'), effort: 14,
		completionDate: new Date('2016-08-30'),
		title: 'Missing bottom border on panel',
	}
]; */ 

//app.use('/public', express.static('MyStaticPages'));


app.use(express.static('MyStaticPages'));
app.use(bodyParser.json());

app.get('/api/issues', (req, res) => {
	db.collection('issues').find().toArray()
		.then(issues => {
			const metadata = { total_count : issues.length };	
			res.json({_metadata : metadata, records : issues});

			})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message : `Internal Server Error : ${error}`});
		});
});

app.get('/hi/:user', (req, res) => {
	//res.send({content : `Hello ${req.params.user} !!`});
	res.send(`Hello ${req.params.user} !!`);
});

app.post('/api/issues', (req, res) => {
	const newIssue = req.body;
	if (!newIssue.status)
		newIssue.status = 'New';
	
	newIssue.created = new Date();
	const error = issueValidator.validateIssue(newIssue);
	if (error){
		res.status(422).json({ message : `Invalid request : ${error}`});
		return;
	}

	db.collection('issues').insertOne(newIssue).then( result =>
		db.collection('issues').find({ _id : result.insertedId }).limit(1).next()
	).then(newIssue => {
		res.json(newIssue);
	}).catch(error => {
		console.log(error);
		res.status(500).json({ message : `Internal serve error : ${error}` });
	});
	/*issues.push(newIssue);
	res.json(newIssue);	*/
	
});

MongoClient.connect('mongodb://localhost:27017/')
			.then(client => {
				 db = client.db('IssueTracker');
				 app.listen(300, function() {
					console.log('Server Started on port 300');
				});	
			})
			.catch(error => {
				console.log(`ERROR : ${error}`);
			});

/*
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
	let db = client.db('IssueTracker');
	db.collection('issues').find().toArray((err, docs) => {
		console.log('Result of find : ');
		console.dir(docs);
		client.close();
	});
});*/