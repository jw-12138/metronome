new Vue({
  el: '#app',
  data: function () {
    return {
      majorSections: 4,
      subSections: 4,
      bpm: 128,
      timer: 0,
      fps: 60,
      r_str: '1 : 1 : 1',
      playing: false
    }
  },
  created: function () {},
  mounted: function () {
    this.rhythm = [this.majorSections, this.subSections]

    // ====
    this.subSection = 1
    this.time = 0
    this.beatCount = 0
    this.old_b = 0
    this.updateInterval = 1000 / this.fps
    this.startTime = new Date().getTime()
    
    this.mjs = ''
    this.sbs = ''
    this.bt = ''
    
    let _ = this
    window.onload = function () {
      _.bee = _.$refs.bee
      _.boo = _.$refs.boo
    }
  },
  methods: {
    submit: function () {
      this.stop()
      this.start()
    },
    initMetronome: function () {
      let _ = this
      let bps = 60 / _.bpm
      this.startTime = new Date().getTime()
      _.timer = setInterval(() => {
        _.playing = true
        let nowStamp = new Date().getTime()
        _.time = nowStamp - _.startTime
        let _b = (_.time / 1000) % bps

        if (_b < _.old_b) {
          if (_.beatCount % (_.rhythm[0] * _.rhythm[1]) == 0) {
            // console.log('Major section ' + (_.beatCount / (_.rhythm[0] * _.rhythm[1]) + 1))
            _.mjs = (_.beatCount / (_.rhythm[0] * _.rhythm[1]) + 1)
          }
          if (Number.isInteger(_.beatCount / _.rhythm[1])) {
            // console.log('Sub section ' + (_.beatCount / _.rhythm[1] + 1))
            _.sbs = (_.beatCount / _.rhythm[1] + 1)
            _.sbs = (_.sbs % _.rhythm[0])
            if(_.sbs == 0){
              _.sbs = _.rhythm[0]
            }
          }
          if (_.beatCount % _.rhythm[1] == 0) {
            _.bee.currentTime = 0
            _.bee.play()
          } else {
            _.boo.currentTime = 0
            _.boo.play()
          }

          _.r_str = `${_.mjs} : ${_.sbs} : ${_.beatCount % _.rhythm[1] + 1}`
          _.beatCount++
        }
        _.old_b = _b
      }, _.updateInterval)
    },
    start: function () {
      this.rhythm = [this.majorSections, this.subSections]
      this.initMetronome()
    },
    stop: function () {
      let _ = this
      this.subSection = 1
      this.time = 0
      this.beatCount = 0
      this.old_b = 0
      this.r_str = '1 : 1 : 1'
      clearInterval(_.timer)
      this.playing = false
    }
  },
  watch: {}
})
