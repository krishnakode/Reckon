'use strict';

//const mailController = require('../services/');
const textEndPoint = "https://join.reckon.com/test2/textToSearch";
const subTextsEndPoint = "https://join.reckon.com/test2/subTexts";
const submitResultsEndPoint = "https://join.reckon.com/test2/submitResults";
const nodefetch = require('node-fetch');

app.post('/trigger', async function(req, res){
  const mainTest = "Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!"; //await textToSearch();
  const subTexts = ["Peter", "peter", "pick", "pi", "z"]; //await subTexts();
  for (let i in subTexts) {
    console.log( subTexts[i], getIndex(mainTest, subTexts[i]));
  }
});

app.get('/trigger', async function(req, res){
  const mainText = await textToSearch();
  console.log("Text to Search: ", typeof mainText, mainText.text, mainText);
  const subs = await subTexts();
  console.log("SubTexts: ", subs);
  for (let i in subs) {
    console.log( subs[i], getIndex(mainText.toLowerCase(), subs[i].toLowerCase()));
  }
});

async function textToSearch() {
  const response = await fetch(textEndPoint);
  return response.text;
}

async function subTexts() {
  const response = await fetch(subTextsEndPoint);
  return response.subTexts;
}

async function submitResults(results) {
  const response = await fetch(submitResultsEndPoint, results);
  return ;
}

async function fetch(url, body = null) {
  try {
    if (body) {
      const response = await nodefetch(url, { method: "POST", body: body });
      return await response.json();
    } else {
      const response = await nodefetch(url);
      return await response.json();
    }
  } catch (err) {
    console.log("Request: ", url, ", Error:", JSON.stringify(err));
    fetch(url, body);
  }
}

function getIndex(s, sub) {
  let indexes = []
  let start = 0 
  let end = 0
  while (start < s.length) {
    if ( s[start+end] != sub[end]) {
      start += 1;
      end = 0;
      continue;
    }
    end += 1;
    if (end === sub.length) {
      indexes.push(start+1);
      start += 1;
      end = 0;
    }
  }
      
  return indexes
}