<template>
  <div>
    <div>
      <arrow :list-id="list.id" />
      <input
        :id="`list-${list.id}`"
        type="checkbox"
        @input="check"
        v-model="listChecked"
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
  data() {
    return {
      listChecked: false,
    };
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

        console.log("is checked");
        console.log(list.checked);

        return isChecked;
      },
    }),
  },
  updated() {
    this.listChecked = this.isChecked;
  },
  methods: {
    check: function() {
      let list = this.list;
      console.log("check");
      console.log(this.isAllchecked);
      console.log(this.isChecked);
      console.log(this.isAllchecked && this.isChecked);

      if (this.isSmthChecked && !list.checked && !this.isAllchecked) {
        list.checked = true;
        list.items = list.items.map((item) => {
          item.checked = true;
          return item;
        });
      } else if (this.isAllchecked && this.isChecked) {
        console.log("all");
        list.checked = false;
        list.items = list.items.map((item) => {
          item.checked = false;
          return item;
        });
      } else {
        list.checked = true;
        list.items = list.items.map((item) => {
          item.checked = true;
          return item;
        });
      }

      this.$store.dispatch(actionTypes.setList, { list: list });
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
