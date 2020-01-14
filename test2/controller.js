'use strict';
const nodefetch = require('node-fetch');

const textEndPoint = "https://join.reckon.com/test2/textToSearch";
const subTextsEndPoint = "https://join.reckon.com/test2/subTexts";
const submitResultsEndPoint = "https://join.reckon.com/test2/submitResults";


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
  console.log(response);
  return ;
}

async function fetch(url, body = null) {
  try {
    if (body) {
      const res = await nodefetch(url, { method: "POST", body: body });
      console.log(typeof res.status);
      if (res.ok) { // res.status >= 200 && res.status < 300
        return await res.json();
      } else if (res.status != 500) {
        // Error handling must go in here for auth or other non-server errors
      } else {
        throw Error(res.statusText);
      }
    } else {
      const res = await nodefetch(url);
      if (res.ok) { // res.status >= 200 && res.status < 300
        return await res.json();
      } else if (res.status != 500) {
        // Error handling must go in here for auth or other non-server errors
      } else {
        throw Error(res.statusText);
      }
    }
  } catch (err) {
    // Note: Need to add any known or expected API error messages here. Assuming the API unreliability is only a server issue and would recover eventually.
    // TODO: It might be better to add a counter instead of hitting an unreliable API continuously

    console.log("Request: ", url, ", Error:", err);
    await new Promise(resolve => setTimeout(resolve, 600)); // adding the timeout to avoid hitting the API continuously and give time to recover
    return await fetch(url, body);
  }
}

module.exports = {
  getIndex,
  textToSearch,
  subTexts,
  submitResults
};