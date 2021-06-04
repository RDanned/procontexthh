<template>
  <div id="app">
    <div class="left">
      <list
        v-for="(list, index) in lists"
        :key="index"
        :list="list"
        :id="index"
      />
    </div>
    <dashboard />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/list";
import { shuffleArray } from "@/helpers/list";
import List from "@/components/List";
import Dashboard from "@/components/Dashboard";

export default {
  name: "App",
  components: { List, Dashboard },
  data() {
    return {
      listCount: 5,
      data: [],
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.list.data,
    }),
  },
  mounted() {
    let lists = [];

    for (let i = 0; i != 5; i++) {
      let list = { id: i, items: [], checked: false, shuffledItems: [] };

      let itemsCount = this.getRandomInt(5, 10);
      for (let j = 0; j != itemsCount; j++) {
        let item = {
          id: j,
          count: this.getRandomInt(5, 10),
          color: `#${this.randomColor()}`,
          checked: false,
        };

        for (let k = 0; k != item.count; k++) list.shuffledItems.push(item.id);

        list.items.push(item);
      }

      shuffleArray(list.shuffledItems);
      lists.push(list);
    }

    this.$store.dispatch(actionTypes.setLists, { lists });
  },
  methods: {
    getRandomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    randomColor: function() {
      //return ((Math.random() * 0xffffff) << 0).toString(16);
      return Math.floor(Math.random() * 2 ** 24)
        .toString(16)
        .padStart(6, 0);
      //return Math.floor(Math.random() * 16777215).toString(16);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.left {
  border: 1px solid black;
  width: 400px;
}
</style>
