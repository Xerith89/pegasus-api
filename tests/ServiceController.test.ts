import ServiceController from '../src/core/ServiceController';
import {Service} from '../src/core/Service';
import TestService from './TestService';


test('registerServices should add a service correctly', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
  
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    const secondService = new TestService({
        name: "",
            age:0
        }, "testservicetwo",true);

    //Act
    controller.registerServices([service, secondService], serviceContainer);

    //Assert
    expect(serviceContainer.length).toBe(2);
});

test('startServices should start everything correctly', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    const secondService = new TestService({
        name: "",
         age:0
        }, "testservicetwo",true);
    controller.registerServices([service, secondService], serviceContainer);

    //Act
    controller.startServices(serviceContainer);

    //Assert
    expect(service.isRunning()).toBeTruthy();
    expect(secondService.isRunning()).toBeTruthy();
    
});

test('stopService should stop the particular service ', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    controller.registerServices([service], serviceContainer);
    controller.startServices(serviceContainer);

    //Act
    controller.stopService("testservice", serviceContainer);

    //Assert
    expect(service.isRunning()).toBeFalsy();
    
});

test('startService should start the particular service ', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    controller.registerServices([service], serviceContainer);
    controller.startServices(serviceContainer);

    //Act
    controller.stopService("testservice", serviceContainer);
    controller.startService("testservice", serviceContainer);

    //Assert
    expect(service.isRunning()).toBeTruthy();
    
});

test('stopServices should stop all services ', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    const secondService = new TestService( {name: "", 
    age: 0}
    , "testservicetwo",true);
    controller.registerServices([service,secondService], serviceContainer);
    controller.startServices(serviceContainer);

    //Act
    controller.stopServices(serviceContainer);

    //Assert
    expect(service.isRunning()).toBeFalsy();
    expect(secondService.isRunning()).toBeFalsy();
});


