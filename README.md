# Pegasus API

### What is it?

An open source API for creating, running and managing micro-services, written in TypeScript using Node/Express.

### How do I use it?

The project is still in development but you are welcome to use it any way you wish.

Typically the following steps are what you need to get going -

##### Define a service

You do this by extending the Service class and providing definitions for `Start :void`, `Stop :void` and `Invoke :any` methods. 

The Invoke method is where your business logic resides, any calls to a database, other services or APIs should be done here. Of course you can define and add as many helper methods as you wish to formulate a full response.

##### Add Contributors (Optional)

Contributors are small modular functions that you can reused in any of your schemes.

The example shows how to use a contributor in building a scheme response.

##### Define a service model 

This is the data that your scheme uses and will be compared against the request object body to make sure we have a valid request. The API does not validate the data, this is left to you when you implement as part of your service.

##### Construct the scheme with the model and name as input parameters

n.b. The scheme name is important as it will be used for the url endpoint and it is set in the constructor for the scheme  e.g. /api/{schemename} - they are case sensitive!

##### Add your scheme to the register services array

Pegasus will automatically create a route for your endpoint if you wish for the service to be exposed.


##### You are now ready to make POST requests to your service!

#### Console Commands

The follow commands are available from the console whilst the system is running - 

`close` - Performs a graceful close on the Pegasus server after stopping all services. 

`open` - Opens the Pegasus server for connections.

`stopall` - Stop all running services

### Pull Requests

Contributions, bug fixes and suggestions are welcome
