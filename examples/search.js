import OmdbapiWrapper from '../src/main';

global.fetch = require('node-fetch');

const omdb = new OmdbapiWrapper({
  key: 'your-key-here',
});

const movie = omdb.searchByTitle('Avengers');

movie.then((data) => { console.log(data); });
