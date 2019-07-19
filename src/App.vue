<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Home from './pages/Home/index.vue';
import Person from './pages/Person/index.vue';
export default {
  components: {
    Home,
    Person
  },
  beforeCreate () {
    console.log('App.vue beforeCreate');
  },

  created () {
    console.log('App.vue created');
  },

  beforeMount () {
    console.log('App.vue beforeMount');
  },

  mounted () {
    console.log('App.vue mounted');
  }
};
</script>
