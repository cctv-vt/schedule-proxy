const express = require('express')
const xml2js = require('xml2js')
const axios = require('axios')
const favicon = require('serve-favicon')
const path = require('path')

const app = express()

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.get('/:path', (req, res) => {
  console.log(req.url)
  axios.get('https://mc.retn.org/xml' + req.url).then((rawResponse, err) => {
    const xml = rawResponse.data
    // console.log(xml)
    xml2js.parseString(xml, {
      tagNameProcessors: [tagSanitizer],
      attrValueProcessors: []
    }, (err, result) => {
      if (err) console.error(err)
      // console.log(result)
      res.header('Access-Control-Allow-Origin', '*')
      res.send(result)
    })
  })
})

const tagSanitizer = (name) => {
  // console.log(name.replace("psg:","psg_"))
  return name.replace('psg:', 'psg_')
}

console.log('http://localhost:' + process.env.PORT)
app.listen(process.env.PORT || 80)
