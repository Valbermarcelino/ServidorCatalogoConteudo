const https = require('https');
const csv = require('csv-parser');

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_1_lfHh365JdiBo7yjNc3x2SEbnY5iH6POOJ1MeU7FOUWaFP7g7SGrb8b7czeIcK35jjP_OqCUab8/pub?output=csv';

https.get(csvUrl, (res) => {
  res.pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}).on('error', (err) => {
  console.log('Error:', err);
});