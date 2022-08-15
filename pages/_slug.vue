<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <div v-for="(img, counter) in product.assets" :key="img.id" class="imgcontainer">
            <img :src="$ensureHttps(img.preview)" alt="product.name" :class="counter != 0 ? `is-hidden-mobile` : ``" />
        </div>
        
      </div>

      <div class="column">
        <h1 class="title is-3 is-size-4-mobile">{{ product.name }}</h1>

        <p class="content" v-html="getDescriptionPart()"></p>
        
        <section class="section">
            <div class="columns is-vcentered">
            <div class="column price">
                <p class="title is-4 has-text-primary">
                {{ $toSek(product.variants[0].priceWithTax) }}
                </p>
            </div>
            <div class="column" v-if="product.variants.length <= 1">
                <IntoCartButton :product="product"></IntoCartButton>
            </div>
            </div>
        </section>

        <section class="section" v-if="product.variants.length > 1">
          <h2 class="subtitle is-3 is-size-4-mobile">Välj variant</h2>
          <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="variant in product.variants" :key="variant.sku">
              <b-tooltip :label="`Lägg ${variant.name} i kundkorg`">
                <img @click="addToCart(variant)" v-if="variant.featuredAsset" :src="$ensureHttps(variant.featuredAsset.preview)" :alt="variant.sku" width="250" class="variantimg" />
              </b-tooltip>
            </div>
          </div>
        </section>

        <p v-if="getDescriptionPart(1) != '<ul>undefined'" class="content" v-html="getDescriptionPart(1)"></p>

      </div>
    </div>
  </section>
</template>
<script>
import gql from "graphql-tag";
import { mapMutations } from "vuex";

export default {
  asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },

  apollo: {
    product: {
      query: gql`
        query ($slug: String!) {
          product(slug: $slug) {
            name
            description
            variants {
              id
              sku
              name
              priceWithTax
              featuredAsset{preview}
            }
            assets {
              id
              preview
            }
            collections{
                slug
            }
            facetValues{
                facet{name}
                code
            }
          }
        }
      `,
      variables() {
        return { slug: this.slug };
      },
    },
  },


  methods: {
    ...mapMutations(["setIsLoading"]),

    getDescriptionPart(part = 0) {
        let parts = this.product.description.split("<ul>")
        return part == 1 ? "<ul>" + parts[part] : parts[part]
    },

    async addToCart(variant) {
      //console.log("Variant", variant)
		  this.setIsLoading(true)
			let res = await this.$apollo.mutate({
				mutation: gql`mutation ($productVariantId: ID!) {
				addItemToOrder(productVariantId: $productVariantId, quantity: 1) {
					... on Order {
						id
						code
					}
					... on OrderModificationError {
						message
					}
				}
				}`,
				variables: {
					productVariantId: variant.id,
				}
			})
			console.log(res)
			this.$router.push('/cart')
    },
  }
};
</script>

<style scoped>
    .variantimg {
      cursor:pointer;
    }
    .imgcontainer{
        margin-bottom:1.5em;
    }
</style>

<style lang="scss">

.content {
  ul {
    margin: 0 0;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    list-style-type:none;

    li {
      border-bottom: 1px #eee solid;
      margin-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
</style>