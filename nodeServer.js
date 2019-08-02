//The link to the magical website that taught us everything we know about node.js:
//https://glitch.com/edit/#!/node-http?path=server.js:2:31

// Importing web-based protocol module
var http = require("http");
// Importing file system module
var fs = require("fs");
// Importing path module for concatenating paths
var path = require("path");
// Import url module for concatenating url's
var url = require("url");
// Declare our Busboy object for parsing multipart/formdata
var Busboy = require("busboy");
const port = 3000;

// To look up MIME types
// Full list of extensions can be found at
// https://www.iana.org/assignments/media-types/media-types.xhtml
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

// Create the HTTP server with http.createServer([options][, requestListener])
// Documentation: https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
http.createServer(function(req, res) {

  // Create a new URL object with URL constructor
  // Documentation: https://nodejs.org/docs/latest-v10.x/api/url.html#url_constructor_new_url_input_base
  const parsedUrl = new URL(req.url, "http://127.0.0.1:3000");

  // Get path portion of the URL
  // This is the "/Pages/Upload.html" from "http://127.0.0.1:3000/Pages/Upload.html"
  // Documentation: https://nodejs.org/docs/latest-v10.x/api/url.html#url_url_pathname
  let pathName = parsedUrl.pathname
  pathName = pathName.replace(/%20/g, " ")
  console.log(`Requested Path: ${pathName}`)

  // Returns the extension of the path (.html, .js, .css, etc)
  // Documentation: https://nodejs.org/api/path.html
  let ext = path.extname(pathName)

  // When the player uploads a new game, upload.js sends us a POST request
  if (req.method === "POST") {
    // var body = ''
    // req.on('data', chunk => {
    //   console.log("putting data in body")
    //   body += chunk.toString()
    // })
    // req.on('end', () => {
    //   console.log(body)
    //   res.end("ok")
    // })

    var busboy = new Busboy({
      headers: req.headers
    });
    // Declaring local variables so they can be used in all the busboy event handlers
    var gameKey
    var gameName
    var newGamePath

    busboy.on("field", function(fieldName, val) {
      if (fieldName === "gameKey") {
        gameKey = val;
      }
      if (fieldName === "gameName") {
        gameName = val
      }
    })
    busboy.on("file", function(fieldName, fileStream, fileName) {
      if (fieldName === "gameFiles") {
        //Parsing the fileName to figure out if we need to make any more new directories
        console.log("fileName: " + fileName)
        var filePathArray = fileName.split("/")
        console.log("filePathArray: " + filePathArray)
        fileName = filePathArray.pop()
        console.log("fileName: " + fileName)
        newGamePath = path.join(__dirname, "Games", gameKey, gameName, filePathArray.join("/"))
        console.log("filePathArray.join('/'): " + filePathArray.join('/'))
        console.log("newGamePath" + newGamePath)
        if (!fs.existsSync(newGamePath)) {
          fs.mkdirSync(newGamePath, {
            recursive: true
          })
        }

        var newFilePath = path.join(newGamePath, fileName)
        var writeStream = fs.createWriteStream(newFilePath)
        fileStream.pipe(writeStream)
      }
    })
    busboy.on("finish", function() {
      console.log("POST REQUEST FINISHED")
      res.writeHead(200, {
        'Connection': 'close'
      })
    })
    req.pipe(busboy);
  }

  // READ: https://www.sitepoint.com/beginners-guide-node-package-manager/

  if (req.method === "GET") {

    // We can handle URLs with trailing '/' by removing the '/'
    // then redirecting the user to that URL using the 'Location' header
    if (pathName !== '/' && pathName[pathName.length - 1] === '/') {
      // If pathName is not to the current directory (aka homepage),
      // and the pathName ends in a '/'...
      res.writeHead(302, {
        //Location header automatically redirects the player
        'Location': pathName.slice(0, -1)
      })
      res.end()
      // Return in order to not run any more code,
      // since the player has just been redirected
      return
    }

    // If the request is for the root directory, return index.html
    // Otherwise, append '.html' to any other request without an extension
    if (pathName === '/') {
      ext = '.html'
      pathName = '/index.html'
    } else if (!ext) {
      ext = '.html'
      pahName += ext
    }

    // Construct a valid file path so the requested file can be accessed
    // path.join concatenates the current directory (.../play4change)
    // and the requested file's pathName
    const filePath = path.join(__dirname, pathName);

    // Check if the requested asset exists on the server
    // TODO: Replace deprecated fs.exists() by just starting
    // readStream and handling any errors
    fs.exists(filePath, function(exists, err) {
      if (!exists || !mimeTypes[ext]) {
        // If the asset does not exist or ext is not recognized by mimeType list,
        // respond with a 404 Not Found
        console.log('File does not exist: ' + pathName)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('404 Not Found')
        res.end()
        return
      }

      // Otherwise, respond with a 200 OK status,
      // and add the correct content-type header
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext]
      })
      // Read file from the computer and stream it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    })
  }
}).listen(port);
// The server only listens to requests on port 3000 (obviously...)

console.log(`Server listening on port: ${port}`)
