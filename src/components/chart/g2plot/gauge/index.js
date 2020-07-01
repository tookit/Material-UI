import mixins from 'vuetify/lib/util/mixins'
import BaseMixin from '../BaseMixin'
import { Gauge } from '@antv/g2plot'

export default mixins(BaseMixin).extend({
  name: 'v-g2plot-gauge',
  props: {
    title: Object,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    color: {
      type: Array,
      default: () => {
        return ['#39B8FF', '#52619B', '#43E089', '#C0EDF3']
      }
    },
    range: {
      type: Array,
      default: () => {
        return [0, 25, 50, 75, 100]
      }
    },
    value: {
      type: Number,
      default: 60
    },
    statistic: Object
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    drawChart() {
      console.log(this.title)
      this.chart = new Gauge(this.$refs.canvas, {
        width: this.width,
        height: this.height,
        padding: this.padding,
        forceFit: this.forceFit,
        // title: this.title,
        // Gauge props
        value: this.value,
        min: this.min,
        max: this.max,
        color: this.color,
        range: this.range,
        statistic: this.statistic
      })
      this.chart.render()
    }
  },

  mounted() {
    this.drawChart()
  }
})
