//Select / create the database
let db = new Mongo().getDB('IssueTracker');
//Remove the existing issues 
db.issues.remove({});
//Insert documents into the issues collection
db.issues.insertMany([
	{
		status: 'Open', owner: 'Ravan',
		created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
		title: 'Error in console when 1 clicking Add',
	},
	{
		status: 'Assigned', owner: 'Eddie',
		created: new Date('2016-08-16'), effort: 14,
		completionDate: new Date('2016-08-30'),
		title: 'Missing bottom border on panel',
	}
]);
//Create indexes
db.issues.createIndex({ status : 1 });
db.issues.createIndex({ owner : 1 });
db.issues.createIndex({ created : 1 });
//{ status: 'Close', owner: 'Ravan', created: new Date('2016-08-15'), effort: 5, completionDate: undefined, title: 'Error in console when 1 clicking Add', }