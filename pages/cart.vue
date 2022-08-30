<template>
  <div class="cart">
    <!--<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>-->
    <section class="section">
      <div v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0">
        <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
        <table class="table is-fullwidth is-hoverable">
          
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
            <td width="120">
              <div v-if="line.productVariant.featuredAsset">
                <img :src="$ensureHttps(line.productVariant.featuredAsset.preview)" :alt="line.productVariant.name" />
              </div>
              <div v-else>
                <img v-if="line.productVariant.product.featuredAsset" :src="$ensureHttps(line.productVariant.product.featuredAsset.preview)" :alt="line.productVariant.name" />
              </div>
            </td>
            <td>
              <h4 class="subtitle is-5">{{ line.productVariant.name }}</h4>
              <p v-if="line.customFields.serial">Artikelnummer {{ line.customFields.serial}}</p>
            </td>
            <td width="120" class="has-text-right">{{ $toSek(line.linePriceWithTax) }}</td>
          </tr>
          </tbody>

          <tfoot>
            <tr v-for="line in activeOrder.discounts" :key="line.description">
              <td colspan="2"> 
                <b-button size="is-small" @click="removeCouponCode"
                  icon-left="close">
              </b-button>
              </td>
              <td class="has-text-right">Rabatt <strong>{{line.description}}</strong></td>
              <td class="has-text-right">{{$toSek(line.amountWithTax)}}</td>
            </tr>
            <tr>
              <td colspan="2"> </td>
              <td class="has-text-right">Frakt</td>
              <td class="has-text-right">{{$toSek(activeOrder.shippingWithTax)}}</td>
            </tr>
            <tr>
              <th colspan="2"> </th>
              <th class="has-text-right">Totalt <small>inkl. moms</small></th>
              <th class="has-text-right">{{$toSek(activeOrder.totalWithTax)}}</th>
            </tr>
          </tfoot>
        </table>


      </div><!-- if activeOrder and lines-->

      <div v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0" class="columns is-vcentered">
        <div class="column">
          <a href="/checkout"><b-button size="is-large" icon-right="chevron-right" type="is-primary">Till beställning</b-button></a>
        </div>
        <div v-if="activeOrder.couponCodes.length == 0" class="column is-narrow">
          <div class="field has-addons">
            <div class="control">
              <b-input v-model="rabattcode" size="is-small" icon="ticket-percent-outline" placeholder="Rabattkod"></b-input>
            </div>
            <div class="control">
              <b-button size="is-small" @click="addCouponCode()">Lägg till</b-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h2 v-if="!isLoading && activeOrder && activeOrder.lines && activeOrder.lines.length == 0" class="subtitle has-text-centered">Din varukorg är tom </h2>
        <h2 v-else class="subtitle has-text-centered">...</h2>
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
      activeOrder: {},
      rabattcode: ""
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
            couponCodes
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
                featuredAsset{preview}
                product{featuredAsset{preview}}
              }
              customFields {
                serial
              }
            }
            discounts {
              description
              amountWithTax
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
					  shippingWithTax
            totalWithTax
					}
				}
				}`
			})
			return res
		},

    async addCouponCode() {
      this.setIsLoading(true)
      let res = await this.$apollo.mutate({
				mutation: gql`mutation ($couponCode: String!){
				applyCouponCode(couponCode:$couponCode) {
					... on Order {
					  couponCodes
            discounts {
              description
              amountWithTax
            }
            shippingWithTax
            totalWithTax
					}
				}
				}`,
        variables: {
					couponCode: this.rabattcode,
				}
			})
      console.log("RABATTRES", res.data)
      let rabatterror = false
      switch(res.data.applyCouponCode["__typename"]) {
        case "CouponCodeInvalidError":
          rabatterror = "Rabattkoden existerar inte"
        case "CouponCodeExpiredError":
          rabatterror = "Rabattkoden har tyvärr gått ut"
        case "CouponCodeLimitError":
          rabatterror = "Rabattkoden är redan utnyttjad"
      }
      if(rabatterror) {
        this.$buefy.toast.open({
            duration: 5000,
            message: rabatterror,
            position: 'is-top',
            type: 'is-danger'
        })
      } else {
        this.$buefy.toast.open({
            duration: 3000,
            message: "Rabatt är dragen",
            type: 'is-success'
        })
      }
      console.log("Coupon added", this.activeOrder.couponCodes[0])
      this.setForceRefresh(true)
      //this.$apollo.queries.activeOrder.refetch()
			return res
    },

    async removeCouponCode() {
      this.setIsLoading(true)
      let res = await this.$apollo.mutate({
				mutation: gql`mutation ($couponCode: String!){
				removeCouponCode(couponCode:$couponCode) {
					... on Order {
					  couponCodes
            discounts {
              description
              amountWithTax
            }
            shippingWithTax
            totalWithTax
					}
				}
				}`,
        variables: {
					couponCode: this.activeOrder.couponCodes[0],
				}
			})
      console.log("Coupon removed", this.activeOrder.couponCodes[0])
      this.setForceRefresh(true)
      //this.$apollo.queries.activeOrder.refetch()
			return res
    }


  }

};
</script>