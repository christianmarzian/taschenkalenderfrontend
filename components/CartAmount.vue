<template>
	<b-numberinput @input="changeQuantity" min="0" controls-position="compact" size="is-small" type="is-text" :value="row.quantity"></b-numberinput>
</template>

<script>
import { mapMutations} from "vuex";
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
    ...mapMutations(["setIsLoading","setForceRefresh"]),

    async changeQuantity(event) {
      this.setIsLoading(true)
      const quantity = event >= 0 ? event : 0
      let res = await this.$apollo.mutate({
        mutation: gql`mutation ($orderLineId: ID!, $label: Int!) {
          adjustOrderLine(orderLineId: $orderLineId, quantity: $label) {
            ... on Order {
              totalWithTax
              lines {
                linePriceWithTax
                quantity
              }
            }
          }
        }`,
        variables: {
          label: quantity,
          orderLineId: this.row.id
        }
      })
      console.log("RESULT", res)
      //document.location.reload()
      //this.setIsLoading(false)
      this.setForceRefresh(true)
    },
  }
}
</script>