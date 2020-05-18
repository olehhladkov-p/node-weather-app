const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Oleh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Oleh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Oleh',
    helpText: 'This is some helpful text.',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Oleh',
    errorMessage: 'Help article not found',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address term',
    });
  }

  geocode(req.query.address, (error, data = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data, (error, { message, location }) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecast: message,
        address: req.query.address,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Oleh',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
