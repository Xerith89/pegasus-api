# Pegasus API

### What is it?

An open source API for creating, running and managing micro-services, written in TypeScript using Node/Express.

### How do I use it?

The project is still in development but you are welcome to use it any way you wish.

Typically the following steps are what you need to get going

##### Define a scheme

This is the core of your service where your business logic resides, any calls to a database, other services or APIs etc.. should be done here - typically in the invoke method. 

Start and Stop are where you put in any logic or cleanup for when the service starts and stops.

##### Define a scheme model 

This is the data that your scheme uses and will be compared against the request object body to make sure we have a valid request.

##### Construct the scheme with the model as an input parameter

n.b. The scheme name is important as it will be used for the url endpoint and it is set in the constructor for the scheme  e.g. /api/{schemename}

##### Add your scheme to the register services array

Pegasus will automatically create a route for your endpoint if you wish for the service to be exposed.

##### You are now ready to make POST requests to your service!

##### Contributors 

Contributors are small modular functions that you can reused in any of your schemes.

The example shows how to use a contributor in building a scheme response.

### Pull Requests

Contributions, bug fixes and suggestions are welcome
