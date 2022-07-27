<template>
	<b-numberinput @input="changeQuantity" min="0" controls-position="compact" size="is-small" type="is-text" :value="row.quantity"></b-numberinput>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: 'CartAmount',
  props: {
    row: {
      type: Object,
      required: true
    },
  }, 

  methods: {
    async changeQuantity(event) {
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
      console.log("RESULT", res)
      document.location.reload()
    },
  }
}
</script>