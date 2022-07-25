<template>
  <div class="cart">
    <section class="section">
      <div         v-if="activeOrder">
      <b-table
        :data="activeOrder.lines"
        @page-change="onPageChange"
        :bordered="false"
        :striped="false"
        :narrowed="false"
        :hoverable="false"
        :loading="isLoading"
        :focusable="false"
        :mobile-cards="false"
      >
	  	<b-table-column label="Antal" v-slot="props" width="120">
            <b-numberinput @input="changeQuantity" min="0" controls-position="compact" size="is-small" type="is-text" :value="props.row.quantity">
            </b-numberinput>
		  </b-table-column>

      <b-table-column v-slot="props" width="120">
            <img :src="props.row.productVariant.product.featuredAsset.preview" :alt="props.row.productVariant.name" />
		  </b-table-column>
		

        <b-table-column label="Name" v-slot="props">
          {{ props.row.productVariant.name }}
          <p v-if="props.row.customFields.serial">Artikelnummer {{ props.row.customFields.serial}}</p>
        </b-table-column>

        <b-table-column
          width="110" 
          field="unitPriceWithTax"
          label="Pris"
          v-slot="props"
        >
          {{ (props.row.linePriceWithTax) / 100 }} kr
        </b-table-column>

        <template #footer >
          <th colspan="3">
            <div class="th-wrap is-numeric">Totalt</div>
          </th>
          <th>
              <div class="th-wrap is-numeric">{{activeOrder.totalWithTax / 100}} kr</div>
          </th>

        </template>



      </b-table>
      </div>
      <div v-else class="has-text-centered">Din varukorg är tom 
        <a @click="changeQuantity" class="button">+</a>
      </div>

      <b-button size="is-large" icon-right="chevron-right" type="is-primary">Till beställning</b-button>

    </section>

    <section class="section">
      <code>{{ activeOrder }}</code>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      isLoading: false,
      activeOrder: {},
    };
  },
  apollo: {
    activeOrder: {
      query: gql`
        query {
          activeOrder {
            code
            createdAt
            customer {
              firstName
            }
            payments {
              method
            }
            lines {
              linePriceWithTax
              id
              quantity

              productVariant {
                name
                sku
                product{featuredAsset{preview}}
              }
              customFields {
                serial
                generated_at
                printed_at
              }
            }
            totalWithTax
          }
        }
      `,
    },
  },

  methods: {
    onPageChange() {
      alert(activeOrder.lines)
    },

    changeQuantityOld(event) {
      console.log("changeQuantity", event)
    },

    async changeQuantity(event) {
    // Call to the graphql mutation
    const result = await this.$apollo.mutate({
      // Query
      mutation: gql`mutation {
        addItemToOrder(productVariantId: 3, quantity: 1) {
          ... on Order {
            id
          }
        }
      }`
    })
    //console.log("MUTATION",result)
  }
  }
};
</script>