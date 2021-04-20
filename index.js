const express = require('express')
const xml2js = require('xml2js')
const axios = require('axios')

let channel = 9

const app = express()

app.get('/', (req, res) => {
    axios.get("https://mc.retn.org/xml/program_schedule_feed?channel_id=" + channel).then((rawResponse, err) => {
        // console.log(res)
        xml2js.parseString(rawResponse.data, function (err, result) {
            console.log(result)
            res.send(result)
        });
    })
})

app.listen(3000)