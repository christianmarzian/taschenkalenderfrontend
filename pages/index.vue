<template>
  <div>
  <div class="container" id="bigpicture">
    <div class="container has-text-centered is-vcentered">
      <h1 class="title is-size-1-mobile">En unik<br>personlig Kalender</h1>
      <br>
      <a href="/create" class="button is-black is-medium title">Börja Skapa</a>
      <br>
                
    </div>
            
  </div>

  <section class="section">
    <h2 class="subtitle has-text-centered">Personliga almanackor och anteckningsböcker</h2>
    <h5 class="title is-4 has-text-centered" style="text-transform:uppercase">Den bästa kreatören är du</h5>
  </section>

  <ProductChooser></ProductChooser>

  <CategoryProducts collectionslug="personligkalender"></CategoryProducts>

  <CategoryProducts collectionslug="anteckningsbok"></CategoryProducts>

  <section class="section">
    <div class="container">
      <div class="columns box">
        <div class="column">
          <!--<video autoplay="autoplay" id="herovideo" loop="true" muted="true" width="100%"><source src="https://www.mein-taschenkalender.com/hero-video.mp4" type="video/mp4"></video>-->
          <img src="https://picsum.photos/400/300"/>
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
    <div class="content">
      <p>Personlig kalender för planering, anteckningsbok för noteringar. Designa ditt omslag, skräddarsy innehållet i din kalender och lägg till moduler. Med Epicals personliga kalendrar och anteckningsböcker erbjuds du många möjligheter och tillval helt efter dina egna önskemål. Vill du ha boxar med to-do listor för att förenkla vardagen? Eller ha koll på månens faser? Med kalenderns moduler kan du följa upp träning, jobb och mycket annat. Din personliga kalender rymmer allt och du kan enkelt skapa en egen unik design för din kalender.</p>
      <p>Din personliga omslagsdesign är skyddad av ett genomskinligt plastskydd som gör din kalender tålig. Vid design av kalender och anteckningsbok finns möjligheten att välja färg på spiralbindningen som håller ihop din design. Spiralen är tillverkad i metall och kommer i färgerna svart, vit och guld.</p>
      <p>Med tillbehör blir planeringen och anteckningarna mycket roligare. Genom att dekorera din personliga kalender med klistermärken blir den både snygg och unik. Våra klistermärken är unikt designade för Epical Me och tar din kalender och din anteckningsbok till nya höjder. Klistermärkena är motiverande, roliga och garanterade glädjespridare.</p>
      <p>För att du ska få ut precis det du önskar och behöver av våra kalendrar och anteckningsböcker finns också pennor och pennhållare som tillbehör. Epical Me’s pennor är idealiska för din kalender. Med Uni Pin Fine Line pennorna skriver du med precision och pennorna vilar skönt i handen vilket ger dig en behaglig skrivupplevelse. Är du en sådan person som ändrar dig ofta eller skriver fel ibland? Med våra FriXion pennor är detta inga problem då pennorna har en outslitlig radertopp som du enkelt genom friktion suddar bort din text. Lägg till en pennhållare för att hålla din nya favoritpenna på plats i din kalender. Pennhållarna finns i många färger så att du enkelt kan matcha din design. Du stänger din kalender enkelt med en snodd som du väljer till, snoddarna är flexibla, kommer i fler färger och stänger din kalender med stil.</p>
    </div>
  </section>

  <section class="section">

    <div class="columns is-multiline">

      <div class="column is-one-quarter-desktop is-one-third-tablet"
        v-for="product in products.items"
        :key="product.id"
        :title="product.name">
        <ProductCard :product="product"></ProductCard>
      </div>

    </div>
  </section>

  <Newsletter></Newsletter>

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
            filter: { slug: { in: ["penna", "penna-fineline-4pack", "pennhallare", "klistermarken"] } }
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
