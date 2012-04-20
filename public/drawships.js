  //new ship code starts here
  //ph and pw are pixel height and pixel width
  var ph = 5, pw = 5;
  //colors- not sure about greens, pinks 1 is darkest 6 is lightest
  var black = "rgb(0,0,0)",
  d1green = "rgb(48,92,83)",
  d2green = "rgb(76,124,114)",
  d3green = "rgb(69,131,119)",
  l4green = "rgb(53,147,128)",
  l3green = "rgb(138,182,173)",
  l1green = "rgb(185,215,209)",
  gray = "rgb(128,128,128)",
  white = "rgb(255,255,255)",
  p1 = "rgb(97,43,76)",
  p2 = "rgb(139,61,109)",
  p3 = "rgb(131,69,107)",
  p4 = "rgb(179,81,141)",
  p5 = "rgb(169,91,139)",
  p6 = "rgb(190,130,167)",
  p7 = "rgb(211,189,202)"
;

function s1col1 (ctx,x,y){
  var context = ctx;
  //first column
  context.fillStyle = black;
  context.fillRect(x, y + (6*ph), pw, ph);
  context.fillRect(x, y + (9*ph), pw, ph);
}
function s1col2 (ctx,x,y){
  var context = ctx;
  //second column
  context.fillRect(x + (1*pw), y + (5*ph), pw, ph);
  context.fillStyle = d1green;
  context.fillRect(x + (1*pw), y + (6*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (1*pw), y + (7*ph), pw, (2*ph));
  context.fillStyle = d1green;
  context.fillRect(x + (1*pw), y + (9*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (1*pw), y + (10*ph), pw, ph);
}
function s1col3 (ctx,x,y){
  var context = ctx;
  //third column
  context.fillRect(x + (2*pw), y + (3*ph), pw, (2*ph));
  context.fillStyle = d2green;
  context.fillRect(x + (2*pw), y + (5*ph), pw, ph);
  context.fillStyle = d3green;
  context.fillRect(x + (2*pw), y + (6*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (2*pw), y + (7*ph), pw, ph);
  context.fillStyle = l4green;
  context.fillRect(x + (2*pw), y + (8*ph), pw, ph);
  context.fillStyle = d3green;
  context.fillRect(x + (2*pw), y + (9*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (2*pw), y + (10*ph), pw, ph);
}
function s1col4 (ctx,x,y){
  var context = ctx;
  //fourth column
  context.fillRect(x + (3*pw), y + (1*ph), pw, (2*ph));
  context.fillStyle = d2green;
  context.fillRect(x + (3*pw), y + (3*ph), pw, ph);
  context.fillStyle = black
  context.fillRect(x + (3*pw), y + (4*ph), pw, (2*ph));
  context.fillStyle = l4green;
  context.fillRect(x + (3*pw), y + (6*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (3*pw), y + (7*ph), pw, (3*ph));
  context.fillStyle = l4green;
  context.fillRect(x + (3*pw), y + (10*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (3*pw), y + (11*ph), pw, ph);
}
function s1col5 (ctx,x,y){
  var context = ctx;
  //fifth column
  context.fillRect(x + (4*pw), y + (0*ph), pw, (ph));
  context.fillStyle = l3green;
  context.fillRect(x + (4*pw), y + (1*ph), pw, ph);
  context.fillStyle = black
  context.fillRect(x + (4*pw), y + (2*ph), pw, (2*ph));
  context.fillStyle = gray;
  context.fillRect(x + (4*pw), y + (4*ph), pw, (2*ph));
  context.fillStyle = black;
  context.fillRect(x + (4*pw), y + (6*ph), pw, ph);
  context.fillStyle = white;
  context.fillRect(x + (4*pw), y + (7*ph), pw, ph);
  context.fillStyle = l1green;
  context.fillRect(x + (4*pw), y + (8*ph), pw, ph);
  context.fillStyle = l3green;
  context.fillRect(x + (4*pw), y + (9*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (4*pw), y + (10*ph), pw, ph);
}
function s1col6 (ctx,x,y){
  var context = ctx;
  //fifth column
  context.fillRect(x + (5*pw), y + (0*ph), pw, (ph));
  context.fillStyle = l1green;
  context.fillRect(x + (5*pw), y + (1*ph), pw, ph);
  context.fillStyle = black
  context.fillRect(x + (5*pw), y + (2*ph), pw, (1*ph));
  context.fillStyle = gray;
  context.fillRect(x + (5*pw), y + (3*ph), pw, (3*ph));
  context.fillStyle = white;
  context.fillRect(x + (5*pw), y + (6*ph), pw, (2*ph));
  context.fillStyle = l1green;
  context.fillRect(x + (5*pw), y + (8*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (5*pw), y + (9*ph), pw, ph);
  context.fillStyle = l4green;
  context.fillRect(x + (5*pw), y + (10*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (5*pw), y + (11*ph), pw, ph);
}
function s1enginesbottom(ctx,x,y) {
  var radgrad = ctx.createRadialGradient(x+6*pw,y+12*ph,0,x+6*pw,y+12*ph,2.3*pw);
  radgrad.addColorStop(0, 'rgba(255,255,255,1)');
  radgrad.addColorStop(0.8, 'rgba(168,236,246,.7)');
  radgrad.addColorStop(0.9, 'rgba(75,159,172,.85)');
  radgrad.addColorStop(1, 'rgba(255,255,255,0)');//notice alpha channel is invisible
  // draw shape
  ctx.fillStyle = radgrad;
  ctx.fillRect(x,y,20*ph,20*pw);
}
function ship1draw(ctx,x, y) {
  s1enginesbottom(ctx,x,y);
  s1col1(ctx,x,y);
  s1col2(ctx,x,y);
  s1col3(ctx,x,y);
  s1col4(ctx,x,y);
  s1col5(ctx,x,y);
  s1col6(ctx,x,y);
  s1col6(ctx,(x+(1*ph)),y);
  s1col5(ctx,x+(3*ph),y);
  s1col4(ctx,x+(5*ph),y);
  s1col3(ctx,x+(7*ph),y);
  s1col2(ctx,x+(9*ph),y);
  s1col1(ctx,x+(11*ph),y);
  
}
function s2col1 (ctx,x,y){
  var context = ctx;
  //first column
  context.fillStyle = black;
  context.fillRect(x, y + (6*ph), pw, 2*ph);
  context.fillRect(x, y + (9*ph), pw, ph);
}
function s2col2 (ctx,x,y){
  var context = ctx;
  //second column
  context.fillRect(x + (1*pw), y + (5*ph), pw, ph);
  context.fillStyle = p2;
  context.fillRect(x + (1*pw), y + (6*ph), pw, 2*ph);
  context.fillStyle = black;
  context.fillRect(x + (1*pw), y + (8*ph), pw, ph);
  context.fillStyle = p1;
  context.fillRect(x + (1*pw), y + (9*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (1*pw), y + (10*ph), pw, ph);
}
function s2col3 (ctx,x,y){
  var context = ctx;
  //third column
  context.fillRect(x + (2*pw), y + (4*ph), pw, (2*ph));
  context.fillStyle = p3;
  context.fillRect(x + (2*pw), y + (6*ph), pw, 2*ph);
  context.fillStyle = black;
  context.fillRect(x + (2*pw), y + (7*ph), pw, ph);
  context.fillStyle = p4;
  context.fillRect(x + (2*pw), y + (8*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (2*pw), y + (9*ph), pw, ph);
  context.fillStyle = p4;
  context.fillRect(x + (2*pw), y + (10*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (2*pw), y + (11*ph), pw, ph);
}
function s2col4 (ctx,x,y){
  var context = ctx;
  //fourth column
  context.fillRect(x + (3*pw), y + (2*ph), pw, 2*ph);
  context.fillStyle = p5;
  context.fillRect(x + (3*pw), y + (4*ph), pw, 2*ph);
  context.fillStyle = black
  context.fillRect(x + (3*pw), y + (6*ph), pw, ph);
  context.fillStyle = p4;
  context.fillRect(x + (3*pw), y + (7*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (3*pw), y + (8*ph), pw, ph);
  context.fillStyle = p4;
  context.fillRect(x + (3*pw), y + (9*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (3*pw), y + (10*ph), pw, ph);
}
function s2col5 (ctx,x,y){
  var context = ctx;
  //fifth column
  context.fillRect(x + (4*pw), y + (1*ph), pw, ph);
  context.fillStyle = p7;
  context.fillRect(x + (4*pw), y + (2*ph), pw, ph);
  context.fillStyle = black
  context.fillRect(x + (4*pw), y + (3*ph), pw, 3*ph);
  context.fillStyle = white;
  context.fillRect(x + (4*pw), y + (6*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (4*pw), y + (7*ph), pw, ph);
  context.fillStyle = p6;
  context.fillRect(x + (4*pw), y + (8*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (4*pw), y + (9*ph), pw, 2*ph);
}
function s2col6 (ctx,x,y){
  var context = ctx;
  //fifth column
  context.fillRect(x + (5*pw), y + (0*ph), pw, (ph));
  context.fillStyle = p7;
  context.fillRect(x + (5*pw), y + (1*ph), pw, ph);
  context.fillStyle = black
  context.fillRect(x + (5*pw), y + (2*ph), pw, (1*ph));
  context.fillStyle = gray;
  context.fillRect(x + (5*pw), y + (3*ph), pw, (3*ph));
  context.fillStyle = black;
  context.fillRect(x + (5*pw), y + (6*ph), pw, (2*ph));
  context.fillStyle = p6;
  context.fillRect(x + (5*pw), y + (8*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (5*pw), y + (9*ph), pw, ph);
  context.fillStyle = p6;
  context.fillRect(x + (5*pw), y + (10*ph), pw, ph);
  context.fillStyle = black;
  context.fillRect(x + (5*pw), y + (11*ph), pw, ph);
}
function ship2draw(ctx,x, y) {
  s1enginesbottom(ctx,x,y);
  s2col1(ctx,x,y);
  s2col2(ctx,x,y);
  s2col3(ctx,x,y);
  s2col4(ctx,x,y);
  s2col5(ctx,x,y);
  s2col6(ctx,x,y);
  s2col6(ctx,(x+(1 * ph)),y);
  s2col5(ctx,x+(3*ph),y);
  s2col4(ctx,x+(5*ph),y);
  s2col3(ctx,x+(7*ph),y);
  s2col2(ctx,x+(9*ph),y);
  s2col1(ctx,x+(11*ph),y);
}

