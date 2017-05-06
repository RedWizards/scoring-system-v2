var express = require('express');
var router = express.Router();

//home
router.get('/', (req, res, next) => {
	res.send('RED Wizard Hackathon Scoring API v1.0');
});

//-----EVENT

var eventService = require('../db/service/event');

/**
	Route: localhost:----/api/events
	Request Method: GET
	Parameter: none
	Description: Get the list of all events
**/
router.get('/events', (req, res, next) => {
	return eventService.getEvent()
		.then(result => {res.status(200).json(result)})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/events
	Request Method: POST
	Parameter: none
	Body Requirements:
		-event_name
		-event_host
		-event_desc
		-event_date
	Description: Add an event
**/
router.post('/events', (req, res, next) => {
	let data = {};

	data.name = req.body.event_name;
	data.host = req.body.event_host;
	data.desc = req.body.event_desc;
	data.date = req.body.event_date;

	return eventService.addEvent(data)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/events/:event_id
	Request Method: PUT
	Parameter: event_id
	Body Requirements:
		-event_name
		-event_host
		-event_desc
		-event_date
	Description: Update all the details of an event
**/
router.put('/events/:event_id', (req, res, next) => {
	let id = req.params.event_id || null,
		data = {};

	console.log(req);

	data.event_name = req.body.event_name;
	data.event_host = req.body.event_host;
	data.event_desc = req.body.event_desc;
	data.event_date = req.body.event_date;

	if(id){
		return eventService.updateEvent(id, data)
			.then(result => {res.status(200).json(result)})
			.catch(err => {
				console.log(err);
				res.status(400).json({
					error: "Bad Request"
				});
			});
	}
});

//-----CRTERIA

var criteriaService = require('../db/service/criteria');

/**
	Route: localhost:----/api/criteria/:event_id
	Request Method: GET
	Parameter: event_id
	Body Requirements: none
	Description: Get all the specified criterias for a hack event
**/
router.get('/criteria/:event_id', (req, res, next) => {
	let id = req.params.event_id

	return criteriaService.getCriteria(id)
		.then(result => {res.status(200).json(result)})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/criteria/
	Request Method: POST
	Parameter: none
	Body Requirements:
		-event_id
		-criteria_desc
		-criteria_weight
		-criteria_longdesc
	Description: Create criteria for an event
**/
router.post('/criteria', (req, res, next) => {
	let data = {};

	data.event_id = req.body.event_id;
	data.criteria_desc = req.body.criteria_desc;
	data.criteria_weight = req.body.criteria_weight;
	data.criteria_longdesc = req.body.criteria_longdesc;

	return criteriaService.addCriteria(data)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/criteria/:id
	Request Method: PUT
	Parameter: id - criteria_id
	Body Requirements:
		-event_id
		-criteria_desc
		-criteria_weight
		-criteria_longdesc
	Description: Update a criteria
**/
router.put('/criteria/:id', (req, res, next) => {
	let id = req.params.id || null,
		data = {};

	data.event_id = req.body.event_id;
	data.criteria_desc = req.body.criteria_desc;
	data.criteria_weight = req.body.criteria_weight;
	data.criteria_longdesc = req.body.criteria_longdesc;

	if(id){
		return criteriaService.updateCriteria(id, data)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json({
					error: "Bad Request"
				});
			});
	}
});

//-----JUDGE

var judgeService = require('../db/service/judge');

/**
	Route: localhost:----/api/judge/:event_id
	Request Method: GET
	Parameter: event_id
	Body Requirements: none
	Description: Get the list of registered judges for a hack event
**/
router.get('/judge/:event_id', (req, res, next) => {
	let id = req.params.event_id

	return judgeService.getJudge(id)
		.then(result => {res.status(200).json(result)})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/judge/
	Request Method: POST
	Parameter: none
	Body Requirements: 
		-event_id
		-judge_name
	Description: Create a judge profile ready for scoring
**/
router.post('/judge', (req, res, next) => {
	let data = {};

	data.event_id = req.body.event_id;
	data.judge_name = req.body.judge_name;

	return criteriaService.addCriteria(data)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/judge/:id
	Request Method: PUT
	Parameter: id - judge_id
	Body Requirements: 
		-event_id
		-judge_name
	Description: Update judge detail
**/
router.put('/judge/:id', (req, res, next) => {
	let id = req.params.id || null,
		data = {};

	data.event_id = req.body.event_id;
	data.judge_name = req.body.judge_name;

	if(id){
		return judgeService.updateJudge(id, data)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json({
					error: "Bad Request"
				});
			});
	}
});

//-----TEAM

var teamService = require('../db/service/team');

/**
	Route: localhost:----/api/team/
	Request Method: GET
	Parameter: none
	Body Requirements: none
	Sample Response:
		{
			"id":1,
			"team_name":"LaurelEye"
		}
	Description: Get the list of all teams

	TODO: Include the members
**/
router.get('/team', (req, res, next) => {
	let id = req.params.event_id

	return teamService.getTeam(id)
		.then(result => {res.status(200).json(result)})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/team/
	Request Method: POST
	Parameter: none
	Body Requirements:
		-team_name
	Sample Response:
		{
			id: 1
		}
	Description: Create a team profile ready for scoring
**/
router.post('/team', (req, res, next) => {
	let data = {};

	data.team_name = req.body.team_name;

	return teamService.addTeam(data)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/team/:id
	Request Method: PUT
	Parameter: id - team_id
	Body Requirements: 
		-team_name
	Description: Update team details
**/
router.put('/team/:id', (req, res, next) => {
	let id = req.params.id || null,
		data = {};

	data.team_name = req.body.team_name;

	if(id){
		return teamService.updateTeam(id, data)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json({
					error: "Bad Request"
				});
			});
	}
});

//-----PROJECT

var projectService = require('../db/service/project');

/**
	Route: localhost:----/api/project/:event_id
	Request Method: GET
	Parameter: event_id
	Body Requirements: none
	Description: Get all the projects involved to a hack event

	TODO: Make this method to return even the project authors
**/
router.get('/project/:event_id', (req, res, next) => {
	let id = req.params.event_id

	return projectService.getProject(id)
		.then(result => {res.status(200).json(result)})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

/**
	Route: localhost:----/api/project/
	Request Method: POST
	Parameter: none
	Body Requirements:
		-event_id
		-project_name
		-project_type
		-short_desc
		-long_desc
	Description: Create a project entry for an specified event
**/
router.post('/project', (req, res, next) => {
	let data = {};

	data.team_id = req.body.team_id;
	data.event_id = req.body.event_id;
	data.project_name = req.body.project_name;
	data.project_type = req.body.project_type;
	data.short_desc = req.body.short_desc;
	data.long_desc = req.body.long_desc;

	return projectService.addProject(data)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: "Internal Server Error"
			});
		});
});

router.put('/project/:id', (req, res, next) => {
	let id = req.params.id || null,
		data = {};

	data.team_id = req.body.team_id;
	data.event_id = req.body.event_id;
	data.project_name = req.body.project_name;
	data.project_type = req.body.project_type;
	data.short_desc = req.body.short_desc;
	data.long_desc = req.body.long_desc;

	if(id){
		return projectService.updateProject(id, data)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json({
					error: "Bad Request"
				});
			});
	}
});


module.exports = router;