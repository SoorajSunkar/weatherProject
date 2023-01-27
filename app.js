const { urlencoded, json } = require('express');
const express = require('express');
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require('path');
const requests = require("requests")
const fs = require('fs');
let port = process.env.PORT || 8000;

app.use(express.urlencoded());
app.set('view engine', 'hbs');
app.set('views', './template/views')
app.use(express.static('./template'));
hbs.registerPartials('./template/partials');

let countryShortName = [];
let countryName = [];

let data = fs.readFileSync('allCountry.json', 'utf-8');
data = JSON.parse(data);
// console.log(data);
for (let keys in data) {
    // console.log(keys)
    countryShortName.push(keys);
    countryName.push(data[keys].name);
}

// console.log(countryShortName);
// console.log(countryName);





// ******** routing ******** //
app.get('/', (req, res) => {

    let html='';
    
        
            res.render('indexs', { check: 'Check'});

        })
// main function 

function main(realName) {
    return new Promise((res, rej) => {
        requests(`http://api.weatherapi.com/v1/current.json?key=fda8f13f697d4735b5044845222412&q=${realName}&aqi=no`,)
            .on('data', function (chunk) {
                chunk = JSON.parse(chunk);
                console.log(chunk)
                let currentCountry = chunk.location.country;
                console.log(currentCountry);
                for (let a = 0; a < countryName.length; a++) {
                    if (currentCountry.includes(countryName[a])) {
                        console.log("yes its contain");
                        console.log(countryName[a]);
                        console.log('function has been returned');
                        res({ city: realName, country: countryShortName[a], text: chunk.current.temp_c, condi: chunk.current.condition.text, src: chunk.current.condition.icon, time: chunk.location.localtime, speed: chunk.current.wind_kph, direction: chunk.current.wind_dir });
                    }
                }



            })
            .on('end', function (err) {
                if (err) rej(console.log('connection closed due to errors', err));


            });
    })

}

// main ends
let city;
city = "yangon"
app.post('/check', (req, res) => {
    // console.log(req.body.search);
    city = req.body.search;

    res.redirect('/check');
})

let time = false;
app.get('/check', (req, res, next) => {
    if (time) {
        next('route');
    }
    let data = main(city);
    data.then((data) => {
        // console.log(val);\
        // time  = true;
        // console.log('the current time is: ', data.time);
        let time = data.time;
        time = time.split(' ');
        let date = time[0].split('-');
        let currentTime = time[1].split(':');
        let hour = currentTime[0];
        let peroid;
        if (hour >= 12) {
            if (hour == 12) {
                hour = 12;
                peroid = "Pm";
            }
            else {
                hour = hour - 12;
                peroid = "Pm";
            }
        }
        else {
            hour = hour;
            peroid = "Am"
        }
        console.log(peroid);

        res.render('check', { check: 'Check', city: data.city, country: data.country, text: data.text, condi: data.condi, src: data.src, date: date[2], month: date[1], year: date[0], hour: hour, mins: currentTime[1], peroid: peroid, speed: data.speed, direction: data.direction });
    }).catch((err) => {
        console.log('an error ouccur', err);
    })
    console.log("hi");




})
let cityName;


app.get('/check', (req, res) => {
    // res.send("hi I am new check");
    let data = main(cityName);
    data.then((data) => {
        // console.log(val);\
        time = true;
        res.render('check', { check: 'Check', city: data.city, country: data.country });
    }).catch((err) => {
        console.log('an error ouccur');
    })
})

app.get('/about', (req, res) => {
    // res.send('its my about page');
    res.render('about', { check: 'check' })
    console.log('its my about page');
})
app.get('/form', (req, res) => {
    console.log('its my form page')
    res.render('form', { check: 'check' })
})
let dataArr = [];

let getData = fs.readFileSync('./template/data/data.txt');


if (getData == "") {
    dataArr = [];
}

else {
    getData = JSON.parse(getData);
    getData.forEach((ele) => {
        dataArr.push(ele);
    })
}





app.post('/form', (req, res) => {
    // console.log(req.body.title)
    // console.log(req.body.question)
    let title = req.body.title;
    let question = req.body.question;
    let details = req.body.details;
    let short = req.body.short;

    if (req.body.password == "Yelintun") {
        let data = {
            title: title,
            question: question,
            short: short,
            data: details
        }
        dataArr.push(data);
        fs.writeFileSync('./template/data/data.txt', JSON.stringify(dataArr));
        console.log(data)
        res.redirect('/')
    }

    else {
        console.log('cant submit the form')
        res.redirect('/')

    }
})


app.get('*', (req, res) => {
    res.send('page not found');
    console.log('page not found');
})

app.listen(port, () => {
    console.log("our server is running on the sky port 3000");
})
