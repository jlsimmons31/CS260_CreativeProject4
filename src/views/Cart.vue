<template>
<div class="wrapper">
	<div class="cart_products" v-if="this.$root.$data.cart.length > 0">
		<h2>Shopping Cart</h2>
		<div v-for="product in this.$root.$data.cart" :key="product.id">
			<div class="cart_product">
				<img id="cart_product_image" :src="'/images/products/'+product.image">
				<div id="cart_product_detail">
					<h1>{{product.name}}</h1>
					<p>{{product.country}}</p>
				</div>
				<div id="cart_product_price">
					<h2 class="price">{{product.price}}</h2>
					<button class="auto" @click="removeFromCart(product)">Remove from Cart</button>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<h2>Shopping Cart</h2>
		<h3>Your cart is empty :(<br/><br/>Add some items from the Browse screen to get started.</h3>
	</div>
</div>
</template>

<script>	
  export default {
    name: 'Cart',
    methods: {
		removeFromCart(product) {
			for (let i = 0; i < this.$root.$data.cart.length; i++) {
				if (this.$root.$data.cart[i].id == product.id) {
					this.$root.$data.cart.splice(i, 1);
					break;
				}
			}
		}
    }
  }
</script>


<style>
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.cart_product {
		margin: 0 10% 24px 10%;
		display: grid;
		grid-template-columns: 1fr 3fr 2fr;
		grid-column-gap: 5px;
		grid-template-areas: "cart_product_image cart_product_detail cart_product_price";
		background: #F2921D;
	}

	.cart_product h1 {
		font-size: 24px;
	}

	.cart_product h2 {
		font-size: 20px;
	}

	.price {
		text-align: right;
		padding: 8px;
		font-weight: 800;
		display: grid;
		margin-top: 32px;
	}

	button {
		height: 50px;
		background: #000;
		color: white;
		border: none;
		font-weight: 800;
		margin: 8px;
	}

	.cart_product p {
		margin: 0px;
		font-size: 14px;
	}

	#cart_product_image {
		height: 160px;	
		width: 140px;
		border: 2px solid #333;
		object-fit: cover;
	}

	#cart_product_detail {
		margin-left: 8px;
	}

	#cart_product_price {
		display: flex;
		flex-direction: column;
		align-items: right;
	}

</style>