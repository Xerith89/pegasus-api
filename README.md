# Pegasus API

### What is it?

An open source API for creating, running and managing micro-services, written in TypeScript using Node/Express.

### How do I use it?

The project is in early development but the current plan of execution is as follows :

Define a scheme - This is the core of your service where your business logic resides, any calls to a database, other services or APIs etc.. should be done here - typically in the invoke method. Start and Stop are generally reserved for error handling.

Define a scheme model - This is the data that your scheme uses and will be compared against the request object body to make sure we have a valid request.

Link the scheme model to the scheme

n.b. The scheme name is important as it will be used for the url endpoint and it is set in the constructor for the scheme  e.g. /api/{schemename}

import your service and register it in the container by adding it to the services array.

You are now ready to make POST requests to your service

Contributors are smaller than full blown schemes and cannot be reached by an endpoint but they contribute to the running of schemes and should be reusable components. They are usually pure static functions

### Pull Requests

Contributions, bug fixes and suggestions are welcome
