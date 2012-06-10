Node MMO Project
================

This is a very simple experiment in socketIO that allows multiple simulataneous client connections. The game uses HTML5 Canvas to render graphics, and socket.io with node.js to do all logic server-side. The only things handled client side are rendering and input handling.

![screenshot.png](https://github.com/swiecki/node-mmo/raw/master/screenshot.png "Screenshot")

Gameplay
--------

Idea for gameplay: you are a rescue ship. You save people from wrecked ships in space. You must cooperate with other players and carefully budget your energy, as your ship's reactor only slowly regenerates your reserves. Your endeavors earn you experience, which you can use to increase a multitude of ship characteristics.

TODO
----

Change waypoints to be the same for everyone, give each player a current waypoint index and keep the next ones on the server in an array along wihth whether or not they are completed. Make waypoints go away after half the current players have gotten it. Those players immediately move on to the next waypoint?

Amend CSS file to add scalable user interface.

Add a pregame menu to handle nickname input?

Add a store so we can save the player on disconnect according to some pc-unique id (maybe a hash in a cookie) and then recover from where they left off if they come back-- store only upon disconnect, but make cookie at connection.

Allow leveling up of energy regeneration rate, fuel efficiency rate, max speed, accelleration rate, and rescue distance.


Other stuff:

Make rendering independent of game logic- right now it updates only when it receieves the request. Have it update anyways, and only provide rendering information on request. Goes hand in hand with: Switch out a single array for data and rendering for two arrays- one that has complete data (or an object) and an array that is modified every time someone disconnects or connects that has easy rendering data in a way that is fast to iterate through.

~~Add prerendered versions of all ships, make ship choice random to increase ship diversity~~

~~Add energy mechanic- slowly regenerates, need it to move.~~

~~Add xp-bar to HUD.~~

~~Need 8 art assets:Add in scrapped ships at waypoints. Make ship differences meaningful. Make at least 5 ships. Have everyone start at the first ship, then you can choose upon level up.~~

~~Make other players ships rotate -- Rotate ships according to either their velocities or their acceleration (will probably be better to do a, but maybe harder?)~~

~~Player identification- names above ships.~~

~~fix art assets that need transparent backgrounds~~

~~Make something cool happen after the boundaries- either deep space message, trigger a new environment, or teleport all the way across the map, or something.~~

~~Add waypoint generation system, generates waypoints based on random distance. XP per waypoint is based on distance from player at generation. Upon completion, level and xp are recalculated.~~

~~Space physics- drifting and acceleration-based gameplay instead of position based gameplay~~

~~Add chat functionality. With custom fonts!~~

~~Add parallax starfields.~~

~~Add a directional pointer that points in the direction of an object- could start as a social feature, but this can be the beginning for quests and stuff.~~

~~Add stats library for more advanced fps monitoring~~

~~Come up with a faster solutuion for generating starfield. Perhaps background field could be generated on the client and move in parallax to the foreground field that is generated on the server and is the same for everyone.~~

~~Refine interface- chat takes up too much of the screen right now.~~

License terms
-------------

This software is available under the creative commons Attribution-NonCommercial 3.0 license, as detailed at the link below.

http://creativecommons.org/licenses/by-nc/3.0/
