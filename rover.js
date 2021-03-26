class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {

    let resultsObj = {
      message: message.name,
      results: []
    };
   
    for (let i = 0; i < message.commands.length; i++) {
        //TEST 11
        if (message.commands[i].commandType === "MODE_CHANGE") {
          if(message.commands[i].value === 'LOW_POWER') {
            this.mode = message.commands[i].value;
            resultsObj.results.push({
            completed: true
            });
          }
        }
        //TEST 13 & 12
        else if (message.commands[i].commandType === 'MOVE') {
          if (this.mode === 'NORMAL') {
            this.position = message.commands[i].value;
            resultsObj.results.push({
              completed: true
              });
          }
          else if (this.mode === "LOW_POWER") {
            resultsObj.results.push({
              completed: false
              });
          }
        }
        //TEST 10
        else if (message.commands[i].commandType === "STATUS_CHECK") {
          resultsObj.results.push({
            completed: true, 
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position}
          });
        }  
    }
  return resultsObj;
  }
}
module.exports = Rover;
