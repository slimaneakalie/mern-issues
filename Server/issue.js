'use strict';

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

module.exports = {
	validateIssue
};