# t-web



How to run our server
Since we are using docker, you can check out our docker-compose file for the containers configuration.
We currently have 3 containers:

- mongodb_1 :    MongoDB database.
- backend_1 :    The container we are using to launch our backend server.
- frontend_1:    The container we are using to launch our backend server.

We use docker-compose to run our website

available options:
build       re-compiles the code, should be followed by a restart.
restart     restarts the java container - is needed to take modifications into account.
up          triggers build then a restart.
logs        gets java's logs.
clear       WARNING: hard reset on everything. Kills containers, volumes (including database data), images and kittens.
apk         builds front code into an apk.
help        displays help

At launch, our website is deployed on :
http://localhost/3000
