const path = require("path");

const axios = require('axios');
const csvtojson = require('csvtojson');
const cors = require('@fastify/cors');

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false,
});

fastify.register(cors, {
  origin: '*',
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

const csvUrls = {
  conteudos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_1_lfHh365JdiBo7yjNc3x2SEbnY5iH6POOJ1MeU7FOUWaFP7g7SGrb8b7czeIcK35jjP_OqCUab8/pub?output=csv',
  ferramentas: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpiLw9jdBP-mbcy4gTtx0fFUKwzcaeMBe4Q6hpPS7-qIBYh4jkaUnIMWdDy6se16lZlTH1gyVfa94r/pub?gid=1409572458&single=true&output=csv',
  metaversos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8gqYTxh_dYh7BAiE51uJKR2syHG5ONkGLcH0clLEw3eGLZoS850gnHYkzPc7-YwVhctoit4d1P5GF/pub?gid=329132406&single=true&output=csv',
  laboratorios: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSIuheUigzIx-5UcoHQBH8X1XTpkTxlvo7snZInJR7xgOH_QL3hBifM-pV3PkK3pPtw5HG_ISG8_HU/pub?output=csv',
};

async function fetchCsvData(csvUrl) {
  try {
    const response = await axios.get(csvUrl, { mode: 'no-cors' });
    const data = await csvtojson().fromString(response.data);
    return data;
  } catch (error) {
    console.error(`Erro na requisição: ${error}`);
    throw new Error('Erro na requisição');
  }
}

fastify.get('/conteudos', async (request, reply) => {
  try {
    const data = await fetchCsvData(csvUrls.conteudos);
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: 'Erro na requisição' });
  }
});

fastify.get('/ferramentas', async (request, reply) => {
  try {
    const data = await fetchCsvData(csvUrls.ferramentas);
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: 'Erro na requisição' });
  }
});

fastify.get('/metaversos', async (request, reply) => {
  try {
    const data = await fetchCsvData(csvUrls.metaversos);
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: 'Erro na requisição' });
  }
});

fastify.get('/laboratorios', async (request, reply) => {
  try {
    const data = await fetchCsvData(csvUrls.laboratorios);
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: 'Erro na requisição' });
  }
});

fastify.get('/filtro', async (request, reply) => {
  try {
    const { texto } = request.query;
    const result = [];
    
    for (const urlKey in csvUrls) {
      const data = await fetchCsvData(csvUrls[urlKey]);
      const filteredData = data.filter(item => item.nome.toLowerCase().includes(texto.toLowerCase()));
      result.push(...filteredData);
    }
    
    reply.send(result);
  } catch (error) {
    reply.status(500).send({ error: 'Erro na requisição' } + error);
  }
});


// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);


