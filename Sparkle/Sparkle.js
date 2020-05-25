import { SparkleInstance } from './SparkleInstance.js';

export const Sparkles = Vue.component('sparkles', {
  template: `
    <div v-bind:style="wrapperStyle">
      <sparkle-instance v-for="sparkle in sparkles"
                        v-bind:key="sparkle.id"
                        v-bind:color="sparkle.color"
                        v-bind:size="sparkle.size"
                        v-bind:passed-style="sparkle.style" />
      <div v-bind:style="style">
        <slot />
      </div>
    </div>
  `,
  components: {
    SparkleInstance
  },
  methods: {
    random: (min, max) => Math.floor(Math.random() * (max - min)) + min,
    generateSparkle: function(color = 'hsl(50deg, 100%, 50%)') {
      const size = this.random(10, 20);
      return {
        id: String(this.random(10000, 99999)),
        createdAt: Date.now(),
        color,
        size,
        style: {
          top: `calc(${this.random(0, 100)}% - ${size}px)`,
          left: `calc(${this.random(0, 100)}% - ${size / 2}px)`,
          zIndex: 2,
        }
      }
    },
    addAnimation: function(body) {
      if(!this.dynamicStyles && !document.querySelector('#sparkle-style')){
        this.dynamicStyles = document.createElement('style');
        this.dynamicStyles.setAttribute('rel', 'stylesheet');
        this.dynamicStyles.setAttribute('type', 'text/css');
        this.dynamicStyles.setAttribute('id', 'sparkle-style');
        document.head.appendChild(this.dynamicStyles);
      }
      this.dynamicStyles.sheet.insertRule(body, this.dynamicStyles.length);
    },
    loop: function(){
      const rand = this.random(200, 1000)
      setTimeout(function() {
        const now = Date.now()
        const nextSparkles = this.sparkles.filter(sparkle => {
          const delta = now - sparkle.createdAt
          return delta < 1000
        })
        nextSparkles.push(this.generateSparkle())
        this.sparkles = Array.from(nextSparkles)
        this.loop()
      }.bind(this), rand);
    }
  },
  data () {
    return {
      dynamicStyles: null,
      defaultColor: 'hsl(50deg, 100%, 50%)',
      wrapperStyle: {
        position: 'relative',
        display: 'inline-block',
      },
      style: {
        position: 'relative',
        zIndex: 1,
        fontWeight: 'bold'
      },
      sparkles: [this.generateSparkle()],
      interval:'',
    }
  },
  mounted() {
    if(this.dynamicStyles){
      this.addAnimation(`
        @keyframes growAndShrink {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
      `)
      this.addAnimation(`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
      `)
    }
    this.loop()
  }
})