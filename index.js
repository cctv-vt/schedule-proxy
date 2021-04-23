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
        let xml = rawResponse.data
        console.log(xml)
        xml2js.parseString(xml,{
            tagNameProcessors: [tagSanitizer],
            attrValueProcessors: []
        }, (err, result) => {
            if (err) console.error(err)
            console.log(result)
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result)
        });
    })
})

let tagSanitizer = (name) => {
    console.log(name.replace("psg:","psg_")) 
    return name.replace("psg:","psg_")
}

console.log("http://localhost:"+process.env.PORT)
app.listen(process.env.PORT || 80)