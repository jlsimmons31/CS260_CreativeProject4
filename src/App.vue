<template>
<div id="app">
  <div id="menu">
    <div id="username">
      <h2>Welcome {{this.$root.$data.username}}</h2>
    </div>
    <div id="brand">
      <router-link to="/">
        <img src="/images/logo.png" id="logo">
      </router-link>
    </div>
    <div id="side">
      <router-link to="/buyflight">
        <div class="menu-item browse">
          <!-- <img src="/images/globe.png"> -->
          <p>(Purchase flight page)</p>
        </div>
      </router-link>
      <router-link to="/myflights">
        <div class="menu-item">
          <!-- <img src="/images/love.png"> --->
          <p>My Flights</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
</div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      
    },
    computed: {
      numItemsInCart() {
        return this.$root.$data.cart.length;
      }
    },
    methods: {

    }
  }
</script>

<!--<script>
  import ProductList from "../components/ProductList.vue"
  export default {
    name: 'Home',
    components: {
      ProductList
    },
    data() {
      return {
        searchText: '',
      }
    },
    computed: {
      products() {
        return this.$root.$data.products.filter(product => product.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
      }
    },
  }
</script>-->

<style>
#logo {
  width: 450px;
  object-fit: scale-down
}

* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;

}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "username brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #B84901;
}
#username {
  grid-area: username;
  display: flex;
  justify-content: flex-start;
}
#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}
</style>
