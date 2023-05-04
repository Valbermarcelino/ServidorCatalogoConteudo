const request = require('request');

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_1_lfHh365JdiBo7yjNc3x2SEbnY5iH6POOJ1MeU7FOUWaFP7g7SGrb8b7czeIcK35jjP_OqCUab8/pub?output=csv';

request.get(csvUrl, (error, response, body) => {
  if (error) {
    console.error(`Erro na requisição: ${error}`);
    return;
  }

  console.log(body); // dados da tabela em formato CSV
});
