'use strict';
const controller = require('./controller');

app.get('/', async function(req, res) {
  const range = await controller.rangeInfo();
  const divInfo = await controller.divisorInfo();

  res.write("SAMPLE OUTPUT\n\n");
  for (let num = range.lower; num <= range.upper; num++) {
    let output = num + ": ";
    for (let j in divInfo) {
      if (divInfo[j].divisor != 0) {
        output += (num % divInfo[j].divisor === 0)
          ? divInfo[j].output
          : "";
      }
    }
    res.write(output+"\n");
  }
  res.end();
});