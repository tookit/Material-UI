<template>
  <div class="v-cascader d-flex">
    <v-cascader-list :items="items" />
  </div>
</template>
<script>
import VCascaderList from './VCascaderList.vue'
export default {
  name: 'VCascader',
  props: {
    items: Array
  },
  components: { VCascaderList },
  computed: {},
  data() {
    return {
      selectedItems: []
    }
  },
  methods: {
    handleSelectItem(item) {}
  },
  created() {}
}
</script>
