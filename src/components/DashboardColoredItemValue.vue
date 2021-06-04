<template>
  <div
    @click="deleteItem"
    class="item-color"
    :style="`background-color: ${item.color}`"
  ></div>
</template>
<script>
import { actionTypes } from "@/store/modules/list";

export default {
  name: "DashboardColoredItemValue",
  props: {
    item: {
      type: Object,
      required: true,
    },
    list: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
    },
  },
  methods: {
    deleteItem: function() {
      let list = this.list;
      let shuffledIndex = this.list.shuffledItems.indexOf(
        this.item.id,
        this.offset
      );

      this.list.shuffledItems.splice(shuffledIndex, 1);

      this.list.shuffledItems;
      this.item.count = this.item.count - 1;
      this.$store.dispatch(actionTypes.setItem, { list, item: this.item });
    },
  },
};
</script>
<style scoped>
.item-color {
  width: 10px;
  height: 10px;
  margin: 1px;
}
</style>
