const https = require('https')
const url = "https://raw.githubusercontent.com/KjellConnelly/QuickHOTSPublic/master/codes.json"

function getCodesAsObject() {
  return new Promise((resolve, reject)=>{
    https.get(url, res=>{
      let data = ""
      res.on('data', chunk=>{
        data += chunk
      })
      res.on('end', ()=>{
        const codes = JSON.parse(data)
        resolve(codes)
      })
    })
  })
}

function addCodeToCodes(inputCodes, email) {
  let codes = JSON.parse(JSON.stringify(inputCodes))
  codes.push({
    one:email,
    two:Math.random().toString(36).slice(-8)
  })
  return codes
}

async function start(email) {
  try {
    const codes = await getCodesAsObject()
    const modifiedCodes = addCodeToCodes(codes, email)
    console.log(JSON.stringify(modifiedCodes))
  } catch(err) {
    console.log("start() error: " + err)
  }
}

start("dog@dog.com")
