<template>
  <div class="list-wrapper">
    <p>List {{ list.id }}</p>
    <div v-if="isActive">
      <button @click="changeShuffle">
        {{ shuffle ? "сортировать" : "перемешать" }}
      </button>
      <ul>
        <dashboard-colored-item-value
          v-for="(item, index) in itemsIds"
          :key="index"
          :list="list"
          :item="item"
          :offset="index"
          :is-shuffled="shuffle"
          :is-last="itemsIds[index] == itemsIds[index - 1] || index == 0"
        />
        <div style="clear: both"></div>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DashboardColoredItemValue from "@/components/DashboardColoredItemValue";

export default {
  name: "DashboardList",
  components: { DashboardColoredItemValue },
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
      itemsIds: function(state) {
        let itemsIds = [];

        if (this.shuffle)
          itemsIds = state.list.data[this.list.id].shuffledItems;
        else itemsIds = state.list.data[this.list.id].sortedItems;

        return itemsIds;
      },
    }),

    shuffled: function() {
      let allItems = [];
      this.list.shuffledItems.forEach((itemId) => {
        allItems.push(this.list.items[itemId]);
      });

      return allItems;
    },
  },
  methods: {
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

.list-color-move {
  transition: all 1s;
}

.list-color-enter {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-color-enter,
.list-color-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-color-leave-active {
  position: absolute;
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
