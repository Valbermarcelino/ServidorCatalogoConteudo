const express = require('express');
const csv = require('csv-parser');
const https = require('https');

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_1_lfHh365JdiBo7yjNc3x2SEbnY5iH6POOJ1MeU7FOUWaFP7g7SGrb8b7czeIcK35jjP_OqCUab8/pub?output=csv';

const app = express();

app.get('/dados', (req, res) => {
  https.get(csvUrl, (response) => {
    const results = [];

    response.pipe(csv())
      .on('data', (data) => {
        // aqui podemos tratar cada linha do arquivo CSV
        results.push(data);
      })
      .on('end', () => {
        // aqui podemos enviar os dados em formato JSON para o cliente
        res.json(results);
      });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
