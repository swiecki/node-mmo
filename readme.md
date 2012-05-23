Node MMO Project
================

This is a very simple experiment in socketIO that allows multiple simulataneous client connections. The game uses HTML5 Canvas to render graphics, and socket.io with node.js to do all logic server-side. The only things handled client side are rendering and input handling.

![screenshot.png](https://github.com/swiecki/node-mmo/raw/master/screenshot.png "Screenshot")

TODO
----

Come up with a faster solutuion for generating starfield. Perhaps background field could be generated on the client and move in parallax to the foreground field that is generated on the server and is the same for everyone.

Add parallax starfields.

Add a directional pointer that points in the direction of an object- could start as a social feature, but this can be the beginning for quests and stuff.

Add more ships!
