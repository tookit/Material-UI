<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        label="Parent Category"
        placeholder="Parent Category"
        hide-details
        outlined
        readonly
        append-icon="mdi-chevron-down"
        :value="inputValue"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-card class="v-cascader d-flex sheet">
      <v-cascader-list
        :items="items"
        v-model="selectedItems"
        @change="handleChange"
      />
    </v-card>
  </v-menu>
</template>
<script>
import flattern from '@/utils/flattern'
import VCascaderList from './VCascaderList.vue'
export default {
  name: 'VCascader',
  props: {
    items: Array,
    value: {
      type: Array,
      default: () => []
    }
  },
  components: { VCascaderList },
  computed: {
    categories() {
      return flattern(this.items, { initNode: (node) => node })
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.selectedItems = val
        }
      }
    }
  },
  data() {
    return {
      selectedItems: this.value,
      inputValue: '',
      selectedNames: []
    }
  },
  methods: {
    handleChange({ id, depth, name }) {
      switch (depth) {
        case 0:
          this.selectedItems = []
          this.selectedNames = []
          break
        case 1:
          this.selectedItems[2] = 0
          this.selectedNames[2] = ''
          break
        default:
          break
      }
      this.selectedItems[depth] = id
      this.selectedNames[depth] = name
      this.$emit('change', this.selectedItems)
      this.inputValue = this.selectedNames.join(' / ')
    }
  },
  mounted() {},
  created() {}
}
</script>
