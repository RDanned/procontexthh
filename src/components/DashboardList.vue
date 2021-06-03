<template>
  <div class="list-wrapper">
    <p>List {{ list.id }}</p>
    <div v-if="isActive">
      <button @click="changeShuffle">перемешать</button>
      <ul v-if="!shuffle">
        <dashboard-item
          v-for="item in list.items"
          :item="item"
          :key="item.id"
        />
      </ul>
      <ul v-else>
        <li class="dahboard-item">
          <dashboard-colored-item-value
            v-for="(item, index) in shuffled"
            :key="index"
            :list="list"
            :item="item"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DashboardItem from "@/components/DashboardItem";
import DashboardColoredItemValue from "@/components/DashboardColoredItemValue";
//import { actionTypes } from "@/store/modules/list";

export default {
  name: "DashboardList",
  components: { DashboardItem, DashboardColoredItemValue },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      shuffle: true,
    };
  },
  computed: {
    ...mapState({
      isActive: function(state) {
        return state.list.active === this.list.id;
      },
    }),
    shuffled: function() {
      let allItems = [];
      this.list.items.forEach((item) => {
        for (let i = 0; i != item.count; i++) allItems.push(item);
      });

      console.log(allItems);
      this.shuffleArray(allItems);
      return allItems;
    },
  },
  methods: {
    shuffleArray: function(array) {
      array.sort(() => Math.random() - 0.5);
    },
    changeShuffle: function() {
      this.shuffle = !this.shuffle;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}

.list-wrapper {
  border: 1px solid black;
  margin: 20px;
  padding: 10px;
}

.item-color {
  width: 10px;
  height: 10px;
  margin: 1px;
}

.dahboard-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
  flex-wrap: wrap;
}
</style>
