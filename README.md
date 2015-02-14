# Lecture Viewer

###Getting Started
First install Gulp globally with `npm install gulp -g`.

After checking out the project, run `npm install` from the cloned directory.  This will install the necessary dependencies.

To start watching files for changes so that these changes will be reflected in transpiled + concatenated build files, run `gulp watch`.  Any time you save a change in a file in the source directory (or the index.html), Gulp will go ahead and perform its tasks on the necessary files and ship it to the build portion of the project directory.  Running `gulp` will perform the task manually.

Additonally, if you install the `livereload` Chrome extension, when you run `gulp watch` and then open `localhost:8888`, any changes you save in files in the `src` directory will be automatically reloaded in the browser.  It is currently pretty slow (~4 seconds), so I would like to look into making the tasks faster.

###Structure

You will find multiple `STYLE.js` files in the project. These are not to be used, rather, they serve as a style guide for how to implement the appropriate Flux Actions, Components, and Stores.
