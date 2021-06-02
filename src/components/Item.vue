<template>
  <li>
    <div class="item-left">
      <input @change="check" type="checkbox" :checked="listChecked" />
      <span>Item {{ itemData.id }}</span>
    </div>
    <div class="item-right">
      <span @click="initCountChange" v-if="!isCountChange">
        {{ itemData.count }}
      </span>

      <input @blur="saveCount" v-else type="text" v-model="itemData.count" />

      <input type="color" v-model="itemData.color" @change="saveColor" />
    </div>
  </li>
</template>
<script>
import { actionTypes } from "@/store/modules/list";

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
      let item = this.itemData;
      this.$store.dispatch(actionTypes.setItem, { list, item });
      this.isCountChange = false;
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
  width: 20px;
}
</style>
