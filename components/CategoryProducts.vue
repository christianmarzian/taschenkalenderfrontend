<template>
  <div>
    <section class="section">

      <div class="columns is-multiline">

        <div class="column is-one-third"          
          v-for="item in collection.productVariants.items"
          :key="item.id"
          :title="item.product.name">
          <ProductCard :product="item.product"></ProductCard>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      collection: {productVariants: {items: []}},
    };
  },
  props: {
    collectionslug: {
      type: String,
      required: true
    },
  },
  apollo: {
    collection: {
      query: gql`
      query ($slug: String!) {
        collection(slug: $slug) {
          name
          productVariants {
            items {
              product {
                id
                name
                slug
                featuredAsset {
                  name
                  preview
                  source
                  width
                  height
                }
                facetValues{
                  facet{name}
                  code
                }
                variants{
                  sku
                  priceWithTax
                }
              }
              id
              productId
              
            }
          }
        }
      }
      `,
      variables () {
        return { slug: this.collectionslug }
      }
    }
  },
};
</script>