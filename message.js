class Message {
  constructor(name, commands = []) {
    this.name = name;
    if (!name) {
      throw Error("Message name required.");
    }
    this.commands = commands;
  }
 
}

module.exports = Message;


/* setName() {
    let message = new Message('New message!');
    return message;
  // }*/

 /*
describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error('Message name required.'));
  });

  it("constructor sets name", function() {
    let message = new Message('New message!');
    expect(message.name).toEqual('New message!');
  });

  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    expect(message.commands).toEqual(commands);
  });

});
describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("constructor sets command type", function() {
    let command = new Command('STATUS_CHECK');
    expect(command.commandType).toEqual('STATUS_CHECK');
  });

  it("constructor sets a value passed in as the 2nd argument", function() {
    let command = new Command('MOVE', 20);
    expect(command.value).toEqual(20);
  });

});

  */