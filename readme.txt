## Pegasus API

### What Is It?

An open source API for creating, running and maintaining micro-services, written in TypeScript using Node/Express.

### How Do I Use It? 

The project is currently in early development but the envisioned process for using and creating services is as follows:

Define a scheme model - This represents all the attributes that you expect your endpoint to receive from the user and also any other resources from databases/other APIs

Define a scheme - All schemes will need to extend the service abstract class and implement definitions for Start, Stop and Invoke methods. Invoke is responsible for what your service does when it receives the required data. You can do whatever you want here, load from a DB, perform some functions with the input data etc...
Start and Stop are typically used for diagnostics

Naming is important for your service, the name of the scheme will be used for the url endpoints e.g. /api/{schemeName}

Link the scheme and scheme model - The scheme will use the model to filter bad requests and compile a response

Import your scheme and add it to the array of services in the pegasus file

You are then ready to make POST requests to your end point

PUT/PATCH/DELETE/GET are not supported

### Contributions

Contributions, bug fixes and suggestions are welcome.
