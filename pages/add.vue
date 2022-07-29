<template>
	<div>
		<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import gql from "graphql-tag";
export default {

  mounted() {
	this.addToCart()
  },

	computed: {
		...mapState(["isLoading"]),
	},

  methods: {
	...mapMutations(["setIsLoading"]),

    async addToCart() {
		this.setIsLoading(true)
		await this.transitionOrderToAddingItems()
		console.log("QUERY", this.$route.query)
		if(this.$route.query.pv != "" && this.$route.query.serial != "" && this.$route.query.qvev && this.$route.query.qvev == parseInt(this.$route.query.pv) * 3) {
			console.log("LOS")
			let res = await this.$apollo.mutate({
				mutation: gql`mutation ($productVariantId: ID!, $customFields: OrderLineCustomFieldsInput) {
				addItemToOrder(productVariantId: $productVariantId, quantity: 1, customFields: $customFields) {
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
					productVariantId: this.$route.query.pv,
					customFields: {serial: parseInt(this.$route.query.serial)}
				}
			})
			console.log(res)
			this.$router.push('/cart')
		}
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