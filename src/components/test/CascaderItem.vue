<template>
  <div class="cascader-item">
    <div class="left">
      <div v-for="(item, index) in options" :key="index" @click="select(item)">
        <p :class="item.label == label ? 'activity' : ''">{{ item.label }}</p>
      </div>
    </div>

    <div class="right" v-if="selectItem">
      <CascaderItem
        :options="selectItem"
        @change="change"
        :num="this.num + 1"
        :value="value"
      ></CascaderItem>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CascaderItem',
  data() {
    return {
      label: '',
      activityList: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    num: {
      type: Number
    }
  },
  methods: {
    change(item) {
      this.$emit('change', item)
    },
    removeRepetition(arr) {
      var hash = []
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i])
        }
      }
      return hash
    },
    select(item) {
      let cloneValue = JSON.parse(JSON.stringify(this.value))
      cloneValue[this.num] = item
      cloneValue.splice(this.num + 1)
      this.$emit('change', cloneValue)

      // this.activityList.unshift(item.label);
      // let newArr =  this.removeRepetition(this.activityList)
      // this.activityList = newArr
    }
  },
  computed: {
    selectItem() {
      this.value.forEach((element) => {
        this.options.forEach((item) => {
          if (element.label == item.label) {
            // this.label = item.label
          }
        })
      })
      return this.value[this.num] && this.value[this.num].children
    }
  }
}
</script>

<style lang="css" scoped>
.cascader-item {
  display: flex;
}
.cascader-item .left {
  min-width: 180px;
  box-sizing: border-box;
  color: #606266;
  height: 200px;
  border-right: 1px solid #e4e7ed;
  cursor: pointer;
  overflow: hidden;
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(255, 255, 255, 0.5);
  background-color: #ccc;
}
.cascader-item .left p {
  padding: 0 25px;
  height: 40px;
  line-height: 40px;
}
.cascader-item .left div:hover {
  background-color: #ccc;
}
.style {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.activity {
  color: #409eff;
}
</style>
