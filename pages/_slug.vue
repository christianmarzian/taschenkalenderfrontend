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

        <p v-html="getDescriptionPart()"></p>
        <section class="section">
            <div class="columns is-vcentered">
            <div class="column price">
                <p class="title is-4 has-text-primary">
                {{ $toSek(product.variants[0].priceWithTax) }}
                </p>
            </div>
            <div class="column">
                <a :href="computedDesignerUrl" class="button is-primary is-large">Skapa nu</a>
            </div>
            </div>
        </section>

        <p class="content" v-html="getDescriptionPart(1)"></p>

      </div>
    </div>
  </section>
</template>
<script>
import gql from "graphql-tag";

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
              sku
              priceWithTax
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

  computed: {
    computedDesignerUrl() {
      let nbadd = (this.product.name.includes("Anteckningsbok")) ? "/Anteckningsbok" : ""
      return `${this.$config.designerurl}${nbadd}?format=${this.$getFacetCode(this.product.facetValues,'DIN-Format')}&covertype=${this.$getFacetCode(this.product.facetValues,'Cover')}`
    }
  },

  methods: {
    getDescriptionPart(part = 0) {
        let parts = this.product.description.split("<ul>")
        return part == 1 ? "<ul>" + parts[part] : parts[part]
    }
  }
};
</script>

<style scoped>
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