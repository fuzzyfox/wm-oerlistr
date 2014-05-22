'use strict';

var argv = require('minimist')(process.argv.slice(2));
var makeapi = new require('makeapi-client')({
	apiURL: 'https://makeapi.webmaker.org'
});

var allMakes = [];

function debug() {
	if( argv.debug ) {
		return console.log.apply( null, arguments );
	}

	return;
}

// run search w/ pagination
function next( page ) {
	debug( 'searching for OERs – page ' + page );
	makeapi.tags( [ 'teach' ] ).limit( 100 ).page( page ).then( function( err, makes ) {
		if( err ) {
			return console.error( err );
		}

		if( makes.length > 0 ) {
			allMakes = allMakes.concat( makes );
			next( page + 1 );
		}
		else {
			done();
		}
	});
}

// output just users
function done() {
	debug( 'done searching, processing data' );

	var rtn = {};
	var users = [];

	allMakes.forEach( function( make, idx ) {
		if( users.indexOf( make.username ) === -1 ) {
			users.push( make.username );

			rtn[ make.username ] = {
				emailHash: '',
				OERs: []
			};

			rtn[ make.username ].emailHash = make.emailHash;
		}

		rtn[ make.username ].OERs.push( make );
	});

	if( argv.stats ) {
		debug( 'stats requested instead of dataset' );

		// get some counts related to users
		var OERCounts = [];
		for( var user in rtn ) {
			user = rtn[ user ];
			OERCounts.push( user.OERs.length );
		}

		var stats = {
			users: users.length,
			OERs: allMakes.length,
			minOERsPerUser: Math.min.apply( null, OERCounts ),
			maxOERsPerUser: Math.max.apply( null, OERCounts ),
			avgOERsPerUser: allMakes.length/users.length
		};

		return console.log( JSON.stringify( stats ) );
	}

	console.log( JSON.stringify( rtn ) );
}

// initiate search
next( 1 );
