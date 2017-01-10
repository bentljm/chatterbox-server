/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var basicServer = require('./basic-server');

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // The outgoing status.
  var statusCode = 200;
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // Tell the client we are sending them plain text.
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers
  // response.writeHead(statusCode, headers);

  //check out Subs.js//
  //https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

  if (request.url === 'http://127.0.0.1:3000/classes/messages/' || request.url === '/classes/messages' || request.url === '/') {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(basicServer.data));
      return;
    } else if (request.method === 'POST') {
      response.writeHead(201, headers);
      console.log(request);
      response.end();
      return;
    } else {
      response.writeHead(404, headers);
      response.end();
    }
  } else {
    response.writeHead(404, headers);
    response.end();
    return;
  }
  //statusCode = 404;

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;






// var http = require('http');

// http.createServer(function(request, response) {

//   var headers = request.headers;
//   var method = request.method;
//   var url = request.url;
//   var body = [];
//   request.on('error', function(err) {
//     console.error(err);
//   }).on('data', function(chunk) {
//     body.push(chunk);
//   }).on('end', function() {
//     body = Buffer.concat(body).toString();

//     // BEGINNING OF NEW STUFF

//     response.on('error', function(err) {
//       console.error(err);
//     });

//     // response.writeHead(200, {'Content-Type': 'application/json'})

//     var responseBody = {
//       headers: headers,
//       method: method,
//       url: url,
//       body: body
//     };
//
//     // response.end(JSON.stringify(responseBody))
