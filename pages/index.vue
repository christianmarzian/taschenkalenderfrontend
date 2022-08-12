<template>
  <div>
  <div class="container" id="bigpicture">
    <div class="container has-text-centered is-vcentered">
      <h1 class="title">En unik<br>Kalender</h1>
      <br>
      <a href="/create" class="button is-black is-medium title">Börja Skapa</a>
      <br>
                
    </div>
            
  </div>
    

  <section class="section">
    <section class="section"></section>
    <section class="section"><h2 class="subtitle has-text-centered">Personliga almanackor och anteckningsböcker</h2></section>
    <div class="columns is-mobile">

     
    </div>
  </section>

  <CategoryProducts collectionslug="personligkalender"></CategoryProducts>

  <CategoryProducts collectionslug="anteckningsbok"></CategoryProducts>

  <section class="section">
    <div class="container">
      <div class="columns box">
        <div class="column">
          <video autoplay="autoplay" id="herovideo" loop="true" muted="true" width="100%"><source src="https://www.mein-taschenkalender.com/hero-video.mp4" type="video/mp4"></video>
        </div>
        <div class="column">
          <h2 class="subtitle"> Kalendern som är lika unik som du</h2>
          <ul class="list">
            <li>Skriv en personlig hälsning på den första sidan i din kalender.</li>
            <li>Använd olika layouter, typsnitt och färger</li>
            <li>Välj slutsidor till din kalender och skräddarsy din design</li>
          </ul>
          <p>
            <br>
            <a class="button" href="/personligalmanacka">
              <span class="is-hidden-mobile">Läs mer om hur du skapar din kalender</span>
              <span class="is-hidden-tablet">Läs mer</span>
              <span class="icon is-small"><i class="mdi mdi-arrow-right"></i></span></a>

          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">

    <div class="columns is-multiline">

      <div class="column is-one-third"          
        v-for="product in products.items"
        :key="product.id"
        :title="product.name">
        <ProductCard :product="product"></ProductCard>
      </div>

    </div>
  </section>

  </div>
</template>

<style lang="scss">
#bigpicture {
  height:500px;
  //background: url('@/assets/images/bigpicture.jpg') center / cover;
  background: url('https://backend.epical.me/assets/preview/b6/herobanner_1344x600__preview.jpg?preset=full') center / cover;

  .container {
    padding-top:140px;
  }
}
</style>

<script>
import gql from "graphql-tag";
export default {
  name: 'IndexPage',

  apollo: {
    products: {
      query: gql`
      query {
        products(
          options: {
            filter: { slug: { in: ["penna", "pennhallare", "klistermarken"] } }
          }
        ) {
          items {
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
              id
              sku
              priceWithTax
            }
          }
          totalItems
        }
      }
      `
    }
  },
}

</script>
