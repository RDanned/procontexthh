<template>
  <transition appear name="list-color">
    <div
      v-if="itemComputed.checked"
      :key="1"
      @click="deleteItem"
      :class="['item-color', 'sort', { break: !isLast && !isShuffled }]"
      :style="`background-color: ${itemComputed.color};`"
    ></div>
  </transition>
</template>
<script>
import { actionTypes } from "@/store/modules/list";
import { mapState } from "vuex";

export default {
  name: "DashboardColoredItemValue",
  props: {
    item: {
      type: Number,
      required: true,
    },
    list: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
    },
    isShuffled: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      itemComputed: function(state) {
        return state.list.data[this.list.id].items[this.item];
      },
    }),
  },
  mounted() {
    if (this.item.isFirst) {
      console.log("first");
    }
  },
  methods: {
    deleteItem: function() {
      let list = this.list;
      let item = this.itemComputed;

      if (item.count == 0) return;

      let shuffledIndex = this.list.shuffledItems.indexOf(
        this.item,
        this.offset
      );

      let sortedIndex = this.list.sortedItems.indexOf(this.item);

      this.list.shuffledItems.splice(shuffledIndex, 1);
      this.list.sortedItems.splice(sortedIndex, 1);

      item.count = item.count - 1;

      list.items[this.item] = item;

      this.$store.dispatch(actionTypes.setList, { list, item });
    },
  },
};
</script>
<style scoped>
.item-color {
  width: 10px;
  height: 10px;
  margin: 1px;
  transition: all 0.2s;
}

.item-color.sort {
  float: left;
}

.item-color.break {
  clear: left;
}

.item-color-enter {
  width: 0;
  height: 0;
  opacity: 0;
}

.item-color-move {
  transition: transform 1s;
}

.item-color-enter-active {
  transition: all 0.3s ease;
}
.item-color-enter-to {
  width: 10px;
  height: 10px;
  opacity: 1;
  transition: all 0.1s;
}

.item-color-leave-active {
  position: absolute;
}
</style>
