<template>
<div id="app">
  <header id="menu">
    <div id="side">
      <router-link to="/buyflight">
        <div class="menu-item browse">
          <p>(Purchase flight page)</p>
        </div>
      </router-link>
      <div class="my-account">
        <p class="name-text"><strong>Welcome {{this.$root.$data.username}}!</strong></p>
        <router-link to="/myflights">
          <div class="menu-item">
            <p> My Flights</p>
          </div>
        </router-link>
      </div>
    </div>
     </header>
    <div id="brand">
      <router-link to="/">
        <img src="/images/logo.png" id="logo">
      </router-link>
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
  display: flex;
  justify-content: flex-end;
  padding: 15px;
}

#menu a {
  color: black;
}
#brand {
  display: flex;
  justify-content: center;
  margin-top: -20px;
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
.name-text{
  margin: 0px;
  font-size: 16px;
  padding-right: 10px;
}
header, footer{
width: 100%;
background-color: #87ceeb;
text-align: center;
padding-top: 10px;
padding-bottom: 10px;
}
footer {
margin-top: 40px;
}
</style>
