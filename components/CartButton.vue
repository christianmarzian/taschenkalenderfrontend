<template>
	<div class="buttons">
		<NuxtLink v-if="activeOrder" class="button is-primary" :to="{ name: 'cart' }">
		<b-icon icon="cart" />
		<b-tag v-if="totalItems > 0" rounded>{{totalItems}}</b-tag>
		</NuxtLink>
		<b-tooltip v-else label="Din varukorg är tom" position="is-left">
		<a class="button is-text" disabled :to="{path: 'cart'}">
		<b-icon icon="cart-variant" />
		</a>
		</b-tooltip>
		<!--
		<a class="button is-light">
		<b-icon icon="login" />
		</a>
		-->
	</div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapMutations } from "vuex";
export default {
	name: "CartButton",

	computed: {
		//...mapState(["forceRefresh"]),

		totalItems() {
			let quantity = 0
			this.activeOrder.lines.forEach(function(line) {
				//console.log("lineQuantity", line.quantity)
				quantity += line.quantity
			})
			return quantity
		}
	},


	methods: {
		//...mapMutations(["setForceRefresh"]),


	},

	apollo: {
		activeOrder: {
		query: gql`
			query {
			activeOrder {
				lines {
					quantity
				}
			}
			}
		`,
		},
	},
};
</script>