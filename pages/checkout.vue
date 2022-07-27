<template>
	<div>
		<form id="checkoutform" v-on:submit.prevent>
			<section class="section">
				<h3 class="title is-3">Adres</h3>
				
				<div class="columns">

					<div class="column">
						
							<b-field label="Name">
							<b-input
							:value="activeOrder.billingAddress.fullName"
							ref="fullName"
							required
							placeholder="Name"
							maxlength="50"
							autocomplete="name"
							></b-input>
						</b-field>

						<b-field label="Street and Housenumber">
							<b-input
							:value="activeOrder.billingAddress.streetLine1"
							ref="streetLine1"
							required
							placeholder="Street"
							maxlength="50"
							autocomplete="street-address"
							></b-input>
						</b-field>
					
				</div>
				</div>
				<div class="columns">
				<div class="column is-narrow is-one-half">
					<b-field label="PostalCode">
					<b-input
					:value="activeOrder.billingAddress.postalCode"
					ref="postalCode"
					required
					minlength="5"
					maxlenght="5"
					autocomplete="postal-code"
					></b-input>
				</b-field>
				</div>
				<div class="column is-one-half">
					<b-field label="City">
					<b-input
					:value="activeOrder.billingAddress.City"
					ref="city"
					required
					placeholder="Ort"
					maxlength="35"
					autocomplete="address-level2"
					></b-input>
				</b-field>
				</div>
				</div>

				<div class="columns">
					<div class="column">
						<b-field label="Country">
					<b-select
					placeholder="Your country"
					ref="countryCode"
					required
					autocomplete="country-name"
					:value="activeOrder.billingAddress.countryCode"
					>
						<option value="SE">Sverige</option>
					</b-select>
				</b-field>
					</div>
				</div>

				
			</section>

			<section class="section">
				<h3 class="title is-3">Betalning</h3>
				<div id="card-element"></div>
					<div id="payment-element">
						<!-- Elements will create form elements here -->
					</div>
					<div id="error-message">
						<!-- Display error message to your customers here -->
					</div>
			</section>

			<section class="section">
				<a id="submit" ref="submit" @click="doCheckout" class="button is-large is-primary" style="display:none">Checkout</a>
			</section>
		</form>
		
	</div>
</template>

<script>
import gql from "graphql-tag";
export default {
	data() {
		return {
			paymentElement: false
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
				billingAddress {
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
		},
	},

	async mounted() {
		var loading = function(isLoading) {
			if (isLoading) {

			document.getElementById("submit").disabled = true
			document.getElementById("submit").classList.add("is-loading")
			} else {
			document.getElementById("submit").disabled = false
			document.getElementById("submit").classList.remove("is-loading")
			}
		}

		// Show the customer the error from Stripe if their card fails to charge
		var showError = function(errorMsgText) {
			loading(false);
			var errorMsg = document.getElementById("card-error");
			errorMsg.textContent = errorMsgText;
			setTimeout(function() {
				errorMsg.textContent = "";
			}, 4000);
		};

		await this.loadStripe()

		
	},

	methods:{


		async loadStripe() {
			if (this.$stripe && this.activeOrder) {


				/*
				const style = {
					base: {
						color: "#000",
						fontFamily: 'Satoshi, Avenir, Arial, sans-serif',
						fontSmoothing: "antialiased",
						fontSize: "16px",
						"::placeholder": {
						color: "#eee"
						}
					},
					invalid: {
						fontFamily: 'Satoshi, Avenir, Arial, sans-serif',
						color: "#ff3860",
						iconColor: "#ff3860"
					}
				}*/
				const appearance = {
					theme: 'stripe',
					variables: {
					colorPrimary: '#eee',
					colorText: '#000',
					},
				};
				let pi = await this.createPaymentIntent()
				const { clientSecret } = {clientSecret: pi}
				const elements = this.$stripe.elements({appearance, clientSecret})
				this.paymentElement = elements.create('payment');
				this.paymentElement.mount('#payment-element');
				this.$refs.submit.style.display = "block"
			}
		},

		async createPaymentIntent() {
			let res = await this.$apollo.mutate({
				mutation: gql`mutation {
					createStripePaymentIntent
				}`
			})
			//console.log("PI", res.data.createStripePaymentIntent)
			return res.data.createStripePaymentIntent
    	},

		doCheckout() {
			const stripe = this.$stripe
			const paymentElement = this.paymentElement
			this.createPaymentIntent().then(function(pi) {
				console.log("PI: ", pi)
				const secret = pi.split("secret_")[1]
				stripe.confirmCardPayment(pi, { payment_method: { card: card}}).then(function(paymentresult) {
					console.log("PR", paymentresult)
				})
			})
		}
	}
}
</script>