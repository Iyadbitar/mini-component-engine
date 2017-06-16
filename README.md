
### Running The Application
You need latest version of Node there is a lot of ES6 code and async/await in server code that is not compiled through Babel, you can use the "n" tool to change Node versions quick and easy.

1. You need MySQL database after installing MySQL and run it locally create new database
2. clone the this repo to your local machine
3. Update the DB config in config/index.js
4. Run cd to application directly and run "npm install"
5. to import DOB jobs to local database run "npm run db:import"
6. run front-end build "npm run client:build"
7. run server "npm run server:run"


### Architecture
1. I followed a "component" approach to build the application to do so I built a mini component engine to help me render component from template
2. Also I followed the famous Facebook Flux architectural pattern approach that suggest unidirectional data flow through centralized data store for application state, to accomplish that I built a mini Redux like class with option to run async action to load data from back-end API.
3. singleton store instance is injected in all component controller to give them access to the store to read state and also dispatch actions.
4. code for store is in core/store.js
5. code in core/component.js is for base component controller
6. code in core/view.js  is for base view that render HTML template by creating virtual DOM from string, this class contain a lot of code that does variable placement in template, sections repeat, and event binding
7. with Redux pattern most of the code will be in actions and reducers, I create one reducer to do everything
8. Redux has the option of middleware but in my implementation I dropped this option and hard coded the middleware that does async operation in the store code.
9. CSS encapsulation in component achieved by css-loader for webpack
10. I didn't use jQuery and all code is vanilla JavaScript


### Notes
1. I wanted to do more but I don't have enough time, so there is some code redundancy that can by DRYed and also I took a lot of shortcuts in the code just to finish quickly
2. The sorting feature is missing but this any easy addition
3. Data importer will import only 1000 record available in first page of DOB api, also here I wanted to do more and load all data through child process in Node but I don't have time
5. I think (hopefully) what I did to this point should give you good idea about my JavaScript and application architectural skills


## Thank You
