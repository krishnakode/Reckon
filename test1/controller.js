'use strict';
const nodefetch = require('node-fetch');

const rangeInfoEndPoint = "https://join.reckon.com/test1/rangeInfo";
const divisorInfoEndPoint = "https://join.reckon.com/test1/divisorInfo";

async function rangeInfo() {
  return await fetch(rangeInfoEndPoint);
}

async function divisorInfo() {
  const response = await fetch(divisorInfoEndPoint);
  return response.outputDetails;
}

// Function used to test unreliable API endpoint
let i=0;
async function test(url) {
  if(i<5) {
    i+=1;
    throw Error("Failling for test!");
  } else {
    return await nodefetch(url);
  }
}

async function fetch(url) {
  try {
    const res = await nodefetch(url);
    if (res.ok) { // res.status >= 200 && res.status < 300
      return await res.json();
    } else if (res.status != 500) {
      // Error handling must go in here for auth or other non-server errors
    } else {
      throw Error(res.statusText);
    }
  } catch (err) {
    // Note: Assuming the API unreliability is only a server issue and would recover eventually.
    // TODO: It might be better to add a counter instead of hitting an unreliable API continuously

    console.log("Request: ", url, ", Error:", JSON.stringify(err));
    await new Promise(resolve => setTimeout(resolve, 600)); // adding the timeout to avoid hitting the API continuously and give time to recover
    return await fetch(url);
  }
}

module.exports = {
  rangeInfo,
  divisorInfo
};