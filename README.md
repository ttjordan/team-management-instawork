# Team Management Application
This is a full-stack team management application built with Django (backend) and React (frontend). 
The application allows users to add, edit, and delete team members, along with role assignment capabilities.

## Prerequisites
### Backend (Django and Python)
+ Python: Install Python following
[this guide](https://medium.com/marvelous-mlops/the-rightway-to-install-python-on-a-mac-f3146d9d9a32) 
for Mac users to ensure proper setup with pyenv. This was tested using zsh shell. [installing zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
+ Install XCode Command Line Tools
```
xcode-select --install
```
+ Install HomeBrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew upgrade
```
+ Install Pyenv
```
brew install pyenv pyenv-virtualenv
```
```
eval "$(pyenv init -)"
if which pyenv-virtualenv-init > /dev/null; then eval "$(pyenv virtualenv-init -)"; fi
```
+ Restart all your terminals to ensure pyenv is initialized.
+ Install Python 3.13.0
```
pyenv install 3.13.0
```
+ create a virtual environment

```
pyenv virtualenv 3.13.0 team-management-instawork
pyenv local team-management-instawork
pyenv versions
```
## Tech stack
### Django and Django Rest Framework for the backend API.
### Frontend (React)
+ Node.js and npm: Required for running the React frontend.
+ React: The frontend is built with create-react-app.

## Installation
### Backend Setup
Set up Python environment:

```
pyenv local team-management-instawork
```
```
eval "$(pyenv init -)"
if which pyenv-virtualenv-init > /dev/null; then eval "$(pyenv virtualenv-init -)"; fi
```
```
python --version
```
### Install Dependencies:

```
pip install -r requirements.txt
```

### Database Migrations: 
Initialize the database and create necessary tables.

```
python manage.py migrate
```

### Run Django Server: 
Start the backend server on http://127.0.0.1:8000/.

```
python manage.py runserver
```
## Frontend Setup
### Navigate to the Frontend Directory:

```
cd frontend
```
### Install Dependencies:

```
npm install
```
### Run React Development Server: 
Start the frontend server on http://localhost:3000/.

```
npm start
```
The app should now be accessible at http://localhost:3000 with the backend API running on http://127.0.0.1:8000.

## Project Structure
+ folders within team_management: Contains Django app and frontend app.
+ frontend: Contains React components and styling. 
  - api: API requests and data handling logic.
  - styles: Custom CSS for styling React components.
  - components - react components for the views

## Usage
### Running the Application
#### Start the Backend:
```
python manage.py runserver
```
#### Start the Frontend:
```
cd frontend
npm start
```
## Managing Team Members
### Add: Use the "Add" button to create a new team member.
### Edit: Select a team member to update their information.
### Delete: Remove a team member by clicking "Delete".

## Development Notes
+ CORS: Disabled for development and testing. Enable CORS settings in production as needed.
+ Environment Management: Ensure pyenv and virtual environments are set up correctly when restarting your machine.
+ Error Handling: Basic error handling implemented. Production environment should have more robust logging, error handling and monitoring.
+ Production Requirements: This app is currently set up for development. For production, you may want to implement:
+ Unit & Integration Tests: Add tests for API endpoints and React components.
+ Logging & Tracing: Set up logging for backend operations.
+ CI/CD: Continuous Integration and Deployment scripts.
+ Security Settings: Secure CORS, HTTPS, and database configurations.
+ User info section could probably be reused if it happens in many places
+ Styling could be made better
+ Add python package manager such as [uv](https://docs.astral.sh/uv/)
## Troubleshooting
### Backend Issues:

+ Ensure pyenv and virtual environment are active.
+ Check for missing dependencies in requirements.txt.
### Frontend Issues:

+ Ensure npm install was completed successfully.
+ Check for CORS issues if the backend is unreachable.


below is autogenerated react readme content.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
