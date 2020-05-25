export const SparkleInstance = Vue.component('sparkle-instance', {
  template: `
    <div v-bind:style="wrapperStyle">
      <svg v-bind:width="size"
           v-bind:height="size"
           v-bind:style="sparkleStyle"
           viewBox="0 0 160 160"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              v-bind:fill="color"/>
      </svg>
    </div>
  `,
  data() {
    return {
      duration: '6000ms'
    }
  },
  methods: {

  },
  props: {
    color: {
      type: String,
      default: '#FFC700'
    },
    size: {
      type: Number,
      default: 160
    },
    passedStyle: {
      type: Object,
      required: true
    }
  },
  computed: {
    wrapperStyle() {
      return {
        ...this.passedStyle,
        position: 'absolute',
        pointerEvents: 'none',
        animation: 'growAndShrink 600ms ease-in-out forwards'
      }
    },
    sparkleStyle() {
      return {
        animation: 'spin 600ms linear forwards'
      }
    }
  }
});