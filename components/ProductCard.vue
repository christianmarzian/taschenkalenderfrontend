<template>
<div class="card">
  <div class="card-image">
      <img
        :src="$ensureHttps(item.product.featuredAsset.preview, 'medium')"
        alt="product.name"
      />
  </div>

  <div class="card-content">
    <div class="media">

      <div class="media-content">
        <p class="subtitle is-3">{{item.product.name}}</p>
        
      </div>
    </div>

    <div class="content">{{$toSek(item.priceWithTax)}}</div>
    <div class="columns is-mobile">
      <div class="column">
        <a :href="item.product.slug" class="button">Info</a>
      </div>
      <div class="column has-text-right">
        <a :href="computedDesignerUrl" class="button is-primary">Skapa</a>
      </div>
    </div>
    <div class="content" v-html="item.product.description"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BuefyCard',
  props: {
    item: {
      type: Object,
      required: true
    },
  }, 

  computed: {
    computedDesignerUrl() {
      let nbadd = (this.item.product.name.includes("Anteckningsbok")) ? "/Anteckningsbok" : ""
      return `${this.$config.designerurl}${nbadd}?format=${this.$getFacetCode(this.item.product.facetValues,'DIN-Format')}&covertype=${this.$getFacetCode(this.item.product.facetValues,'Cover')}`
    }
  }
}
</script>
