<template>
  <div class="right">
    <dashboard-list
      v-for="(list, index) in lists"
      :key="index"
      :list="list"
      :id="index"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import DashboardList from "@/components/DashboardList";

export default {
  name: "Dashboard",
  components: { DashboardList },
  computed: {
    ...mapState({
      lists: (state) => state.list.data,
    }),
  },
};
</script>
<style scoped>
.right {
  border: 1px solid black;
  width: 400px;
}
</style>
