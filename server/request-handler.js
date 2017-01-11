var urlParser = require('url');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var messageID = 1;
var messageObject = {'results': [], 'rooms': []};

var requestHandler = function(request, response) {
  var method = request.method;
  var url = urlParser.parse(request.url).pathname;
  var data = '';
  var parsedData;

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  console.log('Serving request type ' + request.method + ' for url ' + url);

  headers['Content-Type'] = 'application/json';

  if (url === '/classes/messages' || url ==='/classes/room') {
    if (method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(messageObject));
      return;
    } else if (method === 'POST') {
      response.writeHead(201, headers);
      messageID++;
      if (url === '/classes/messages') {
        request.on('data', function(chunk) { data += chunk; });
        request.on('end', function() {
          parsedData = JSON.parse(data);
          parsedData.objectId = messageID;
          messageObject.results.push(parsedData);
        });
      } else if (url === '/classes/room') {
        request.on('data', function(chunk) { data += chunk; });
        request.on('end', function() {
          parsedData = JSON.parse(data);
          parsedData.objectId = messageID;
          messageObject.rooms.push(parsedData);
        });
      }

      response.end(JSON.stringify(parsedData));
      return;

    } else if (method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(null));

    } else {
      response.writeHead(404, headers);
      response.end();
      return;
    }
  } else {
    response.writeHead(404, headers);
    response.end();
    return;
  }

};

exports.requestHandler = requestHandler;
