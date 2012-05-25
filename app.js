
/**
 * Module dependencies.
 */
var debug = false;
var express = require('express');

var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app, { log: debug});

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
var bigstarlist;
var socketlist = new Array();

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  bigstarlist = initiateStars(1600, 1600);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
//need to have map information then x and y become where the ship is on the map
//but i do sub-tile movement so i have to decide how to store the map

var players = new Array();
var messagecount = 0;

//ship speeds, index responds to ship type
var maxShipSpeed = [0,20,30];

//need to create a new entity when client connects, broadcast this entity to all clients, who then store it and get feedback about it.
var clientid = 0;
io.sockets.on('connection', function (socket) {
  var worldx = 0,
      worldy = 0,
      xvel = 0,
      yvel = 0,
      xacc = 0,
      yacc = 0,
      waypoint = {x:500, y:500, xp:5};
  var spaceship_style = Math.floor(Math.random()*(2)+1);
  //set up the new player
  socket.emit('newstart', { id: clientid, slist:bigstarlist, ship: spaceship_style, x: worldx, y: worldy, wp:waypoint, xp: 0, level: 1, currentplayers: players});
  //tell everyone about the new player
  socket.broadcast.emit('newguy', { id: clientid, ship: spaceship_style, x: worldx, y: worldy });
  //add the player to the list of players
  players[clientid] = {id: clientid, ship: spaceship_style, x: worldx, y: worldy, xv : xvel, xa : xacc, yv: yvel, ya: yacc, wp:waypoint, xp:0, level:1 };
  //investigate what's wrong with this
  //socket.id = clientid;
  clientid ++;
  
  socket.on('disconnect', function (data) {
    players.splice(socket.id, 1, []);
    io.sockets.emit('removeplayer', { id: socket.id });
  });
  
  socket.on('chatmessagesend', function (data) {
    io.sockets.emit('chatmessageresponse', { id: data.id, msg: data.message });
  });

  socket.on('dataupdate', function (data) {
    //socket.emit('chatmessageresponse', { id: 1, msg: "test" });
    //WAYPOINT calculations
    if(Math.abs(players[data.id].x-players[data.id].wp.x) < 200 && Math.abs(players[data.id].y-players[data.id].wp.y) < 200){
      currentw = players[data.id].wp;
      players[data.id].xp += currentw.xp;
      var randx = new Array();
      var randy = new Array();
      //generate new random waypoint
      randx[0] = Math.floor(Math.random()*5001);
      randx[1] = Math.floor(Math.random()*-5001);
      randy[0] = Math.floor(Math.random()*5001);
      randy[1] = Math.floor(Math.random()*-5001);

      var cx = Math.floor(Math.random()*2);
      var cy = Math.floor(Math.random()*2);
      
      var distance = Math.sqrt(Math.pow(players[data.id].x - randx[cx],2) + Math.pow(players[data.id].y - randx[cy],2));
      var xpgen = Math.floor(Math.pow(distance, .25));
      randomw = {x:randx[cx], y:randy[cy], xp: xpgen};
      console.log(xpgen);
      players[data.id].wp = randomw;
      socket.emit('newwaypoint', { wp:randomw });
    }
    
    //log packets sent by frame updates
    if (debug){
    messagecount ++;
    console.log(messagecount);
    }
    //adjust accelleration based on if buttons are held down
    if (data.up && !data.down && !data.left && !data.right) players[data.id].ya = -1;
    if (data.down && !data.up && !data.left && !data.right) players[data.id].ya = 1;
    if (data.left && !data.up && !data.down && !data.right) players[data.id].xa = -1;
    if (data.right && !data.up && !data.down && !data.left) players[data.id].xa = 1;
    if (data.up && data.left && !data.down && !data.right) {players[data.id].xa = -1; players[data.id].ya = -1;}
    if (data.up && data.right && !data.down && !data.left) {players[data.id].xa = 1;players[data.id].ya = -1;}
    if (data.down && data.left && !data.up && !data.right) {players[data.id].xa =-1;players[data.id].ya = 1;}
    if (data.down && data.right && !data.up && !data.left) {players[data.id].xa = 1; players[data.id].ya = 1;}
    //define reset button (default escape)
    if (data.xpressed) {
      players[data.id].x = 500;
      players[data.id].y = 1000;
      players[data.id].xv = 0;
      players[data.id].xa = 0;
      players[data.id].yv = 0;
      players[data.id].ya = 0;
    }   
    //do more in depth movement calculations
    update(players[data.id].id, players[data.id].x, players[data.id].y);
  });

  var update = function(id) {
    //first verify that we don't have a shitstorm on our hands
    if (players[id].hasOwnProperty("xv")){
    //next get how fast this ship can go and make sure it's not going any faster
    var maxspeed = maxShipSpeed[players[id].ship];
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
    
    //boundaries
    //if (players[id].y < -10000)
    io.sockets.emit('update', players[id]);
   }
  };
});
function initiateStars(w,h) {
  var temparray = new Array();
  var numStars = 10000;
  // Generate numStars stars, with a quarter in each quadrant. (0,0 is the world centerpoint)
  for (i = 0; i <= numStars/4; i++) {
    // Get random positions for stars.
    var x = Math.floor(Math.random() * ((w * 10)-1));
    var y = Math.floor(Math.random() * ((h * 10)-1));
    temparray[i] = [x,y];
  }
  for (i = (numStars/4 + 1); i <= numStars/2; i++) {
    // Get random positions for stars.
    var x = Math.floor(Math.random() * ((w * -10)-1));
    var y = Math.floor(Math.random() * ((h * 10)-1));
    temparray[i] = [x,y];
  }
  for (i = (numStars/2 + 1); i <= 3*(numStars/4); i++) {
    // Get random positions for stars.
    var x = Math.floor(Math.random() * ((w * 10)-1));
    var y = Math.floor(Math.random() * ((h * -10)-1));
    temparray[i] = [x,y];
  }
  for (i = (3*(numStars/4) + 1); i <= numStars; i++) {
    // Get random positions for stars.
    var x = Math.floor(Math.random() * ((w * -10)-1));
    var y = Math.floor(Math.random() * ((h * -10)-1));
    temparray[i] = [x,y];
  }
  return temparray;
}
