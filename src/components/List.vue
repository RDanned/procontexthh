<template>
  <div>
    <div>
      <arrow :list-id="list.id" />
      <input
        :id="`list-${list.id}`"
        type="checkbox"
        @click.prevent="check"
        ref="checkbox"
        :checked="isChecked"
      />
      <label :for="`list-${list.id}`">List {{ list.id }} {{ isChecked }}</label>
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
      isSmthChecked: function(state) {
        let isChecked = false;
        state.list.data[this.list.id].items.map((item) => {
          if (item.checked) isChecked = true;
        });

        return isChecked;
      },
      isAllchecked: function(state) {
        let isChecked = true;
        state.list.data[this.list.id].items.map((item) => {
          if (!item.checked) isChecked = false;
        });

        return isChecked;
      },
      isChecked: function(state) {
        let list = state.list.data[this.list.id];

        let isChecked = false;

        list.items.map((item) => {
          if (item.checked) isChecked = true;
        });

        if (!isChecked && list.checked) isChecked = true;

        return isChecked;
      },
    }),
  },
  methods: {
    check: function() {
      let list = this.list;
      console.log("check");
      console.log(this.isAllchecked && this.list.checked);

      if (this.isSmthChecked && !list.checked && !this.isAllchecked) {
        list.checked = true;
        list.items.map((item) => {
          item.checked = true;
          return item;
        });
      } else if (this.isAllchecked && list.checked) {
        list.checked = false;
        list.items.map((item) => {
          item.checked = false;
          return item;
        });
      } else {
        console.log("last");
        list.checked = true;
        list.items.map((item) => {
          item.checked = true;
          return item;
        });
      }

      console.log("list");
      console.log(list);

      /* if (this.isSmthChecked) {
        this.list.checked = true;
        this.list.items.map((item) => {
          item.checked = true;
          return item;
        });
      } else if (!this.isSmthChecked) {
        this.list.checked = !this.list.checked;
      } else if (this.isAllchecked) {
        this.list.checked = true;
      } else {
        this.list.checked = true;
      }
      */
      this.$store.dispatch(actionTypes.setList, { list: this.list });
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
