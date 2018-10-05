const https = require('https')
const url = "https://raw.githubusercontent.com/KjellConnelly/QuickHOTSPublic/master/codes.json"

function getCodesAsObject() {
  https.get(url, res=>{
    console.log(res)
  })
}

getCodesAsObject()
