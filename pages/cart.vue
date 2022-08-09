<template>
  <div class="cart">
    <!--<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>-->
    <section class="section">
      <div v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0">
      <table class="table is-fullwidth is-hoverable">
        <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
        <thead>
        <tr>
          <th>Antal</th>
          <th> </th>
          <th>Name</th>
          <th class="has-text-right">Pris</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="line in activeOrder.lines" :key="line.id">
          <td width="120"><CartAmount :row="line"></CartAmount></td>
          <td width="120"><img :src="$ensureHttps(line.productVariant.product.featuredAsset.preview)" :alt="line.productVariant.name" /></td>
          <td>
            <h4 class="subtitle is-5">{{ line.productVariant.name }}</h4>
            <p v-if="line.customFields.serial">Artikelnummer {{ line.customFields.serial}}</p>
          </td>
          <td width="120" class="has-text-right">{{ (line.linePriceWithTax) / 100 }} kr</td>
        </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="2"> </td>
            <td class="has-text-right">Frakt</td>
            <td class="has-text-right">{{activeOrder.shippingWithTax / 100}} kr</td>
          </tr>
          <tr>
            <th colspan="2"> </th>
            <th class="has-text-right">Totalt <small>inkl. moms</small></th>
            <th class="has-text-right">{{activeOrder.totalWithTax / 100}} kr</th>
          </tr>
        </tfoot>
      </table>


      </div>

      <div v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0">
        <a href="/checkout"><b-button size="is-large" icon-right="chevron-right" type="is-primary">Till beställning</b-button></a>
      </div>
      <div v-else>
        <h2 v-if="!isLoading" class="subtitle has-text-centered">Din varukorg är tom </h2>
      </div>
      

      
      

    </section>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import gql from "graphql-tag";
export default {
  data() {
    return {
      //activeOrder: {},
    };
  },

	computed: {
    ...mapState(["isLoading", "forceRefresh"]),
  },

  apollo: {
    activeOrder: {
      query: gql`
        query {
          activeOrder {
            id
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
              }
            }
            shippingWithTax
            totalWithTax
          }
        }
      `,
      /*
      watchLoading (isLoading) {
        console.log("APOLLO Loading", isLoading)
        this.setIsLoading(isLoading)
      },
      */
    },
  },

  async mounted() {
    console.log("Mounted")
    await this.setOrderShippingMethod()
    console.log("Shipping set")
    this.$apollo.queries.activeOrder.refetch()
    console.log("Refreshed")
    this.setIsLoading(false)
  },

  watch: {
    /*activeOrder: function () {
      //alert("Active Order")
      console.log("ActiveOrderWatcher")
    },*/

    forceRefresh: function (val) {
      this.$apollo.queries.activeOrder.refetch()
      this.setForceRefresh(false)
      this.setIsLoading(false)
    }
  },

  methods: {
    ...mapMutations(["setIsLoading", "setForceRefresh"]),

    async setOrderShippingMethod() {
			let res = await this.$apollo.mutate({
				mutation: gql`mutation {
				setOrderShippingMethod(shippingMethodId:"3") {
					... on Order {
					  code
					}
				}
				}`
			})
			return res
		},
  }

};
</script>