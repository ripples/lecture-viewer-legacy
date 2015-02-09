# Lecture Viewer

###Getting Started
First install Gulp globally with `npm install gulp -g`.

After checking out the project, run `npm install` from the cloned directory.  This will install the necessary dependencies.

To start watching files for changes so that these changes will be reflected in transpiled + concatenated build files, run `gulp watch`.  Any time you save a change in a file in the source directory (or the index.html), Gulp will go ahead and perform its tasks on the necessary files and ship it to the build portion of the project directory.  Running `gulp` will perform the task manually.

**TODO** : The files should be served, currently you simply access the `index.html` from the `dist` directory.

###Structure

You will find multiple `STYLE.js` files in the project. These are not to be used, rather, they serve as a style guide for how to implement the appropriate Flux Actions, Components, and Stores.
