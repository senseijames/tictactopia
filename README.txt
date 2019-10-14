Mission Control
* * * * * * * * * * * 

Markers!!
https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg
https://raw.githubusercontent.com/jeromeetienne/AR.js/master/three.js/examples/marker-training/examples/pattern-files/pattern-hiro.patt


AR Handtracking
Would need better model (to recognize back of the hand better), but looks interesting ATVL
- https://github.com/victordibia/handtrack.js/
- https://hackernoon.com/handtrackjs-677c29c1d585

LOH
 hiding (easein/out) side menu

TOCO
- Connect 4 ("n") game mode
- Over the network (so can play with friends!)
- Friend list / ATVL 'send invitation to play' based on email / playerid / phone id / number (so no database required?  May still have to verify phone number locally, e.g. by sending text message)
- Challenge: possible without DB?  Can send a push notification using device id, perhaps?
- Sound effects ('x' sound, 'o' sound, celebration sound, configurable by player so they can have their own victory music)
- Animate wins (on a repeating interval)
- Support for more icons
  https://fontawesome.com/cheatsheet?from=io
  Unminified CSS here: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css

- Better font
- Animate bar chart then fade in win count
- Draw pie chart, then add settings switch (or click is fine I guess)
- Picture frame

Layout
- Scroll the screen for super large layouts so it doesn't break
- If going to allow for resize (e.g. pinch to zoom) will need better letter centering


* * * * * * * * * *
* Running
* * * * * * * * * *
To serve to your phone on *WiFi (via HTTPS, using Angular's self-generated SSL cert, so you can use the mobile camera!)

  ng s --host=0.0.0.0 --port=4200 --ssl

(* Technically this will make the app available on the same network as your computer, which is almost always WiFi)