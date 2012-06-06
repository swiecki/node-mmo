
/**
 * Module dependencies.
 */
var debug = true;
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

//ship upgrade parameters, index corresponds to level of parameter
var shipSpeeds = [15,20,25,30,35];
var shipManeuver = [1,2,3,4];
var shipWaypointDistance = [40,60,80,100];

//need to create a new entity when client connects, broadcast this entity to all clients, who then store it and get feedback about it.
var clientid = 0;
io.sockets.on('connection', function (socket) {
  var xvel = 0,
      yvel = 0,
      xacc = 0,
      yacc = 0,
      speed = 0,
      maneuver = 0,
      wpdist = 0,
      startenergy = 1000,
      regentime = new Date(),
      waypoint = {x:0, y:0, xp:0, msg:'Follow the yellow indicator near the center of your screen to save the crashed spaceships!'};
  
  //set up the new player
  socket.emit('newstart', { id: clientid, slist:bigstarlist, ship: 1, x: 0, y: 0, wp:waypoint, xp: 0, level: 1, energy:startenergy, currentplayers: players});
  
  //tell everyone about the new player
  socket.broadcast.emit('newguy', { id: clientid, ship: 1, x: 0, y: 0 });
  
  //add the player to the list of players
  players[clientid] = {id: clientid, ship: 1, nickname: 'Player', x: 0, y: 0, xv : xvel, xa : xacc, yv: yvel, ya: yacc, a:0, energy: startenergy, wp:waypoint, xp:0, level:1 };
  
  //set id to be associated with socket
  socket.set('identification', clientid);
  clientid ++;
  
  socket.on('disconnect', function (data) {
    //remove socket by socketid on disconnect
    socket.get('identification', function(err, id) {
      var message;
        if (players[id].nickname == 'Player'){
          message = 'Player ' + id;
        }
        else {
          message = players[id].nickname;
        }
        //send a message about it to all players
        io.sockets.emit('chatmessageresponse', {playermsg:false, id:null, msg: message + ' has left the game.'});
    players.splice(id, 1, []);
    io.sockets.emit('removeplayer', { id: id });
    });
  });
  
  socket.on('nickupdate', function (data) {
    players[data.id].nickname = data.nick;
  });

  socket.on('chatmessagesend', function (data) {
    io.sockets.emit('chatmessageresponse', data);
  });

  socket.on('dataupdate', function (data) {
    //test that everything isn't fucked up
    if (insanityTest(data)){

    //do waypoint calculations
    var waypointDistance = 50;
    waypointUpdate(players[data.id].id, waypointDistance);
    
    //log packets sent by frame updates
    if (debug){
    messagecount ++;
    console.log(messagecount);
    }
    
    //if a direction is being held, subtract some energy
    if (data.up || data.down || data.left || data.right){
      regentime = new Date();
      if (players[data.id].energy > 3){
        players[data.id].energy -= 3;
      }
    } else {
      //figure out if energy should be regenerated
      var currentTime = new Date();
      if (currentTime.getTime() - regentime.getTime() > 2500) {
        players[data.id].energy += 3;
        if (players[data.id].energy > 1000) {
          players[data.id].energy = 1000;
        }
      }
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
    
    //out of energy condition
    if (players[data.id].energy < 10){
      players[data.id].xa = 0;
      players[data.id].ya = 0;
    }

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
    update(players[data.id].id);
    //end insanity test
    }
  });
  var waypointUpdate = function(id, wpDistance) {
    //first verify that we don't have a shitstorm on our hands
    if (players[id] !== null && players[id] !== undefined && players[id].hasOwnProperty("x")){
    if(true) {
    //waypoint calculations
    if(Math.abs(players[id].x-players[id].wp.x) < wpDistance && Math.abs(players[id].y-players[id].wp.y) < wpDistance){
      currentw = players[id].wp;
      //add xp
      players[id].xp += currentw.xp;
      if (currentw.hasOwnProperty("msg")){
        socket.emit('chatmessageresponse', {playermsg:false, id:null, msg: currentw.msg});
      }
      //figure out level stuff
      var newLevel = calculateLevel(players[id].xp);
      if (newLevel > players[id].level) {
        //set new level, emit level up event
        players[id].level = newLevel;
        socket.emit('leveledup', { level:newLevel });
        //build message string
        var message;
        if (players[id].nickname == 'Player'){
          message = 'Player ' + id;
        }
        else {
          message = players[id].nickname;
        }
        //send a message about it to all players
        io.sockets.emit('chatmessageresponse', {playermsg:false, id:null, msg: message + ' reached level ' + newLevel + '!'});
      }
      var randx = new Array();
      var randy = new Array();
      //generate new random waypoint
      randx[0] = Math.floor(Math.random()*5001);
      randx[1] = Math.floor(Math.random()*-5001);
      randy[0] = Math.floor(Math.random()*5001);
      randy[1] = Math.floor(Math.random()*-5001);
      var cx = Math.floor(Math.random()*2);
      var cy = Math.floor(Math.random()*2);
      var distance = Math.sqrt(Math.pow(players[id].x - randx[cx],2) + Math.pow(players[id].y - randx[cy],2));
      var xpgen = Math.floor(((Math.pow(distance, .25) - 1) + players[id].level) * 3/4);
      randomw = {x:randx[cx], y:randy[cy], xp: xpgen};
      players[id].wp = randomw;
      socket.emit('newwaypoint', { wp:randomw });
    }
  }
  }
  }
  var update = function(id) {
    //first verify that we don't have a shitstorm on our hands
    if (players[id] !== null && players[id] !== undefined && players[id].hasOwnProperty("xv")){
    //next get how fast this ship can go and make sure it's not going any faster
    var maxspeed = 20 + 2*players[id].level;
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
    
    //set player angle from velocities
    var xv = players[id].xv;
    var yv = players[id].yv;
    var newa;
    if (yv == 0 && xv > 0) newa = Math.PI/2;
    if (yv == 0 && xv < 0) newa = -1*Math.PI/2;
    if (yv < 0 && xv == 0) newa = 0;
    if (yv > 0 && xv == 0) newa = Math.PI;
    if (yv < 0 && xv > 0){
    newa = Math.atan(players[id].xv/(players[id].yv * -1));
    }
    if (yv < 0 && xv < 0){
    newa = Math.atan(players[id].xv/(players[id].yv * -1));
    }
    if (yv > 0 && xv > 0){
    newa =Math.PI + Math.atan(players[id].xv/(players[id].yv * -1));
    }
    if (yv > 0 && xv < 0){
    newa =Math.PI + Math.atan(players[id].xv/(players[id].yv * -1));
    }
    //dampen change
    if (Math.abs(newa-players[id].a) > .035){
      players[id].a = newa;
    }
    //boundaries
    if (players[id].y < -18000 || players[id].x < -18000 || players[id].x > 18000 || players[id].y > 18000) {
    players[id].x = 0;
    players[id].y = 0;
    var message;
        if (players[id].nickname == 'Player'){
          message = 'Player ' + id;
        }
        else {
          message = players[id].nickname;
        }
    io.sockets.emit('chatmessageresponse', {playermsg:false, id:null, msg: message + '\'s position was reset. You cannot fly that far out into deep space.'});
    }
    socket.emit('update', players[id]);
    var trimmedData = { id: id, x: players[id].x, y: players[id].y, a: players[id].a, ship: players[id].ship, nickname: players[id].nickname };
    socket.broadcast.emit('update', trimmedData);
   }
  };
});
function calculateLevel(xp) {
  if (xp >= 0 && xp < 30) return 1;
  if (xp >= 30 && xp < 60) return 2;
  if (xp >= 60 && xp < 100) return 3;
  if (xp >= 100 && xp < 140) return 4;
  if (xp >= 140 && xp < 180) return 5;
  if (xp >= 180 && xp < 250) return 6;
  if (xp >= 250 && xp < 330) return 7;
  if (xp >= 330 && xp < 420) return 8;
  if (xp >= 420 && xp < 520) return 9;
  if (xp >= 520 && xp < 630) return 10;
  if (xp >= 630 && xp < 750) return 11;
  if (xp >= 750 && xp < 880) return 12;
  if (xp >= 880 && xp < 1020) return 13;
  if (xp >= 1020 && xp < 1170) return 14;
  if (xp >= 1170 && xp < 1330) return 15;
}
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
function insanityTest(data){
  if (data !== null && data !== undefined && data.hasOwnProperty("id")){
    if (players[data.id] !== null && players[data.id] !== undefined && players[data.id].hasOwnProperty("x")){
    return true;
    }}
}