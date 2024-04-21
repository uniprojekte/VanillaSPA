# VanillaSPA 


"It doesn't take a framework to build a Single Page Application."

 
VanillaSPA is a tiny baseapp that serves as a starting point to develop your own Single Page Application (SPA). 
It aims at small applications and offers some of the core concepts of SPAs like
- clientside rendering
- routing
- hash-based navigation
- a (modified) MVC-architecture
- a simple microservice protocol
- a minimalistic server implementation

VanillaSPA has an educational focus and tries to provide its functionality as understandable as possible.
As part of that, it has zero-code-dependencies (at least at runtime). 
It may also be suitable (and has already been used) for small real world applications.
However, due to its minimalistic approach, VanillaSPA lacks many of the features one would expect from a full fledged spa-framework such as AngularJS or EmberJS.

Architecture
------------
VanillaSPA follows a simplified Model View Controller (MVC)-architecture. 
A VanillaSPA-application consists of a centralized model, views and a router.

The model represents both application logic and data. 
The views display application data of the model and use its application logic to modify it.
Finally, the router is a generic component that manages and controls an applications views.

VanillaSPA includes a tiny http-server and a simple microservice protocol for client-server interaction.


How to start
------------
VanillaSPA comes in form of a demo-application that serves as a starting point to develop your own application.
To start the demo, simply run the server from project root directory by

    >node ./server/demoserver-vanillaspa.js

and follow the url shown on the console. 

Alternatively, install the npm-module express.js via

    >npm install express.js

and run the express-based server via

    >node ./server/demoserver-express.js

VanillaSPA uses the tool browserify/watchify to pack all clientside-code into one file named bundle.js.
If you change clientside-code, use watchify to update bundle.js.
First, install watchify by

    >npm install -g watchify

Then start it from the project directory by

    >watchify ./client/main.js -o ./public/bundle.js

Watchify observes all your clientside-files. 
Whenever a file changes, it automatically builds a new bundle.js.
The latter command is included in package.json and hence can be started from tools like visual studio code.
