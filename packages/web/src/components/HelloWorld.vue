<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="handleClick">click</button>
    <button @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script>
import getData from '../services'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      getData()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
