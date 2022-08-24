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
    <table class="table is-fullwidth" v-if="orderLines && orderLines != ''">
        <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Barcode</th>
            <th>Scanned</th>
        </tr>
        <tr v-for="line in orderLines" :key="line.id" :style="(line.orderLine.customFieldsPrinted_at) ? 'background-color:#d1dcd4':''">
            <td class="has-text-right is-narrow"><b v-if="line.stockMovement.quantity > 1">{{line.stockMovement.quantity}}</b><span v-else>1</span></td>
            <td>{{line.productVariantTranslation.name}}</td>
            <td>{{line.orderLine.customFieldsSerial ? line.orderLine.customFieldsSerial : line.productVariant.sku}}</td>
            <td>{{line.orderLine.customFieldsPrinted_at}}</td>
        </tr>
    </table>
    <code v-if="codelog">{{codelog}}</code>
  </div>
</template>

<script>
export default {
  layout: "empty",

  data() {
    return {
      barcode: "",
      headline: "Scan Barcode",
      order: false,
      orderLines: [],
      inputloading: false,
      inputdisabled: false,
      codelog: ""
    };
  },

  mounted() {
    this.$refs.inputBarcode.focus();
  },

  methods: {
    async getBarcode() {
      //alert(this.barcode)
      this.inputloading = true
      this.inputdisabled = true

      //// Es wurde bereits ein Buch gescannt und ein Auftrag mit mehreren Inhalten erstellt
      if (this.order && this.order.code) {
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
        const existingOrderLine = await this.$axios.$post(
          this.$config.epicalapi_url +
          "/order_lines/by_serial",
          {"barcode": this.barcode},
          { headers: { Authorization: "Bearer " + ealogin.data.token } }
        );

        if(existingOrderLine) {
            
            if (Object.keys(existingOrderLine.orderLines).length == 1) {
                this.order = existingOrderLine.order
                this.createShipment()
            } else {
                this.order = existingOrderLine.order
                this.orderLines = existingOrderLine.orderLines
                console.log(existingOrderLine.orderLine.id)
                this.orderLines[existingOrderLine.orderLine.id].orderLine.customFieldsPrinted_at = new Date().toLocaleString()
                this.headline = "Scan Barcode for Order #" + this.order.code
                this.cancelLoading()
            }
        } else {
            this.danger("No Product found with Serial " + this.barcode)
            this.inputloading = false
            this.inputdisabled = false
            barcode = ""
            this.barcode = ""
        }
        console.log("AXIOS", existingOrderLine);
        
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

    addScanned() {
        let items = 0
        let readyitems = 0
        let orderLines = this.orderLines
        let barcode = this.barcode
        //this.orderLines.forEach(function(line) {
        Object.keys(orderLines).forEach(function (key) { 
            const line = orderLines[key]
			items += 1
            if(line.orderLine.customFieldsPrinted_at) {
                readyitems += 1
            } else {
                if(barcode.includes("X-") && line.productVariant.sku == barcode) { // Barcode Zubehör
                    orderLines[key].orderLine.customFieldsPrinted_at = new Date().toLocaleString()
                    readyitems += 1
                } else if(line.orderLine.customFieldsSerial == barcode) {          // Barcode Produkt
                    orderLines[key].orderLine.customFieldsPrinted_at = new Date().toLocaleString()
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
        this.inputloading = true
        this.inputdisabled = true
        alert("CreateShipment for #" + this.order.code)
        const ealogin = await this.$axios.post(
          this.$config.epicalapi_url + "/auth/login",
          this.$config.epicalapi_login
        );
        const order = await this.$axios.$post(
          this.$config.epicalapi_url +
          "/orders/" + this.order.code,
          {},
          { headers: { Authorization: "Bearer " + ealogin.data.token } }
        );
        
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