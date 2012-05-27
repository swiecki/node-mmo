var s1width = 48,
    s1height = 48,
    s2width = 48,
    s2height = 48;
var s1_canvas, s2_canvas;
function initialize_ships(){
  s1_canvas = document.createElement('canvas');
  s1_canvas.width = 2163;
  s1_canvas.height = 1756;
  var s1_context = s1_canvas.getContext('2d');
  var s1img = new Image();
  s1img.onload = function(){
    s1_context.drawImage(s1img,0,0);
  }
  s1img.src = 'images/ship1.png';
  
  s2_canvas = document.createElement('canvas');
  s2_canvas.width = 2163;
  s2_canvas.height = 1756;
  var s2_context = s2_canvas.getContext('2d');
  var s2img = new Image();
  s2img.onload = function(){
    s2_context.drawImage(s2img,0,0);
  }
  s2img.src = 'images/ship2.png';
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
function ship1draw(ctx,x,y,a,center,cw,ch) {
  if(center){
  ctx.save();
  ctx.translate(cw/2, ch/2);
  ctx.rotate(a);
  s1enginesbottom(ctx,x-(.5)*s1width,y-(.5)*s1height);
  ctx.drawImage(s1_canvas,x-(.5)*s1width,y-(.5)*s1height);
  ctx.restore();
  }
  else{
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(a);
  s1enginesbottom(ctx,-(.5)*s1width,-(.5)*s1height);
  ctx.drawImage(s1_canvas,-(.5)*s1width,-(.5)*s1height);
  ctx.restore();
  }
}
function s2enginesbottom(ctx,x,y) {
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
function ship2draw(ctx,x,y,a,center) {
  if(center){
  ctx.save();
  ctx.translate(350, 350);
  ctx.rotate(a);
  s1enginesbottom(ctx,x-(.5)*s1width,y-(.5)*s1height);
  ctx.drawImage(s2_canvas,x-(.5)*s1width,y-(.5)*s1height);
  ctx.restore();
  }
  else{
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(a);
  s1enginesbottom(ctx,-(.5)*s1width,-(.5)*s1height);
  ctx.drawImage(s2_canvas,-(.5)*s1width,-(.5)*s1height);
  ctx.restore();
  }
}
