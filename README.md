###Getting Started
First install Gulp globally with `npm install gulp -g`.

After checking out the project, run `npm install` from the cloned directory.  This will install the necessary dependencies.

To start watching files for changes so that these changes will be reflected in transpiled + concatenated build files, run `gulp watch`.  Any time you save a change in a file in the source directory (or the index.html), Gulp will go ahead and perform its tasks on the necessary files and ship it to the build portion of the project directory.  Running `gulp` will perform the task manually.

Additonally, if you install the `livereload` Chrome extension, when you run `gulp watch` and then open `localhost:9000`, any changes you save in files in the `src` directory will be automatically reloaded in the browser.  It is currently pretty slow (~4 seconds), so I would like to look into making the tasks faster.

###Structure

You will find multiple `STYLE.js` files in the project. These are not to be used, rather, they serve as a style guide for how to implement the appropriate Flux Actions, Components, and Stores.



Running
================
Run `npm install` first time pulling

Type 'node app.js' to launch the app at `localhost:3000`

Testing
==============
1. Run the server: 'npm start'
2. Open another terminal and type 'make test' or 'npm test'

If this doesn't work, make sure you have the most up to date libraries by running 'npm install'

API Documentation
=================
http://umass-cs-497.github.io/back-end-lecture-viewer/apiV1.html
