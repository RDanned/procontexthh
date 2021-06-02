<template>
  <div class="list-wrapper">
    <p>List {{ list.id }}</p>
    <ul>
      <dashboard-item v-for="item in list.items" :item="item" :key="item.id" />
    </ul>
  </div>
</template>
<script>
import DashboardItem from "@/components/DashboardItem";
//import { actionTypes } from "@/store/modules/list";

export default {
  name: "DashboardList",
  components: { DashboardItem },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
