const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/search', (req, res) => {
 res.render('search');
});

app.get('/results', (req, res) => {
 let query = req.query.search;
 request(`https://api.themoviedb.org/3/search/movie?api_key=9d607cd611eb5b1a58cf405e9f207109&query=${query}`, (err, response, body) => {
  if (err) {
   console.log(err);
  }
  let data = JSON.parse(body);
  res.render('movies', {
   data,
   searchQuery: query
  });
 });
});

app.listen(3000, () => {
 console.log('Connected!!!');
});