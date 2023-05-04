const express = require('express');
const axios = require('axios');

const app = express();

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_1_lfHh365JdiBo7yjNc3x2SEbnY5iH6POOJ1MeU7FOUWaFP7g7SGrb8b7czeIcK35jjP_OqCUab8/pub?output=csv';

app.get('/dados', (req, res) => {
  axios.get(csvUrl)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(`Erro na requisição: ${error}`);
      res.status(500).send('Erro ao buscar dados da planilha');
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
