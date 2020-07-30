# c4cWeR0MS
MS Call 4 Code

The following instructions are for running on Debian 9 Linux.  The application should run on other platforms with no or minimal changes.

To run the application:

1) User Interface

The user interface is an angular application.  To run do the following:

* Navigate to the ./ui/green-karma-ui/
* Install npm (if not already done): 
* sudo apt-get install nodejs
* sudo npm install -g @angular/cli
* ng serve

The angular app will run on http://localhost:4200, and will expect the api to run on http://localhost:5000

2) API

The UI is a flask app that runs in a docker container. To run, do the following:

* Navigate to the ./api/ folder
* docker build . -t green-karma-ui
* docker run -p 5000:8080 green-karma-ui

Open a browser and go to http://localhost:4200 to access the Green Karma UI. :)