<template>
  <li>
    <div class="item-left">
      <input
        :id="`item-${itemData.id}`"
        @change="check"
        type="checkbox"
        :checked="listChecked"
      />
      <label :for="`item-${itemData.id}`">Item {{ itemData.id }}</label>
    </div>
    <div class="item-right">
      <span @click="initCountChange" v-if="!isCountChange">
        {{ itemData.count }}
      </span>

      <input
        @change="saveCount"
        @blur="isCountChange = false"
        v-else
        type="number"
        v-model="itemData.count"
      />

      <input type="color" v-model="itemData.color" @change="saveColor" />
    </div>
  </li>
</template>
<script>
import { actionTypes } from "@/store/modules/list";
import { shuffleArray } from "@/helpers/list";

export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true,
    },
    listChecked: {
      type: Boolean,
    },
  },
  data() {
    return {
      initialCount: this.item.count,
      isCountChange: false,
      itemData: this.item,
    };
  },
  methods: {
    initCountChange: function() {
      this.isCountChange = true;
    },
    saveCount: function() {
      let list = this.$parent.list;
      let newItem = this.itemData;

      console.log("save count");
      console.log(newItem.count);
      console.log(this.initialCount);
      if (newItem.count > this.initialCount) {
        let newItemsCount = newItem.count - this.initialCount;

        console.log("newItemsCount");
        console.log(newItemsCount);
        for (let i = 0; i != newItemsCount; i++) {
          list.shuffledItems.push(newItem.id);
        }

        shuffleArray(list.shuffledItems);
      }

      this.$store.dispatch(actionTypes.setItem, { list, item: newItem });
    },
    saveColor: function() {
      let list = this.$parent.list;
      let item = this.itemData;
      this.$store.dispatch(actionTypes.setItem, { list, item });
    },
    check: function() {
      let list = this.$parent.list;
      this.itemData.checked = !this.itemData.checked;
      this.$store.dispatch(actionTypes.setItem, { list, item: this.itemData });
    },
  },
};
</script>
<style>
li {
  display: flex;
  justify-content: space-between;
}

.item-left,
.item-right {
  width: 110px;
}

.item-right {
  display: flex;
  justify-content: space-between;
}

.item-right input {
  width: 35px;
}
</style>
