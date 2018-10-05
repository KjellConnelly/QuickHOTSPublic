//////////////////////////////////////
// Variables to change based on user:
const email = "dog@dog.com"
const daysUntilExpire = 2
//////////////////////////////////////

const https = require('https')
const fs = require('fs')
const url = "https://raw.githubusercontent.com/KjellConnelly/QuickHOTSPublic/master/codes.json"
let dateToEmailUser = ""

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

function addCodeToCodes(inputCodes) {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
  let newDate  = new Date()
  newDate.setDate(newDate.getDate() + daysUntilExpire)
  dateToEmailUser = newDate.toLocaleDateString("en-US", options)

  let codes = JSON.parse(JSON.stringify(inputCodes))
  const two = Math.random().toString(36).slice(-8)
  const three =
  codes.push({
    one:email,
    two:two,
    three:newDate.getTime(),
  })
  return codes
}

function saveUpdateToFileSystem(codes) {
  fs.writeFile("./codes.json", JSON.stringify(codes), err=>{
    if (err) {
      return console.log(err)
    }
    const email = codes[codes.length - 1].one
    const passcode = codes[codes.length - 1].two
    const goodUntil = codes[codes.length - 1].three

    console.log("Successfully saved to codes.json!")
    console.log("Next Steps:")
    console.log("    1) git commit/push")
    console.log("    2) Send a message to the user with the following:")
    console.log("")
    console.log("A Simple DBT Skills Diary Card App free upgrade has been generated for you! To unlock the full version of this app, grab your device (phone, tablet, etc) and complete the following steps:")
    console.log("-------------------------------------------------------------------")
    console.log("a) Open the Diary Card app and tap the Menu button at the top left.")
    console.log("b) When the drawer opens up, tap the 'Share this app' button.")
    console.log("c) At the top right of the new screen, tap the ~ button.")
    console.log("d) When the new form appears, type in the following information:")
    console.log("   Email Address: " + email)
    console.log("   Passcode:      " + passcode)
    console.log("This passcode will be good for the next " + daysUntilExpire + " day" + (daysUntilExpire != 1 ? "s" : "") + ": until " + dateToEmailUser + " PST.")
    console.log("(Note that if this is not your timezone, you may have more or less than the given time).")
    console.log("Do not share your email address/passcode with anyone as they are only good for a one time use during that period.")
    console.log("")
    console.log("If you have any other issues, feel free to email us back at kjellapps@gmail.com")
  })
}

async function start() {
  try {
    const codes = await getCodesAsObject()
    const modifiedCodes = addCodeToCodes(codes)
    saveUpdateToFileSystem(modifiedCodes)
  } catch(err) {
    console.log("start() error: " + err)
  }
}

start()
