import ServiceController from '../src/core/ServiceController';
import {Service} from '../src/core/Service';

import TestService from './TestService';


test('service isExposed functions as expected', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
  
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    const secondService = new TestService({
        name: "", 
        age: 0}, "testservicetwo",false);

    //Act
    controller.registerServices([service, secondService], serviceContainer);

    //Assert
    expect(service.isExposed()).toBeTruthy();
    expect(secondService.isExposed()).toBeFalsy();
});

test('service isRunning functions as expected', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
   
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    const secondService = new TestService({
        name: "", 
        age: 0}, "testservicetwo",false);

    //Act
    controller.registerServices([service, secondService], serviceContainer);
    controller.startServices(serviceContainer);
    controller.stopService("testservicetwo", serviceContainer);

    //Assert
    expect(service.isRunning()).toBeTruthy();
    expect(secondService.isRunning()).toBeFalsy();
});

test('service isRunning functions as expected', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    const secondService = new TestService({
        name: "", 
        age: 0}, "testservicetwo",false);

    //Act
    controller.registerServices([service, secondService], serviceContainer);
    controller.startServices(serviceContainer);
    
    //Assert
    expect(service.getServiceName()).toBe('testservice');
    expect(secondService.getServiceName()).toBe('testservicetwo');
});

test('service updateRunningStatus functions as expected', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const service = new TestService({
        name: "", 
        age: 0}
        , "testservice",true);
    controller.registerServices([service], serviceContainer);
    controller.startServices(serviceContainer);
    expect(service.isRunning()).toBeTruthy();

    //Act
    service.updateRunningStatus(false);
   
    //Assert
    expect(service.isRunning()).toBeFalsy();
   
});


