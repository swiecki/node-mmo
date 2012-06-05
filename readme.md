Node MMO Project
================

This is a very simple experiment in socketIO that allows multiple simulataneous client connections. The game uses HTML5 Canvas to render graphics, and socket.io with node.js to do all logic server-side. The only things handled client side are rendering and input handling.

![screenshot.png](https://github.com/swiecki/node-mmo/raw/master/screenshot.png "Screenshot")

Gameplay
--------

Idea for gameplay: you are a lifeboat. save people in space. You have to go around to waypoints to save them, but you also have limited carrying capacity so you have to go back to the mothership. You could also have limited fuel, and can run out if you don't refill at the mothership, but ships can refuel each other at no cost.

TODO
----

Amend CSS file to add scable user interface.

Add a pregame menu to handle nickname input?

Add a store so we can save the player on disconnect according to some pc-unique id (maybe a hash in a cookie) and then recover from where they left off if they come back-- store only upon disconnect, but make cookie at connection.

Give ships different movement speeds, turning speeds, and rescue distances.

Add fuel mechanic.

Other stuff:

Add xp-bar to HUD.

Attach a random message for flavor to each waypoint that is shown upon completion.

Make rendering independent of game logic- right now it updates only when it receieves the request. Have it update anyways, and only provide rendering information on request. Goes hand in hand with: Switch out a single array for data and rendering for two arrays- one that has complete data (or an object) and an array that is modified every time someone disconnects or connects that has easy rendering data in a way that is fast to iterate through.


~~Make other players ships rotate -- Rotate ships according to either their velocities or their acceleration (will probably be better to do a, but maybe harder?);~~

~~fix art assets that need transparent backgrounds~~

~~Make something cool happen after the boundaries- either deep space message, trigger a new environment, or teleport all the way across the map, or something.~~

~~Add waypoint generation system, generates waypoints based on random distance. XP per waypoint is based on distance from player at generation. Upon completion, level and xp are recalculated.~~

~~Space physics- drifting and acceleration-based gameplay instead of position based gameplay~~

~~Add chat functionality. With custom fonts!~~

~~Add parallax starfields.~~

~~Add a directional pointer that points in the direction of an object- could start as a social feature, but this can be the beginning for quests and stuff.~~

~~Add stats library for more advanced fps monitoring~~

~~Come up with a faster solutuion for generating starfield. Perhaps background field could be generated on the client and move in parallax to the foreground field that is generated on the server and is the same for everyone.~~

~~Player identification- names above ships.~~

~~Refine interface- chat takes up too much of the screen right now.~~

~Need 8 art assets:Add in scrapped ships at waypoints. Make ship differences meaningful. Make at least 5 ships. Have everyone start at the first ship, then you can choose upon level up. ~

License terms
-------------

This software is available under the creative commons Attribution-NonCommercial 2.5 license, as detailed at the link below.

http://creativecommons.org/licenses/by-nc/2.5/
