import mixins from 'vuetify/lib/util/mixins'
import BaseMixin from '../BaseMixin'
import { Column } from '@antv/g2plot'

export default mixins(BaseMixin).extend({
  name: 'v-g2plot-column',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    xField: String,
    yField: String,
    // line width
    size: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    drawChart() {
      this.chart = new Column(this.$refs.canvas, {
        width: this.width,
        height: this.height,
        data: this.data,
        padding: this.padding,
        forceFit: true,
        label: {
          visible: true,
          position: 'middle' // option: middle / top / bottom
        },
        xField: this.xField,
        yField: this.yField
      })
      this.chart.render()
    }
  },

  mounted() {
    this.drawChart()
  }
})
