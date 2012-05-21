Node MMO Project
================

This is a very simple experiment in socketIO that allows multiple simulataneous client connections. The game uses HTML5 Canvas to render graphics, and socket.io with node.js to do all logic server-side. The only things handled client side are rendering and input handling.

TODO
----

Switch out a single array for data and rendering for two arrays- one that has complete data (or an object) and an array that is modified every time someone disconnects or connects that has easy rendering data in a way that is fast to iterate through.

Make the starfield generated on the server and passed through on connection.

Add chat functionality.

Add parallax starfields.

Add a directional pointer that points in the direction of an object- could start as a social feature, but this can be the beginning for quests and stuff.

Add more ships!
