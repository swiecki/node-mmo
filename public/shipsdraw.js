var s1width = 48,
    s1height = 48;
var s1_canvas, s2_canvas;

function initialize_ships(){
  s1_canvas = document.createElement('canvas');
  s1_canvas.width = 48;
  s1_canvas.height = 48;
  var s1_context = s1_canvas.getContext('2d');
  var s1img = new Image();
  s1img.onload = function(){
    s1_context.drawImage(s1img,0,0);
  }
  s1img.src = 'images/ship1.png';
  
  s2_canvas = document.createElement('canvas');
  s2_canvas.width = 48;
  s2_canvas.height = 48;
  var s2_context = s2_canvas.getContext('2d');
  var s2img = new Image();
  s2img.onload = function(){
    s2_context.drawImage(s2img,0,0);
  }
  s2img.src = 'images/ship2.png';

  s3_canvas = document.createElement('canvas');
  s3_canvas.width = 48;
  s3_canvas.height = 48;
  var s3_context = s3_canvas.getContext('2d');
  var s3img = new Image();
  s3img.onload = function(){
    s3_context.drawImage(s3img,0,0);
  }
  s3img.src = 'images/ship3.png';

  s4_canvas = document.createElement('canvas');
  s4_canvas.width = 48;
  s4_canvas.height = 48;
  var s4_context = s4_canvas.getContext('2d');
  var s4img = new Image();
  s4img.onload = function(){
    s4_context.drawImage(s4img,0,0);
  }
  s4img.src = 'images/ship4.png';

  s5_canvas = document.createElement('canvas');
  s5_canvas.width = 48;
  s5_canvas.height = 48;
  var s5_context = s5_canvas.getContext('2d');
  var s5img = new Image();
  s5img.onload = function(){
    s5_context.drawImage(s5img,0,0);
  }
  s5img.src = 'images/ship5.png';

  s6_canvas = document.createElement('canvas');
  s6_canvas.width = 48;
  s6_canvas.height = 48;
  var s6_context = s6_canvas.getContext('2d');
  var s6img = new Image();
  s6img.onload = function(){
    s6_context.drawImage(s6img,0,0);
  }
  s6img.src = 'images/ship6.png';

  s7_canvas = document.createElement('canvas');
  s7_canvas.width = 48;
  s7_canvas.height = 48;
  var s7_context = s7_canvas.getContext('2d');
  var s7img = new Image();
  s7img.onload = function(){
    s7_context.drawImage(s7img,0,0);
  }
  s7img.src = 'images/ship7.png';

  s8_canvas = document.createElement('canvas');
  s8_canvas.width = 48;
  s8_canvas.height = 48;
  var s8_context = s8_canvas.getContext('2d');
  var s8img = new Image();
  s8img.onload = function(){
    s8_context.drawImage(s8img,0,0);
  }
  s8img.src = 'images/ship8.png';

  s9_canvas = document.createElement('canvas');
  s9_canvas.width = 48;
  s9_canvas.height = 48;
  var s9_context = s9_canvas.getContext('2d');
  var s9img = new Image();
  s9img.onload = function(){
    s9_context.drawImage(s9img,0,0);
  }
  s9img.src = 'images/ship9.png';
}
function s1enginesbottom(ctx,x,y) {
  var op1 = Math.random();
  var radgrad = ctx.createRadialGradient(x+s1width/2,y+s1height,0,x+s1width/2,y+s1height,2.3*4);
  if (op1 > .2){
  radgrad.addColorStop(0, 'rgba(255,255,255,1)');//def op 1
  radgrad.addColorStop(0.8, 'rgba(168,236,246,.7)');//def op .7
  radgrad.addColorStop(0.9, 'rgba(75,159,172,.85)');//defop.85
  radgrad.addColorStop(1, 'rgba(255,255,255,0)');//notice alpha channel is invisible
  } else {
  radgrad.addColorStop(0, 'rgba(255,255,255,.8)');//def op 1
  radgrad.addColorStop(0.8, 'rgba(168,236,246,.3)');//def op .7
  radgrad.addColorStop(0.9, 'rgba(75,159,172,.65)');//defop.85
  radgrad.addColorStop(1, 'rgba(255,255,255,0)');//notice alpha channel is invisible
  }
  // draw shape
  ctx.fillStyle = radgrad;
  ctx.fillRect(x,y,20*4,20*4);
}
function shipDraw(ctx,x,y,a,center,cw,ch,ship,engine) {
  if(center){
  ctx.save();
  ctx.translate(cw/2, ch/2);
  ctx.rotate(a);
  if (engine) s1enginesbottom(ctx,x-(.5)*s1width,y-(.5)*s1height);
  switch (ship) {
    case 1:
    ctx.drawImage(s1_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 2:
    ctx.drawImage(s2_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 3:
    ctx.drawImage(s3_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 4:
    ctx.drawImage(s4_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 5:
    ctx.drawImage(s5_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 6:
    ctx.drawImage(s6_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 7:
    ctx.drawImage(s7_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 8:
    ctx.drawImage(s8_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
    case 9:
    ctx.drawImage(s9_canvas,x-(.5)*s1width,y-(.5)*s1height);
    break;
  }
  ctx.restore();
  }
  else{
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(a);
  if (engine) s1enginesbottom(ctx,-(.5)*s1width,-(.5)*s1height);
  ctx.drawImage(s1_canvas,-(.5)*s1width,-(.5)*s1height);
  ctx.restore();
  }
}
