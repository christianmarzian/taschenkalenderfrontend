<template>
<div>...</div>
</template>

<script>
import gql from "graphql-tag";
export default {

  mounted() {
	this.addToCart()
  },

  methods: {
    async addToCart() {
		console.log("QUERY", this.$route.query.pv)
		if(this.$route.query.pv != "" && this.$route.query.serial != "") {
			let res = await this.$apollo.mutate({
				mutation: gql`mutation ($productVariantId: ID!, $customFields: OrderLineCustomFieldsInput) {
				addItemToOrder(productVariantId: $productVariantId, quantity: 1, customFields: $customFields) {
					... on Order {
						id
						code
						state
						totalWithTax
					}
				}
				}`,
				variables: {
					productVariantId: this.$route.query.pv,
					customFields: {serial: parseInt(this.$route.query.serial)}
				}
			})
			this.$router.push('/cart')
		}
		/*
      const quantity = event >= 0 ? event : 0
      let res = await this.$apollo.mutate({
        mutation: gql`mutation ($orderLineId: ID!, $label: Int!) {
          adjustOrderLine(orderLineId: $orderLineId, quantity: $label) {
            ... on Order {
              id
              code
              state
              totalWithTax
            }
          }
        }`,
        variables: {
          label: quantity,
          orderLineId: this.row.id
        }
      })
	  */

    },
  }
}
</script>