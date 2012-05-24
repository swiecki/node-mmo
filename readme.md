Node MMO Project
================

This is a very simple experiment in socketIO that allows multiple simulataneous client connections. The game uses HTML5 Canvas to render graphics, and socket.io with node.js to do all logic server-side. The only things handled client side are rendering and input handling.

![screenshot.png](https://github.com/swiecki/node-mmo/raw/master/screenshot.png "Screenshot")

TODO
----

Add a directional pointer that points in the direction of an object- could start as a social feature, but this can be the beginning for quests and stuff.

Make rendering independent of game logic- right now it updates only when it receieves the request. Have it update anyways, and only provide rendering information on request.

Refine interface- chat takes up too much of the screen right now.

Make something cool happen after the boundaries- either deep space message, trigger a new environment, or teleport all the way across the map, or something.

Add more ships with different movement speeds and levels, maybe make the player get different ships once they level.

License terms
-------------

This software is available under the MIT "Expat" License:

Copyright (C) 2012 Daniel Swiecki

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
