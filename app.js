
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
//need to have map information then x and y become where the ship is on the map
//but i do sub-tile movement so i have to decide how to store the map


//need to create a new entity when client connects, broadcast this entity to all clients, who then store it and get feedback about it.
var clientid = 0;
var players = new Array();
var messagecount = 0;
io.sockets.on('connection', function (socket) {
  var worldx = 0;
  var worldy = 0;
  var xvel = 0;
  var yvel = 0;
  var xacc = 0;
  var yacc = 0;
  var spaceship_style = Math.floor(Math.random()*(2)+1);
  socket.emit('newstart', { id: clientid, ship: spaceship_style, x: worldx, y: worldy, currentplayers: players});
  socket.broadcast.emit('newguy', { id: clientid, ship: spaceship_style, x: worldx, y: worldy });
  players[clientid] = {id: clientid, ship: spaceship_style, x: worldx, y: worldy, xv : xvel, xa : xacc, yv: yvel, ya: yacc };
  socket.id = clientid;
  clientid ++;
  
  socket.on('disconnect', function (data) {
    players.splice(socket.id, 1, []);
    socket.emit('removeplayer', { id: socket.id });
    socket.broadcast.emit('removeplayer', { id: socket.id });
});

  socket.on('dataupdate', function (data) {
    messagecount ++;
    console.log(messagecount);
    if (data.up && !data.down && !data.left && !data.right) players[data.id].ya = -1;
    if (data.down && !data.up && !data.left && !data.right) players[data.id].ya = 1;
    if (data.left && !data.up && !data.down && !data.right) players[data.id].xa = -1;
    if (data.right && !data.up && !data.down && !data.left) players[data.id].xa = 1;
    if (data.up && data.left && !data.down && !data.right) {players[data.id].xa = -1; players[data.id].ya = -1;}
    if (data.up && data.right && !data.down && !data.left) {players[data.id].xa = 1;players[data.id].ya = -1;}
    if (data.down && data.left && !data.up && !data.right) {players[data.id].xa =-1;players[data.id].ya = 1;}
    if (data.down && data.right && !data.up && !data.left) {players[data.id].xa = 1; players[data.id].ya = 1;}
    if (data.xpressed) {
      players[data.id].x = 0;
      players[data.id].y = 0;
      players[data.id].xv = 0;
      players[data.id].xa = 0;
      players[data.id].yv = 0;
      players[data.id].ya = 0;
    }
    update(players[data.id].id, players[data.id].x, players[data.id].y);
  });

  var update = function(id) {
    var maxspeed = 20;
    if (players[id].xv > maxspeed) players[id].xv = maxspeed;
    if (players[id].xv < -maxspeed) players[id].xv = -maxspeed;
    if (players[id].yv > maxspeed) players[id].yv = maxspeed;
    if (players[id].yv < -maxspeed) players[id].yv = -maxspeed;
    var magnitude = Math.sqrt(Math.pow(players[id].xv, 2) + Math.pow(players[id].yv, 2));
    if (magnitude > maxspeed){
        players[id].xv = Math.floor(players[id].xv * .85);
        players[id].yv = Math.floor(players[id].yv * .85);
    }
    players[id].xv += players[id].xa;
    players[id].yv += players[id].ya;
    players[id].xa = 0;
    players[id].ya = 0;
    players[id].x += players[id].xv;
    players[id].y += players[id].yv;
    io.sockets.emit('update', players[id]);
  };
});
