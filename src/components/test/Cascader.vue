<template>
  <div class="cascader" v-isBodyShow ref="cascader">
    <div class="title" @click="clickTitile">{{ result }}</div>
    <div class="body" ref="body" style="display: none">
      <CascaderItem
        :value="value"
        @change="change"
        :options="options"
        :num="0"
      ></CascaderItem>
    </div>
  </div>
</template>
<script>
import CascaderItem from './CascaderItem'
export default {
  components: {
    CascaderItem
  },
  data() {
    return {
      isBody: false,
      value: []
    }
  },
  created() {},
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  directives: {
    isBodyShow: {
      inserted(el, binding, vnode) {
        document.addEventListener('click', (e) => {
          if (e.target == el || el.contains(e.target)) {
            return
          }
          vnode.context.$refs.body.style = 'display: none'
        })
      }
    }
  },
  methods: {
    clickTitile() {
      this.isBody = !this.isBody
      this.$refs.body.style = this.isBody ? 'display: block' : 'display: none'
    },
    change(newValue) {
      let arr = []
      newValue.forEach((item) => {
        arr.push(item.label)
      })
      this.$emit('change', arr)
      this.value = newValue
    }
  },
  computed: {
    result() {
      return this.value.map((item) => item.label).join('/')
    }
  }
}
</script>

<style lang="css" scoped>
.cascader .title {
  width: 200px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.cascader .body {
  margin-top: 10px;
  margin: 5px 0;
  font-size: 14px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}
</style>
