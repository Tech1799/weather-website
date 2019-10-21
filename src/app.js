const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const ViewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('views', ViewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

//index.hbs
app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather app',
        name: 'Bhupinder Bhattarai'
    });
})

// help.hbs
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'help',
        name: 'Bhupinder Bhattarai'
    })
})

// about.hbs
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me:',
        name: 'Bhupinder Bhattarai'
    });
})

app.get('/weather', (req, res)=>{
   if(!req.query.address){
       return res.send({
           error: 'please provide address!'
       })
   }
   geocode(req.query.address, (error,{latitude, longitude, location})=>{
       if(error){
           return res.send({error})
       } 
       forecast(latitude, longitude, (error, forecastData)=>{
           if(error){
               return res.send({error})
           }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
       })
   })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'search must provided'
        })
    }
    res.send({
        products: req.query.search
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Error',
        name: 'Bhupinder Bhattarai',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Error',
        name: 'Bhupinder Bhattarai',
        errorMessage: 'Page Not Found'
    });
})

app.listen(port, ()=>{
    console.log('server is set on port ' + port);
});