//////////////////////////////////////
// Variables to change:
const newVideoEntry = {
  title:"Dogs are cool",
  youtubeCode:"696969",
  description:`Dogs are cool, but what do YOU know?`,
  md:`Boom boom man bam
  Yes bam mam
  woohoo!!`
}

//////////////////////////////////////

const https = require('https')
const fs = require('fs')
const videoEntryDataURL = "https://raw.githubusercontent.com/KjellConnelly/QuickHOTSPublic/master/videoEntriesData.json"

function getVideoEntriesData() {
  return new Promise((resolve, reject)=>{
    https.get(videoEntryDataURL, res=>{
      let data = ""
      res.on('data', chunk=>{
        data += chunk
      })
      res.on('end', ()=>{
        const videoEntriesData = JSON.parse(data)
        resolve(videoEntriesData)
      })
    })
  })
}

function addVideoEntryToVideoEntries(inputVideoEntries) {
  const today  = new Date()
  let videoEntries = JSON.parse(JSON.stringify(inputVideoEntries))
  videoEntries.push(newVideoEntry)
  return videoEntries
}

function saveUpdateToFileSystem(modifiedVideoEntries) {
  fs.writeFile("./videoEntriesData.json", JSON.stringify(modifiedVideoEntries), err=>{
    if (err) {
      return console.log(err)
    }
  })
}

async function start() {
  try {
    const videoEntriesData = await getVideoEntriesData()
    const modifiedVideoEntries = addVideoEntryToVideoEntries(videoEntriesData)
    saveUpdateToFileSystem(modifiedVideoEntries)
  } catch(err) {
    console.log("start() error: " + err)
  }
}

start()
