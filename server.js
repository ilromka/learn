var http = require('http');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'learn',
  user     : 'learn',
  password : 'admin',
});
connection.connect();
connection.query('SELECT * FROM main', function(err, rows, fields)
{
  if(err)
  {
	  throw err;
  }
  console.log('Query result: ', rows);
});
connection.end();

http.createServer(function(request, response)
{
	console.log('request starting...');
	var filePath = '.' + request.url;
	if(filePath == './')
	{
		filePath = './index.html';
	}
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch(extname)
	{
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	path.exists(filePath, function(exists)
	{
		if(exists)
		{
			fs.readFile(filePath, function(error, content)
			{
				if(error){
					response.writeHead(500);
					response.end();
				}
				else
				{
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else
		{
			response.writeHead(404);
			response.end();
		}
	});
}).listen(8181);

console.log('Server running at 127.0.0.1:8181/');