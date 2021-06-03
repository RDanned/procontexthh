<template>
  <div>
    <div>
      <arrow :list-id="list.id" />
      <input type="checkbox" @change="check" :checked="isSmthChecked" />
      <span>List {{ list.id }}</span>
    </div>
    <div v-if="isActive" class="items-container">
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
import Arrow from "@/components/Arrow";
import { actionTypes } from "@/store/modules/list";
import { mapState } from "vuex";

export default {
  name: "List",
  components: { Item, Arrow },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isActive: function(state) {
        return state.list.active === this.list.id;
      },
    }),
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
