const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("7 constructor sets position and default values for mode and generatorWatts",function() {
    let rover = new Rover(98328);
    expect(rover.position).toEqual(98328);

    actual = rover.mode;
    expected = 'NORMAL';
    assert.strictEqual(actual, expected);

    actual = rover.generatorWatts;
    expected = 110;
    assert.strictEqual(actual, expected);
  });

  it("TEST 8 response returned by receiveMessage contains name of message",function(){
     let rover = new Rover(98382);
     let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
     let message = new Message('Test message name', commands);
     let response = rover.receiveMessage(message);
     expect(response.message).toEqual("Test message name");
  
  });

  
  it("TEST 9 response returned by receiveMessage includes two results if two commands are sent in the message",function(){
     let rover = new Rover(98382);
     let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
     let message = new Message('Test message with two commands', commands);
     let response = rover.receiveMessage(message); 
     expect(response.results.length).toEqual(2);
     
   
  });

  it("TEST 10 responds correctly to status check command",function(){
     let rover = new Rover(100);
     let commands = [new Command("STATUS_CHECK")];
     let message = new Message('Test status check command', commands);
     let response = rover.receiveMessage(message);

     expect(response.results[0].completed).toBeTrue;
     expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
     expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
     expect(response.results[0].roverStatus.position).toEqual(100);

  });

  it("TEST 11 responds correctly to mode change command",function(){
     let rover = new Rover(100);
     let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command ("STATUS_CHECK")];
     let message = new Message('Test mode change command', commands);
     let response = rover.receiveMessage(message); 
     expect(response.results[0].completed).toBeTrue;
     expect(response.results[1].completed).toBeTrue;
     expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
    
  });

  it("TEST 12 responds with false completed value when attempting to move in LOW_POWER mode",function(){
     let rover = new Rover(100);
     let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 120), new Command("STATUS_CHECK")];
     let message = new Message('Test move in low power command', commands);
     let response = rover.receiveMessage(message); 
    
     expect(response.results[0].completed).toBeTrue;
     expect(response.results[1].completed).toBeFalse;
     expect(response.results[2].roverStatus.position).toEqual(100);

  });

  it("TEST 13 responds with position for move command",function(){
     let rover = new Rover(100);
     let commands = [new Command("MOVE", 125), new Command("STATUS_CHECK")];
     let message = new Message('Test move command', commands);
     let response = rover.receiveMessage(message); 
     
     expect(response.results[0].completed).toBeTrue;
     expect(response.results[1].completed).toBeTrue;
     expect(response.results[1].roverStatus.position).toEqual(125);
  });

});
