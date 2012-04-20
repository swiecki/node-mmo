
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

//need to create a new entity when client connects, broadcast this entity to all clients, who then store it and get feedback about it.
var clientid = 0;
var players = new Array();
io.sockets.on('connection', function (socket) {
  var xstart = 70;
  var ystart = 140;
  var spaceship_style = Math.floor(Math.random()*(2)+1);
  socket.emit('newstart', { id: clientid, ship: spaceship_style, x: xstart, y: ystart, currentplayers: players});
  socket.broadcast.emit('newguy', { id: clientid, ship: spaceship_style, x: xstart, y: ystart });
  players[clientid] = {id: clientid, ship: spaceship_style, x: xstart, y: ystart };
  socket.id = clientid;
  clientid ++;
  
  socket.on('disconnect', function (data) {
    players.splice(socket.id, 1, []);
    socket.emit('removeplayer', { id: socket.id });
    socket.broadcast.emit('removeplayer', { id: socket.id });
});

  socket.on('movement', function (data) {
    if (data.up) players[data.id].y -= 10;
    if (data.down) players[data.id].y += 10;
    if (data.left) players[data.id].x -= 10;
    if (data.right) players[data.id].x += 10;
    update(players[data.id].id, players[data.id].x, players[data.id].y);
  });

  var update = function(id, x, y) {
  players[id].x = x;
  players[id].y = y;
  socket.emit('update', players[id]);
  socket.broadcast.emit('update', players[id]);
  };
});
