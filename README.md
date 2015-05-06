<!-- ###Getting Started -->
<!-- First install Gulp globally with `npm install gulp -g`.

After checking out the project, run `npm install` from the cloned directory.  This will install the necessary dependencies.

To start watching files for changes so that these changes will be reflected in transpiled + concatenated build files, run `gulp watch`.  Any time you save a change in a file in the source directory (or the index.html), Gulp will go ahead and perform its tasks on the necessary files and ship it to the build portion of the project directory.  Running `gulp` will perform the task manually.

Additonally, if you install the `livereload` Chrome extension, when you run `gulp watch` and then open `localhost:9000`, any changes you save in files in the `src` directory will be automatically reloaded in the browser.  It is currently pretty slow (~4 seconds), so I would like to look into making the tasks faster. -->

<!-- ###Structure

You will find multiple `STYLE.js` files in the project. These are not to be used, rather, they serve as a style guide for how to implement the appropriate Flux Actions, Components, and Stores. -->

Dependencies
================
1. Run `npm install` to pull all required `node_module` dependencies
2. Run `npm install gulp -g` to install Gulp, the automated build system used for the front-end, globally.
3. Follow the instructions at `http://sass-lang.com/install` to install Sass locally. This is required to view the app in the browser.


Running
================
**TODO : Integrate Gulp workflow into the express app so there is only one command for running.**

1.
Type `gulp` to run the Gulpfile which compiles, minifies, and copies `front_end` source files to the `production` directory.
**NOTE: You must run `gulp` each time you wish to view new changes from the `front-end` source.**

2. (option 1) Enter the command 'npm start' to launch the app at 'localhost:3000' in a development environment

2. (option 2) Enter the command 'npm production' to launch the app at 'localhost:3000' in a production environment

Local Build Server (For Front-End folks!)
================
1. Type `gulp watch` to start a server at `localhost:9000`.  

This server watches for changes to `front-end` source files and compiles and copies them over to the production.  This way, you can refresh your browser and see the changes instantly instead of having to recompile manually.

Testing
==============
1. Run the server: 'npm start'
2. Open another terminal and type 'make test' or 'npm test'

If this doesn't work, make sure you have the most up to date libraries by running 'npm install'

API Documentation
=================
http://umass-cs-497.github.io/lecture-viewer/apiV1.html
