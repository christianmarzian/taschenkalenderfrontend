<template>
<div class="card">
  <div class="card-image">
    <a :href="product.slug" :title="`Läs mer om ${product.name}`" >
      <img
        v-if="product.featuredAsset && product.featuredAsset.preview"
        :src="$ensureHttps(product.featuredAsset.preview, 'medium')"
        alt="product.name"
      />
    </a>
  </div>

  <div class="card-content">
    <div class="media">

      <div class="media-content">
        <h4 class="title is-4">{{product.name}}</h4>
      </div>
    </div>

    <div class="content">{{$toSek(product.variants[0].priceWithTax)}}</div>
    <a :href="product.slug" class="button is-pulled-left" style="margin-bottom:10px;">Info</a>
    <IntoCartButton :product="product"></IntoCartButton>
    <div style="clear:both;"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
  }, 

  computed: {
    computedDesignerUrl() {
      let nbadd = (this.product.name.includes("Anteckningsbok")) ? "/Anteckningsbok" : ""
      return `${this.$config.designerurl}${nbadd}?format=${this.$getFacetCode(this.product.facetValues,'DIN-Format')}&covertype=${this.$getFacetCode(this.product.facetValues,'Cover')}`
    }
  }
}
</script>
