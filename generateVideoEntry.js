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
  let videoEntries = JSON.parse(JSON.stringify(inputVideoEntries))
  let newVideoEntryCopy = JSON.parse(JSON.stringify(newVideoEntry))
  newVideoEntryCopy.date = new Date()

  // check if already uploaded
  let alreadyUploaded = false
  videoEntries.forEach(entry=>{
    if (entry.title == newVideoEntryCopy.title) {
      alreadyUploaded = true
    }
  })

  // check if not complete
  let notComplete = false
  for (const key in newVideoEntry) {
    if (!newVideoEntry[key]) {
      notComplete = true
    }
  }

  if (alreadyUploaded || notComplete) {
    console.log(alreadyUploaded ?
      "Error! There is already a video entry with this title. Please fix! Exiting." :
      "Error! Your entry is not complete. Please open generateVideoEntry.js and add all variables at top of file."
    )
    process.exit()
  }

  videoEntries.push(newVideoEntryCopy)
  return videoEntries
}

function saveUpdateToFileSystem(modifiedVideoEntries) {
  fs.writeFile("./videoEntriesData.json", JSON.stringify(modifiedVideoEntries, null, 2), err=>{
    if (err) {
      return console.log(err)
    }
    console.log("Video Entry successfully added!")
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
