var express = require('express');
var app = express();
var DB_NAME = 'test';  // name of MongoDB database
var COLLECTION_NAME = 'mock_db3'; //name of MongoDB collection
var HOST_PORT = 3000; // port that express will serve files from
var DB_PORT = 27017;	//port that MongoDB is serving files from

//IMPORTANT: Server expects database entries are in following format:
//key:        id          date          time        description
//data type:  -string     -ISO date     -number     -string
//
//

app.use(express.static('src'));

app.get('/form/request/', function(request, response)
{
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost:' + DB_PORT + '/' + DB_NAME, function(error, db) 
	{
 		if (error)
  		{
  			//alert failed connection
    		throw error;
  		}

  		var queryObj = {};
  		if (request.query.cid != "all")
  		{
  			queryObj.id = request.query.cid;
  		}

  		// make >sdate and <edate optional for find()
  		if ((request.query.sdate != "undefined" && request.query.sdate != "null") 
  			|| (request.query.edate != "undefined" & request.query.edate != "null"))
  		{
  			queryObj.date = new Object();
  		}
  		if (request.query.sdate != "undefined" && request.query.sdate != "null")
  		{
  			queryObj.date["$gte"] = new Date(request.query.sdate);
  		}
  		if (request.query.edate != "undefined" && request.query.edate != "null")
  		{
  			queryObj.date["$lte"] = new Date(request.query.edate);
  		}
		
      //query using queryObj, sorted by date
  		db.collection(COLLECTION_NAME).find(queryObj).sort({'date':1}).toArray(function(error, result) 
  		{
    		if (error) 
    		{
    			//close connection and alert failed query
    		  	throw error;
    		}
    		//console.log(result); //for testing query
    		response.send(result);
    		db.close();
  		});
	});	
});

//necessary that server 'serves' the webpage and resources, modern browsers will not
//  allow requests of local files (for security reasons)
app.get('/form', function(req, res) 
{
	res.sendFile(__dirname + '/static/app.html');
});


app.listen(HOST_PORT, function()
{
	console.log('Listening on port ' + HOST_PORT);
});

