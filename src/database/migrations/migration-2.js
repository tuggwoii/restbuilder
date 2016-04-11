'use strict';
var Log = require('../../helpers/log');
var knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: "ec2-54-225-223-40.compute-1.amazonaws.com",
        port: 5432,
        user: "uvevopketrcogl",
        password: "ifzYVY7zaNGUBDO81GEFZAHYWz",
        database: "d321hdjl38ar33",
        ssl: true
    }
});

exports.up = function () {
    knex.schema.createTable('apps', function (table) {
        table.increments('id');
        table.string('name');
        table.string('public_key').unique();
        table.integer('owner')
            .references('id')
            .inTable('users');
        table.integer('created_by')
            .references('id')
            .inTable('users');
        table.integer('updated_by')
            .references('id')
            .inTable('users');
        table.timestamp('created_datetime').defaultTo(knex.fn.now());
        table.timestamp('updated_datetime');
    }).then(function () {
        knex.schema.createTableIfNotExists('users', function (table) {
            table.string('email').unique();
        }).then(function () {
            knex.schema.createTable('apps_users', function (table) {
                table.integer('user_id').references('users.id');
                table.integer('app_id').references('apps.id');
            }).then(function () {
                Log.write('migration success');
                process.exit();
            }).catch(function (err) {
                Log.write(err);
                process.exit();
            });
        }).catch(function (err) {
            Log.write(err);
            process.exit();
        });
    }).catch(function (err) {
        Log.write(err);
        process.exit();
	});
};

exports.down = function () {
    knex.schema.dropTable('apps_users').then(function () {
        knex.schema.dropTable('apps').then(function () {
            Log.write('migration reverse success');
            process.exit();
        }).catch(function (err) {
            Log.write(err);
            process.exit();
        });
    }).catch(function (err) {
        Log.write(err);
        process.exit();
    });
};
