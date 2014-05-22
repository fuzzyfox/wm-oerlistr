# wm-oerlistr
A simple hack to list all exisiting teaching resources in wm.o and dedupe users, then spit out a list of users + resources

## Install

	git clone https://github.com/fuzzyfox/wm-oerlistr.git
	cd wm-oerlistr
	npm install

## Usage
### As module

	var oerlist = require( 'wm-oerlistr' );
	var debug = true; // false by default

	// get stats
	oerlist.getUserStats( function( statsObj ) {
		// do something
	}, debug );

	// get oers by user
	oerlist.getUserOERs( function( userOERObj ) {
		// do something
	}, debug );

#### Stats object

	{
	  users: 308, // number of users w/ oers
	  OERs: 703, // number of oers
	  minOERsPerUser: 1, // min oers per user
	  maxOERsPerUser: 36, // max oers per user
	  avgOERsPerUser: 2.2824675324675323 // average oers per user
	}

#### User OER List object

	{
	  'user1': {
	    emailHash: '', // users email hash (string)
	    OERs: [ make, make, make ] // array of MakeAPI make objects
	  }
	}

### Commandline
#### Get list of OERs by user:

	node app.js

#### Get stats (only stats)

	node app.js --stats

#### Debug

	node app.js --debug
