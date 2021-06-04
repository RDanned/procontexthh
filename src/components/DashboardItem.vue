<template>
  <li class="dahboard-item">
    <dashboard-colored-item-value
      v-for="index in Number(item.count)"
      :key="index"
      :list="$parent.list"
      :item="item"
      :offset="index"
    />
  </li>
</template>
<script>
import DashboardColoredItemValue from "@/components/DashboardColoredItemValue";

export default {
  name: "DashboardItem",
  components: { DashboardColoredItemValue },
  props: {
    item: {
      type: Object,
      required: true,
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
