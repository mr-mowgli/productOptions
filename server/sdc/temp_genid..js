const fs = require('fs');

const genIDList = function(count, maxID, fileName) {
  let output = '';
  for (var i = 1; i < count; i++) {
    let entry = Math.floor(Math.random() * maxID) + 1;
    output += `${entry}\n`;
  }
  let data = JSON.stringify(output);
  fs.writeFile(`${filieName}.csv`, data);
};

genIDList(200, 10000000, testIDs)