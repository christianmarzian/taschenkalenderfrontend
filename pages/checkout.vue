<template>
  <div>
    <form
      v-if="activeOrder"
      id="checkoutform"
      ref="checkoutform"
      v-on:submit.prevent
    >
      <b-loading
        :is-full-page="true"
        v-model="isLoading"
        :can-cancel="false"
      ></b-loading>
      <section class="section">
        <h3 class="title is-3">Mina kontaktuppgifter</h3>
        <div class="columns">
          <div class="column">
            <b-field label="E-post">
              <b-input
                :value="
                  activeOrder.customer ? activeOrder.customer.emailAddress : ''
                "
                ref="emailAddress"
                required
                placeholder="e-post"
                maxlength="50"
                autocomplete="email"
              ></b-input>
            </b-field>
          </div>
        </div>
        <h3 class="title is-3">Adress</h3>

        <div class="columns">
          <div class="column">
            <b-field label="Förnamn">
              <b-input
                :value="
                  activeOrder.customer ? activeOrder.customer.firstName : ''
                "
                ref="firstName"
                required
                placeholder="förnamn"
                maxlength="35"
                autocomplete="given-name"
              ></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Efternamn">
              <b-input
                :value="
                  activeOrder.customer ? activeOrder.customer.lastName : ''
                "
                ref="lastName"
                required
                placeholder="efternamn"
                maxlength="35"
                autocomplete="family-name"
              ></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-field label="Adress, gata, nummer">
              <b-input
                :value="activeOrder.billingAddress.streetLine1"
                ref="streetLine1"
                required
                placeholder="gata och husnummer"
                maxlength="50"
                autocomplete="street-address"
              ></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-narrow is-one-quarter">
            <b-field label="Postnummer">
              <b-input
                :value="activeOrder.billingAddress.postalCode"
                ref="postalCode"
				placeholder="postnummer"
                required
                minlength="5"
                maxlenght="5"
                autocomplete="postal-code"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-one-half">
            <b-field label="Stad">
              <b-input
                :value="activeOrder.billingAddress.city"
                ref="city"
                required
                placeholder="stad"
                maxlength="35"
                autocomplete="address-level2"
              ></b-input>
            </b-field>
          </div>
		            <div class="column is-narrow">
            <b-field label="Land">
              <b-select
                placeholder="land"
                ref="countryCode"
                required
                autocomplete="country-name"
                :value="activeOrder.billingAddress.countryCode || 'SE'"
              >
                <option value="SE">Sverige</option>
              </b-select>
            </b-field>
          </div>
        </div>

        <div class="columns">

        </div>
      </section>

      <section class="section">
		<div class="columns">
			<div class="column is-narrow">
				<h3 class="title is-3">Betalning</h3>
			</div>
			<div class="column"><h5 class="title is-3">{{activeOrder.totalWithTax / 100}} kr</h5></div>
		</div>
        

        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
      </section>

      <section class="section">
        <button
          type="submit"
          ref="hidesubmit"
          id="hidesubmit"
          style="display: none"
        ></button>
        <a
          id="submit"
          ref="submit"
          @click="doCheckout"
          class="button is-large is-primary"
          style="display: none"
          >beställ nu</a
        >
      </section>
    </form>
  </div>
</template>

<script>
//import axios from "axios";
import gql from "graphql-tag";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      pi: false,
      elements: false,
      paymentElement: false,
    };
  },

  computed: {
    ...mapState(["isLoading"]),
  },

  apollo: {
    activeOrder: {
      query: gql`
        query {
          activeOrder {
            id
            code
            state
            createdAt
            customer {
              emailAddress
              firstName
              lastName
            }
            billingAddress {
              fullName
              company
              streetLine1
              postalCode
              city
              countryCode
            }
            shippingAddress {
              fullName
              company
              streetLine1
              postalCode
              city
              countryCode
            }
            totalWithTax
          }
        }
      `,
      watchLoading(isLoading) {
        this.setIsLoading(isLoading);
        //console.log("isLoading",isLoading)
        // countModifier is either 1 or -1
      },
    },
  },

  async mounted() {
    this.setIsLoading(true);
    await this.loadStripe();
    this.setIsLoading(false);
  },

  /*
	watch: {
		isLoading: function() {
			alert(isLoading)
		}
	},*/

  methods: {
    ...mapMutations(["setIsLoading"]),

    async loadStripe() {
      //if (this.$stripe && this.activeOrder && this.activeOrder.state && this.activeOrder.state != "ArrangingPayment") {
      if (this.$stripe && this.activeOrder && this.activeOrder.state) {
        const appearance = {
          theme: "stripe",
          variables: {
            colorPrimary: "#eee",
            colorText: "#000",
          },
        };
        this.pi = await this.createPaymentIntent();
        const { clientSecret } = { clientSecret: this.pi };
        this.elements = this.$stripe.elements({ appearance, clientSecret });
        this.paymentElement = this.elements.create("payment");
        this.paymentElement.mount("#payment-element");
        this.$refs.submit.style.display = "block";
      } else {
        this.$router.push("/cart");
      }
    },

    async createPaymentIntent() {
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            createStripePaymentIntent
          }
        `,
      });
      //console.log("PI", res.data.createStripePaymentIntent)
      return res.data.createStripePaymentIntent;
    },

    async doCheckout() {
      this.setIsLoading(true);

      console.log("FORM valid", this.$refs.checkoutform.checkValidity());

      if (!this.$refs.checkoutform.checkValidity()) {
        const notifAddress = this.$buefy.notification.open({
          duration: 5000,
          message: "Kontrollera dina adressuppgifter",
          position: "is-top",
          type: "is-danger",
          hasIcon: true,
        });
        //this.$refs.checkoutform.onSubmit()
        //document.getElementById('checkoutform').submit()
        this.$refs.hidesubmit.click();
      } else {
        const elements = this.elements;

        const customer = await this.setCustomer();
        console.log("Customer", customer);

        const baddress = await this.setOrderBillingAddress();
        console.log("BillingAddress", baddress);

        const saddress = await this.setOrderShippingAddress();
        console.log("ShippingAddress", saddress);

        const state = await this.transitionOrderToArrangingPaymentState();
        console.log("State", state);

        //const ps = await this.addPaymentStripe()
        //console.log("PS", ps)
        // -> über Webhook

        const { error } = await this.$stripe.confirmPayment({
          elements,
          confirmParams: {
            //return_url: "http://localhost:3000/success",
            return_url: location.origin + `/success/${this.activeOrder.code}`,
          },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        let notificationText = "";
        if (error.type === "card_error" || error.type === "validation_error") {
          notificationText = error.message;
        } else {
          notificationText =
            "Det gick inte att slutföra betalningen. Var god försök igen.";
        }
        const notif = this.$buefy.notification.open({
          duration: 5000,
          message: notificationText,
          position: "is-top",
          type: "is-danger",
          hasIcon: true,
        });
      }
      this.setIsLoading(false);
    },

    async setCustomer() {
      const ealogin = await this.$axios.post(
        this.$config.epicalapi_url + "/auth/login",
        this.$config.epicalapi_login
      );
      const existingCustomer = await this.$axios.$get(
        this.$config.epicalapi_url + "/customers/1?emailAddress=" + this.$refs.emailAddress.computedValue,
        { headers: { Authorization: "Bearer " + ealogin.data.token } }
      );
      console.log("AXIOS", existingCustomer);
      if (existingCustomer) {
        console.log("existingCustomer", existingCustomer.id);
        const formData = new FormData();
        formData.append("customerId", existingCustomer.id);
        const order = await this.$axios.$put(
          this.$config.epicalapi_url + "/orders/" + this.activeOrder.code,
          formData,
          { headers: { Authorization: "Bearer " + ealogin.data.token } }
        );
        await this.$apollo.queries.activeOrder.refresh;
      } else {
        console.log("NOT EXISTING");
        return await this.setCustomerForOrder();
      }
    },

    async setOrderBillingAddress() {
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: CreateAddressInput!) {
            setOrderBillingAddress(input: $input) {
              ... on Order {
                id
                code
                state
                totalWithTax
              }
            }
          }
        `,
        variables: {
          input: {
            fullName: `${this.$refs.firstName.computedValue} ${this.$refs.lastName.computedValue}`,
            streetLine1: this.$refs.streetLine1.computedValue,
            postalCode: this.$refs.postalCode.computedValue,
            city: this.$refs.city.computedValue,
            countryCode: this.$refs.countryCode.computedValue,
          },
        },
      });
      return res;
    },

    async setOrderShippingAddress() {
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: CreateAddressInput!) {
            setOrderShippingAddress(input: $input) {
              ... on Order {
                id
                code
                state
                totalWithTax
              }
            }
          }
        `,
        variables: {
          input: {
            fullName: `${this.$refs.firstName.computedValue} ${this.$refs.lastName.computedValue}`,
            streetLine1: this.$refs.streetLine1.computedValue,
            postalCode: this.$refs.postalCode.computedValue,
            city: this.$refs.city.computedValue,
            countryCode: this.$refs.countryCode.computedValue,
          },
        },
      });
      return res;
    },

    async setCustomerForOrder() {
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: CreateCustomerInput!) {
            setCustomerForOrder(input: $input) {
              ... on Order {
                id
                code
                state
                totalWithTax
              }
            }
          }
        `,
        variables: {
          input: {
            emailAddress: this.$refs.emailAddress.computedValue,
            firstName: this.$refs.firstName.computedValue,
            lastName: this.$refs.lastName.computedValue,
          },
        },
      });
      return res;
    },

    async transitionOrderToArrangingPaymentState() {
      const pi = this.pi;
      const metadata = {};
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            transitionOrderToState(state: "ArrangingPayment") {
              ... on Order {
                id
                code
                state
                totalWithTax
              }
            }
          }
        `,
      });
      return res;
    },

    async addPaymentStripe() {
      const pi = this.pi;
      const metadata = {};
      let res = await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: PaymentInput!) {
            addPaymentToOrder(input: $input) {
              ... on Order {
                id
                code
                state
                totalWithTax
              }
            }
          }
        `,
        variables: {
          input: {
            method: "stripe",
            metadata: {},
          },
        },
      });
      return res;
    },
  },
};
</script>