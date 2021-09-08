const bpm = 120
const rhythm = [4, 4]
const fps = 60

// ====
let subSection = 1
let time = 0
let beatCount = 0
let old_b = 0
const updateInterval = 1000 / fps
const startTime = new Date().getTime()

function interval() {
  let nowStamp = new Date().getTime()
  time = nowStamp - startTime
  let bps = 60 / bpm
  let _b = (time / 1000) % bps
  setTimeout(() => {
    if (_b < old_b) {
      if (beatCount % (rhythm[0] * rhythm[1]) == 0) {
        console.log('Major section ' + (beatCount / (rhythm[0] * rhythm[1]) + 1))
      }
      if (Number.isInteger(beatCount / rhythm[1])) {
        console.log('Sub section ' + (beatCount / rhythm[1] + 1))
      }
      if (beatCount % rhythm[1] == 0) {
        console.log('bee')
      } else {
        console.log('boo')
      }
      beatCount++
    }
    old_b = _b
    interval()
  }, updateInterval)
}

interval()
