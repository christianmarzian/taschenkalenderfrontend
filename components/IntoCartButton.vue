<template>
	<span>
		<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
		<a v-if="product.name.includes('Anteckningsbok') || product.name.toLowerCase().includes('kalender')" :href="computedDesignerUrl" class="button is-primary is-pulled-right">Skapa</a>
		<a v-else-if="product.variants.length > 1" class="button is-primary is-pulled-right" :href="product.slug">Välj variant</a>
		<a v-else class="button is-pulled-right is-primary" @click="addToCart()">Lägg i kundkorg</a>
	</span>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import gql from "graphql-tag";
export default {
	name: 'IntoCartButton',
  	props: {
		product: {
			type: Object,
			required: true,
		},
  }, 

	computed: {
		...mapState(["isLoading"]),

		computedDesignerUrl() {
			let nbadd = (this.product.name.includes("Anteckningsbok")) ? "/Anteckningsbok" : ""
			return `${this.$config.designerurl}${nbadd}?format=${this.$getFacetCode(this.product.facetValues,'DIN-Format')}&covertype=${this.$getFacetCode(this.product.facetValues,'Cover')}`
		}
	},

  methods: {
	...mapMutations(["setIsLoading"]),

    async addToCart() {
		this.setIsLoading(true)
		//await this.transitionOrderToAddingItems()
		console.log("QUERY", this.$route.query)
		//if(this.$route.query.pv != "" && this.$route.query.serial != "" && this.$route.query.qvev && this.$route.query.qvev == parseInt(this.$route.query.pv) * 3) {
			console.log("LOS", this.product)
			let res = await this.$apollo.mutate({
				mutation: gql`mutation ($productVariantId: ID!) {
				addItemToOrder(productVariantId: $productVariantId, quantity: 1) {
					... on Order {
						id
						code
					}
					... on OrderModificationError {
						message
					}
				}
				}`,
				variables: {
					productVariantId: this.product.variants[0].id,
				}
			})
			console.log(res)
			this.$router.push('/cart')
		//}
    },

	async transitionOrderToAddingItems() {
      const pi = this.pi;
      const metadata = {};
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            transitionOrderToState(state: "AddingItems") {
              ... on Order {
                id
                code
                state
              }
            }
          }
        `,
      });
      return res;
    },
  }
}
</script>