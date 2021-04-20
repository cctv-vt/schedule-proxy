const express = require('express')
const xml2js = require('xml2js')
const axios = require('axios')
var favicon = require('serve-favicon')
var path = require('path')

let channel = 9

const app = express()

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.get('/', (req, res) => {
    axios.get("https://mc.retn.org/xml/program_schedule_feed?channel_id=" + channel).then((rawResponse, err) => {
        console.log(rawResponse)
        xml2js.parseString(rawResponse.data, function (err, result) {
            console.log(result)
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result)
        });
    })
})

console.log("http://localhost:"+process.env.PORT)
app.listen(process.env.PORT || 80)