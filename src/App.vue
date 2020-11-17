<template>
  <v-app id="app">
   <v-main>
      <router-view />
   </v-main>
   
   <v-footer color="indigo" app>
      <span class="white--text">&copy; CopyRight DAEDAN CO, LTD. Since 2020</span>
   </v-footer>
</v-app>   
</template>
<script>

import router from "@/router/index";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    tab:[],
  }),
  created() {
    router.push({ name: "login" });
  },
  methods: {

  }
};
</script>
<style lang="scss">
//Okay I'm just importing a font here from GoogleFonts that I like A LOT 
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
$font: 'Poppins', sans-serif;

//This is our #app div, it contains the whole universe of our website
#app{
  text-align: left;
}

//This is our #nav div, it contains our menu
#nav {
  padding: 1px;

  //We're using SASS, so we're nesting the links inside the #nav div here
  a {
    color: inherit;
    margin: 0.1em;
    font-family: $font;
    text-decoration: none;
  }
}
</style>
