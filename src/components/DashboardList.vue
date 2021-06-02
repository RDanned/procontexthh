<template>
  <div class="list-wrapper">
    <p>List {{ list.id }}</p>
    <button @click="changeShuffle">перемешать</button>
    <ul v-if="!shuffle">
      <dashboard-item v-for="item in list.items" :item="item" :key="item.id" />
    </ul>
    <ul v-else>
      <li class="dahboard-item">
        <div
          @click="deleteItem"
          v-for="(item, index) in shuffled"
          :key="index"
          class="item-color"
          :style="`background-color: ${item.color}`"
        ></div>
      </li>
    </ul>
  </div>
</template>
<script>
import DashboardItem from "@/components/DashboardItem";
import { actionTypes } from "@/store/modules/list";

export default {
  name: "DashboardList",
  components: { DashboardItem },
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
ul {
  list-style: none;
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
