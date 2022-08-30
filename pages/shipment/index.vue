<template>
  <div>
    <h2 class="subtitle">{{headline}}</h2>
    <div class="columns">
      <div class="column">
        <div style="position:relative">
            <b-loading :is-full-page="false" v-model="inputloading" :can-cancel="false"></b-loading>
            <input type="text" v-on:keyup.enter="getBarcode()" v-model="barcode" autocomplete="off" ref="inputBarcode" :loading="inputloading" :disabled="inputdisabled" placeholder="barcode" class="input is-large">
        </div>
      </div>
      <div class="column is-narrow buttons">
        <a v-if="!inputloading" class="button is-large" @click="getBarcode()"
          >Enter</a
        >
        <a v-else class="button is-danger is-large" @click="cancelLoading()"
          >X</a
        >
      </div>
    </div>

    <table class="table is-fullwidth" v-if="order && orderLines && (Object.keys(orderLines).length > 1)">
      <thead>
        <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Barcode</th>
            <th>Scanned</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in orderLines" :key="line.id" :style="(line.customFields.printed_at) ? 'background-color:#d1dcd4':''">
            <td class="has-text-right is-narrow"><b v-if="line.quantity > 1">{{line.quantity}}</b><span v-else>1</span></td>
            <td>{{line.productVariant.translations[0].name}}</td>
            <td>{{line.customFields.serial ? line.customFields.serial : line.productVariant.sku}}</td>
            <td>{{line.customFields.printed_at}}</td>
        </tr>
      </tbody>
    </table>
    <!--
    <code v-if="codelog">{{codelog}}</code>
    <code>{{order}}</code>
    <br>&nbsp;<br>
    <code v-if="order && orderLines">{{orderLines}}</code>
    -->

  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  layout: "empty",

  data() {
    return {
      barcode: "",
      headline: "Scan Barcode",
      apiorder: {id:0},
      testid: 0,
      orderLines: [],
      trackingcode : false,
      inputloading: true,
      inputdisabled: true,
      codelog: "",
      isLoading: true,
      adminLoggedIn: false,
    };
  },


  mounted() {
    //this.vendureAdminLogin()
    this.cancelLoading()
  },

  apollo: {
    $client: 'admin',
    order: {
      query: gql`
        query($id:ID!) {
          order(id: $id) {
            fulfillments {
              id
              state
              createdAt
              nextStates
              trackingCode
              
            }
            lines{
              quantity
              id
              customFields{
                serial
                generated_at
                printed_at
              }
              productVariant{
                id
                sku
                translations{
                  name
                }
                featuredAsset{
                  source
                }
                product{
                  id
                  featuredAsset{
                    source
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return { id: this.apiorder.id };
      },
      skip() {
        return !this.apiorder.code
        //return !this.adminLoggedIn
      }
      
    },
  },

  /*watch: {
    order: async function() {
      if (this.apiorder && this.apiorder.code && this.order && this.order.lines) {
        await this.checkExistingApiOrder()
      } else {
        this.cancelLoading()
      }
    }, 
  },*/


  methods: {

    async getBarcode() {
      //alert(this.barcode)
      this.inputloading = true
      this.inputdisabled = true

      //// Es wurde bereits ein Buch gescannt und ein Auftrag mit mehreren Inhalten erstellt
      if (this.apiorder && this.apiorder.code) {
        if(this.barcode != "") {
            //alert(this.barcode)
            const ready = this.addScanned()
            if (ready) {
                this.confirmShipment("All accessoires are scanned. Do you want to print the label now?")
            }
            
        } else {
            this.cancelLoading()
        }
        
      }

      //// Es wird zum Ersten Mal gescannt und der Barcode ist eine gültige Serial
      else if (this.barcode.length == 7 && parseInt(this.barcode) > 1000000) {
        
        const ealogin = await this.$axios.post(
          this.$config.epicalapi_url + "/auth/login",
          this.$config.epicalapi_login
        );
        this.apiorder = await this.$axios.$get(
          this.$config.epicalapi_url +
          "/orders/" + this.barcode + "/by_serial",
          { headers: { Authorization: "Bearer " + ealogin.data.token } }
        );
        console.log("APIORDER",this.apiorder)
        await this.vendureAdminLogin()
        this.$apollo.queries.order.refetch()
        // wenn refetch fertig wird mit watch() this.checkExistingApiOrder() aufgerufen
        this.checkExistingApiOrder()

      //// Der Barcode wird zum ersten Mal gescannt ist aber nicht gültig
      } else {
        if(this.barcode && this.barcode.includes("X-")) {
            this.danger("You cannot scan Accessoires without you scanned a book before")
        } else {
            this.danger("Wrong Barcode")
        }
        this.cancelLoading()
      }
    },

    async checkExistingApiOrder() {
      console.log("NOW CHECK THE ORDER",this.order)
      //if (parseInt(this.order.lines.quantity) == 1) {
      if (Object.keys(this.order.lines).length == 1) {
        await this.createShipment()
      } else {
        this.headline = "Scan Barcode for Order #" + this.apiorder.code
        this.orderLines = this.order.lines
        this.addScanned()
        this.cancelLoading()
      }
    },

    addScanned() {
        let items = 0
        let readyitems = 0
        let orderLines = this.orderLines
        let barcode = this.barcode
        let danger = this.danger
        let quantityalert = function(linequantity) {            
          if(linequantity > 1) {
            danger("Attention! Product has to be added " + linequantity + " times.")
            //confirm("Attention! Product has to be added " + linequantity + " times.")
          }
        }
        //this.orderLines.forEach(function(line) {
        Object.keys(orderLines).forEach(function (key) { 
          const line = orderLines[key]
          items += 1
          if(line.customFields.printed_at) {
            readyitems += 1
          } else {
            if(barcode.includes("X-") && line.productVariant.sku == barcode) { // Barcode Zubehör
              orderLines[key].customFields.printed_at = new Date().toLocaleString()
              quantityalert(line.quantity)
              readyitems += 1
            } else if(line.customFields.serial == barcode) {          // Barcode Produkt
              orderLines[key].customFields.printed_at = new Date().toLocaleString()
              quantityalert(line.quantity)
              readyitems += 1
            } 
          }
		    })
        this.cancelLoading()
        console.log("this.barcode", this.barcode)
        console.log("Items: " + items + " ReadyItems: " + readyitems)
        return items == readyitems
    },

    async createShipment() {

      this.trackingcode = "ABGEHTDIEPOST"

      await this.addFulfillmentToOrder()
      const isShipped = await this.transitionFulfillmentToShipped()

      console.log("Is Shipped?", isShipped)

      if(isShipped) {
        this.$buefy.toast.open({
            duration: 5000,
            message: "Success. Printlabel will now be created",
            position: 'is-top',
            type: 'is-success'
        })
      } else {
        this.danger("Could not create printlabel. Already Shipped?")
      }

      this.apiorder = {id:false}
      this.trackingcode = false
      this.orderLines = []
      this.order = false

      this.cancelLoading()
    },

    async vendureAdminLogin() {
      let res = await this.$apollo.provider.clients.admin.mutate({
        mutation: gql`
          mutation($username:String!, $password:String!) {
              login(username:$username, password:$password, rememberMe:true) {__typename}
          }, 
        `,
        variables: this.$config.vendure_admin_login
      });
      await this.$apollo.queries.order.refetch()
      console.log("Logged In?", res.data.login["__typename"] == "CurrentUser")
      this.adminLoggedIn = true
      return res.data.login["__typename"] == "CurrentUser"
    },

    async addFulfillmentToOrder() {
      let orderLines = this.order.lines
      let lines = []
      Object.keys(orderLines).forEach(function (key) { 
            const line = orderLines[key]
            lines.push({"orderLineId": line.id, "quantity": line.quantity})
      })
      console.log("FulfillmentOrderLines", lines)
      let res = await this.$apollo.provider.clients.admin.mutate({
        mutation: gql`
          mutation($lines: [OrderLineInput!]!, $trackingCode: String!) {
            addFulfillmentToOrder(
              input: {
                lines: $lines
                handler: {
                  code: "manual-fulfillment"
                  arguments: [
                    { name: "method", value: "Postnord" }
                    { name: "trackingCode", value: $trackingCode }
                  ]
                }
              }
            ) { __typename }
          }
        `,
        variables: {"lines": lines, "trackingCode": this.trackingcode}
      });
      console.log("RES", res.data)
      await this.$apollo.queries.order.refetch()
      console.log("ORDER REFETCHED", this.order)
      return res.data.addFulfillmentToOrder["__typename"] == "CurrentUser"
    },

    async transitionFulfillmentToShipped() {
      let fulfillmentId = false
      
      if(this.order.fulfillments) {
        this.order.fulfillments.forEach(function(fulfillment) {
          console.log("Check Fulfillment", fulfillment)
          if (fulfillment.state == "Pending") {
            fulfillmentId = fulfillment.id
          }
        })
      }
      console.log("FullfillmentId", fulfillmentId)


      if (fulfillmentId) {
        let res = await this.$apollo.provider.clients.admin.mutate({
          mutation: gql`
            mutation($id:ID!) { 
              transitionFulfillmentToState(id:$id, state:"Shipped") {
                __typename
              }
            }
          `,
          variables: {"id": fulfillmentId}
        })
        //return res.data.transitionFulfillmentToState["__typename"] == "CurrentUser"
        return true
      } else {
        return false
      }
    },

    cancelLoading() {
      this.inputloading = false
      this.inputdisabled = false
      this.barcode = ""
      this.$refs.inputBarcode.focus()
    },

    confirmShipment(text) {

        this.$buefy.dialog.confirm({
            message: text,
            onConfirm: () => this.createShipment()
        })
    },

    danger(text) {
        this.$buefy.toast.open({
            duration: 5000,
            message: text,
            position: 'is-top',
            type: 'is-danger'
        })
    },
  },
};
</script>