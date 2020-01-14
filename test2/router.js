'use strict';

const controller = require('./controller');

app.post('/trigger', async function(req, res){
  const mainText = await controller.textToSearch();
  const subs = await controller.subTexts();

  for (let i in subs) {
    console.log( subs[i], getIndex(mainText.toLowerCase(), subs[i].toLowerCase()));
  }
});

app.get('/trigger', async function(req, res){
  try {
    const mainText = await controller.textToSearch();
    const subs = await controller.subTexts();

    let results = {
      candidate : "Krishna Sai Kode",
      text: mainText,
      results: []
    };
    for (let i in subs) {
      const result = controller.getIndex(mainText.toLowerCase(), subs[i].toLowerCase());
      results.results.push({
        subtext: subs[i],
        result: result.length
          ? result.join(', ')
          : "<No Output>"
      });
    }
  
    await controller.submitResults(results);
    return res.json(200);
  } catch(err) {
    console.log(err.stack);
    return res.status(500).send({
      message: 'This is an error!'
    });
  }
});