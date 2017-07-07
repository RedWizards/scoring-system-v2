
exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('event', (table) => {
		 	table.increments().primary();
		 	table.string('event_name');
		 	table.string('event_desc');
		 	table.string('event_host');
		 	table.date('event_date');
		})
		.createTable('criteria', (table) => {
		 	table.increments().primary();
		 	table.integer('event_id', 10).references('id').inTable('event').onDelete('cascade');
		 	table.string('criteria_name');
		 	table.string('criteria_desc');
		 	table.integer('criteria_max_value');
		})
		.createTable('stages', (table) => {
		 	table.increments().primary();
		 	table.integer('event_id', 10).references('id').inTable('event').onDelete('cascade');
		 	table.string('stage_name');
		})
		.createTable('sets', (table) => {
		 	table.increments().primary();
		 	table.integer('stage_id', 10).references('id').inTable('stages').onDelete('cascade');
		 	table.string('set_name');
		})
		.createTable('team', (table) => {
		 	table.increments().primary();
		 	table.string('team_name');
		})
		.createTable('set_teams', (table) => {
		 	table.increments().primary();
		 	table.integer('set_id', 10).references('id').inTable('sets').onDelete('cascade');
		 	table.integer('team_id', 10).references('id').inTable('team').onDelete('cascade');
		})
		.createTable('judge', (table) => {
		 	table.increments().primary();
		 	table.string('judge_name');
		})
		.createTable('set_judges', (table) => {
		 	table.increments().primary();
		 	table.integer('set_id', 10).references('id').inTable('sets').onDelete('cascade');
		 	table.integer('judge_id', 10).references('id').inTable('judge').onDelete('cascade');
		})
		.createTable('application', (table) => {
		 	table.increments().primary();
		 	table.integer('event_id', 10).references('id').inTable('event').onDelete('cascade');
		 	table.integer('team_id', 10).references('id').inTable('team').onDelete('cascade');
		 	table.string('app_name');
		 	table.string('app_shortdesc');
		 	table.string('app_longdesc');
		 	table.string('app_type');
		})
		.createTable('participants', (table) => {
		 	table.increments().primary();
		 	table.integer('team_id', 10).references('id').inTable('team').onDelete('cascade');
		 	table.string('participant_name');
		})
		.createTable('score', (table) => {
		 	table.increments().primary();
		 	table.integer('set_teams_id', 10).references('id').inTable('set_teams').onDelete('cascade');
		 	table.integer('criteria_id', 10).references('id').inTable('criteria').onDelete('cascade');
		 	table.integer('score');
		});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('score')
		.dropTable('participants')
		.dropTable('application')
		.dropTable('set_judges')
		.dropTable('judge')
		.dropTable('set_teams')
		.dropTable('team')
		.dropTable('sets')
		.dropTable('stages')
		.dropTable('criteria')
		.dropTable('event');
};
