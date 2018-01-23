const REQUIRED = 'required';
const OPTIONAL = 'optional';

const validIssueStatus = {
	New : true,
	Open : true,
	Assigned : true,
	Fixed : true,
	Verified : true,
	Closed : true
};

const issueFieldType = {
	id : REQUIRED,
	status : REQUIRED,
	owner : REQUIRED,
	effort : OPTIONAL,
	created : REQUIRED,
	completionDate : OPTIONAL,
	title : REQUIRED
};

function validateIssue(issue)
{
	for (const field in issueFieldType){
		const type = issueFieldType[field];
		if (!type)
			delete issue[field];
		else if (type == REQUIRED && !issue[field])
			return `${field} is required.`;
	}

	if (!validIssueStatus[issue.status])
		return `${issue.status} is not a valid status.`;

	return null;
}

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const issues = [
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
];

//app.use('/public', express.static('MyStaticPages'));
app.use(express.static('MyStaticPages'));
app.use(bodyParser.json());

app.get('/api/issues', (req, res) => {
	const metadata = { total_count : issues.length };
	res.json({_metadata : metadata, records : issues});
});

app.get('/hi/:user', (req, res) => {
	//res.send({content : `Hello ${req.params.user} !!`});
	res.send(`Hello ${req.params.user} !!`);
});

app.post('/api/issues', (req, res) => {
	const newIssue = req.body;
	newIssue.id = issues.length + 1;
	if (!newIssue.status)
		newIssue.status = 'New';
	
	newIssue.created = new Date();
	const error = validateIssue(newIssue);
	if (!error){
		issues.push(newIssue);
		res.json(newIssue);	
	}else
		res.status(422).json({ message : `Invalid request : ${error}`});
	
	
});

app.listen(300, function() {
	console.log('Server Started on port 300');
});	