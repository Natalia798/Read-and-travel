## Versions

Node version used: v10.16.0 

npm version used: 6.9.0

React version used: 16.8.6

## Installing npm

npm is installed with Node.js. This means that you have to install Node.js to get npm installed on your computer. Download Node.js from the official Node.js web site: https://nodejs.org

## Info

First time setting up the project:

### `git clone https://yourUsername@bitbucket.org/claudiu2000/rt.git`

To copy and connect the repository locally: enter git clone and the repository URL at your command line. 

### `cd rt`

Navigates inside the folder that was created (cd command means: change directory, folder name is 'rt'). 

### `npm install`

Creates the 'node modules' folder, which is ignored on git(will not be pushed or pulled). You should also run this command after you pull some changes from git, if the package.json file is modified, to let npm install the additionals packages specified in the file.

---

### `npm start`

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

---

## Aditional libraries used: (add more here as the project is built)

### `npm install --save react-router react-router-dom`

Package used for routing between components ("pages") of the app.

### `npm install --save redux react-redux`

Redux is used for maintaining a global state in a store. so that state can be accessed in any component.

###  `npm install axios --save`

Axios package is used for ajax requests.

### `npm install --save redux-thunk`

Thunk is a middleware for writing async code inside redux action creators.

### `npm install --save enzyme react-test-renderer enzyme-adapter-react-16`

Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output.

### `npm install redux-mock-store --save-dev`

A mock store for testing Redux async action creators and middleware. The mock store will create an array of dispatched actions which serve as an action log for tests.

### `npm install moxios --save-dev`

Mock axios requests for testing.

### `npm install --save-dev expect`

### 'npm i eslint-config-react-app'
    This prevent syntax errors before they occur and save time debugging your code.

### `npm install firebase --save`
Firebase SDK enables access to Firebase services like authentication, database (Firestore or Realtime Database) etc. 

### `npm install react-redux-firebase redux-firestore --save`
Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.

### `npm install --save react-leaflet leaflet`
Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. 

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
