# Pegasus API

[![CircleCI](https://circleci.com/gh/Xerith89/pegasus-api.svg?style=svg)](https://circleci.com/gh/Xerith89/pegasus-api)

### What is it?

A lightweight open source API for creating, running and managing micro-services that interact through web endpoints, written in TypeScript using Node/Express.

### How do I use it?

The project is still in development but you are welcome to use it any way you wish.

Typically the following steps are what you need to get going -

##### Define a service

You do this by extending the Service class and providing definitions for `Start :void`, `Stop :void` and `Invoke :object` methods. 

The 'invoke' method is where you construct a response that will be returned to the caller of the endpoint. It should be a JSON object to allow services to communicate with eachother. You can call other services in your service `invoke` or you can call contributors to aid in building your response. 

The 'invoke' method is async to allow you to wait for contributors without blocking the main execution thread. There has also been a boost to performance with a non async sample service taking 45ms against 5ms for the async version. This means that 'invoke' will now return a promise and this should be handled accordingly.

##### Add Contributors (Optional)

Contributors are small modular functions that you can reused in any of your services.

The example shows how to use a contributor in building a service response.

##### Construct the service

A service constructor takes 3 parameters - the attributes for your service  (an empty object can be passed if your service requires no attributes), the service name and whether the service is exposed to an endpoint.
n.b. The service name is important as it will be used for the url endpoint  e.g. /api/{servicename} - they are case sensitive!

##### Add your service to the register services array

Pegasus will automatically create a route for your endpoint if you wish for the service to be exposed. In order to facilitate testing and other future expansions, it is possible to pass a container as a separate parameter if you do not want your services going into the default container.

##### Configure the service route

You will need to configure the service in the ServiceRouter class. For now there is a bit of boiler plate involved, basically you can copy the example code and then modify the returns how you wish. There are plans to abstract this in future releases.

##### You are now ready to make POST requests to your service!

#### Console Commands

The follow commands are available from the console whilst the system is running - 

`shutdown` - Performs a graceful shutdown on the Pegasus server after stopping all services. 

`startall` - Start all non running services.

`start {servicename}` - Start the designated service if it exists and is not running.

`stop {servicename}` - Stop the designated service if it exists and is not running.

`stopall` - Stop all running services.

`restartall` - Restart all running services.

`restart {servicename}` - Restart the specific service.

`listall` - Show all service names and statuses.

### Pull Requests

Contributions, bug fixes and suggestions are welcome
