<template>
  <li class="dahboard-item">
    <div
      @click="deleteItem"
      class="item-color"
      v-for="index in item.count"
      :key="index"
      :style="`background-color: ${item.color}`"
    ></div>
  </li>
</template>
<script>
import { actionTypes } from "@/store/modules/list";

export default {
  name: "DashboardItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteItem: function() {
      let list = this.$parent.list;
      console.log(this.item.count);
      this.item.count = this.item.count - 1;
      console.log(this.item.count);
      this.$store.dispatch(actionTypes.setItem, { list, item: this.item });
    },
  },
};
</script>
<style scoped>
.dahboard-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
  flex-wrap: wrap;
}

.item-color {
  width: 10px;
  height: 10px;
  margin: 1px;
}
</style>
