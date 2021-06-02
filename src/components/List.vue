<template>
  <div>
    <div>
      <span>-</span>
      <input type="checkbox" @change="check" :checked="isSmthChecked" />
      <span>List {{ list.id }}</span>
    </div>
    <div>
      <ul>
        <item
          v-for="(item, index) in list.items"
          :key="index"
          :item="item"
          :list-checked="list.checked"
        />
      </ul>
    </div>
  </div>
</template>
<script>
import Item from "@/components/Item";
import { actionTypes } from "@/store/modules/list";

export default {
  name: "List",
  components: { Item },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSmthChecked: function() {
      let isChecked = false;
      this.list.items.map((item) => {
        if (item.checked) isChecked = true;
      });

      return isChecked;
    },
  },
  methods: {
    check: function() {
      //todo: написать вопрос
      if (!this.isSmthChecked) {
        this.list.checked = !this.list.checked;
        this.$store.dispatch(actionTypes.setList, { list: this.list });
      }
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
