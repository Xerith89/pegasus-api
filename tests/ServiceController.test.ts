import ServiceController from '../src/core/ServiceController';
import {Service} from '../src/core/Service';
import TestServiceModel from './TestServiceModel';
import TestService from './TestService';


test('registerServices should add a service correctly', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const model = new TestServiceModel();
    const service = new TestService(model, "testservice",true);

    //Act
    controller.registerServices([service], serviceContainer);

    //Assert
    expect(serviceContainer.length).toBe(1);
});

test('startServices should start everything correctly', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const model = new TestServiceModel();
    const service = new TestService(model, "testservice",true);
    controller.registerServices([service], serviceContainer);

    //Act
    controller.startServices(serviceContainer);
    const testService: Service = ServiceController.FindService("testservice", serviceContainer);
    //Assert
    expect(testService.isRunning()).toBeTruthy();
    
});

test('stopService should stop the particular service ', () => {
    //Arrange
    let serviceContainer : Service[] = [];
    const controller = new ServiceController();
    const model = new TestServiceModel();
    const service = new TestService(model, "testservice",true);
    controller.registerServices([service], serviceContainer);
    controller.startServices(serviceContainer);

    //Act
    controller.stopService("testservice", serviceContainer);

    //Assert
    expect(service.isRunning()).toBeFalsy();
    
});


