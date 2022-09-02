<template>
  <div>
    <section class="section">
      <div class="columns">
        <div class="column">
          <h1 class="title is-1" style="font-weight:400">Skapa en egen snygg personlig kalender</h1>
          <h2 class="subtitle is-3">
            Så här enkelt är det att designa din egen personliga kalender
          </h2>

          <p class="content">
            Här visar vi dig steg för steg hur du använder vårt fantastiska
            verktyg för att i några få enkla steg designa din egen personliga
            kalender. Med Epical Me har det aldrig varit enklare att skapa en
            unik kalender online! Efter att du har valt ditt önskade format,
            kvalitet på ditt omslag samt färger och typsnitt är du redo att
            börja designa innehållet i din kalender!
            
          </p>
          <p>&nbsp;</p>
        </div>
      </div>

      <div class="columns">
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/1-omslag.jpg"
            @click="loadImage('/img/personligalmanacka/1-omslag.jpg')"
            alt="Omslag"
          />
        </div>
        <div class="column">
          <h5 class="title is-4">1. OMSLAGSDESIGN</h5>
          <p>
            Det första steget i ditt skapande är din omslagsdesign.<br />&nbsp;
          </p>
          <h3 class="subtitle is-4">
            Du börjar med att lägga till din text på omslaget
          </h3>
          <p>
            Din text kan du placera på två olika delar av kalendern. I mitten
            placerar du den stora texten som kan vara ditt namn, årtal eller
            annat. Epical Me’s smarta verktyg anpassar texten automatiskt efter
            kalenderns bredd, därför behöver du inte fundera på om din text får
            plats. Med denna automatiska anpassning utnyttjas även omslaget
            optimalt för att du ska få ut så mycket som möjligt av din kalender.
            Längre ner på ditt omslag finns det utrymme för en undertext. Denna
            text kan vara ett citat du gillar, ett motto du strävar efter eller
            något som gör dig motiverad och glad. Du kan välja mellan flera
            olika typsnitt och färger, låt din kreativitet flöda och skapa din
            snyggaste kalender någonsin!
          </p>
        </div>
      </div>

      <div class="columns">
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/2-omslag-design.jpg"
			@click="loadImage('/img/personligalmanacka/2-omslag-design.jpg')"
            alt="Design Omslag"
          />
        </div>
        <div class="column">
          <h3 class="subtitle is-4">
            Välj en av våra färdiga designer till ditt omslag
          </h3>
          <p>
            Det andra steget i ditt skapande är att välja omslag. Det finns
            många fina omslagsdesigner från vår egen kollektion att välja
            mellan. I boxen till höger bredvid omslaget hittar du de olika
            designerna. Välj det omslag som du tycker bäst om och resultatet
            dyker upp direkt på skärmen. För varje design har du även
            möjligheten att välja din egen designs färg och baksida, varför inte
            kombinera dina favoritfärger? Du kan kombinera över 5000 olika
            färger vilket ger dig oändliga möjligheter till att skapa just den
            kalendern du alltid velat ha!
          </p>
          <p>&nbsp;</p>

          <h3 class="subtitle is-4">Ett eget personlig designat omslag</h3>
          <p>
            Din kalender blir helt unik när du skapar en egen design. Gör din
            kalender personlig genom att placera ett foto på ditt omslag. Väljer
            du att skapa en egen design kan du även addera ett foto på baksidan
            av din kalender. Självklart kan du justera storlek på ditt foto så
            att det passar perfekt på ditt omslag.
          </p>

          <p>&nbsp;</p>

          <h3 class="subtitle is-4">En sista touch till din omslagsdesign</h3>
          <p>
            Det sista steget i omslagsdesignen är att välja om du vill ha
            möjligheten att stänga din kalender helt. Detta kan du göra genom
            att addera en av våra snygga snoddar. Välj bland 12 olika färger och
            matcha din kalenders design. I detta sista steg i omslagsdesignen
            väljer du även färg på spiralen på din kalender, du kan välja mellan
            svart, vit eller guld.
          </p>
        </div>
      </div>
    </section>
    <hr/>
    <section class="section">
      <div class="columns">
        <div class="column">
          <h5 class="title is-4">2. DIN UNIKA PERSONLIGA TEXT</h5>
          <p>
            Nu är omslaget färdigt och det är dags att gå vidare och designa
            insidan av din kalender. När du slår upp din kalender möts du av en
            personlig text. Här kan du skriva in information ifall du skulle
            tappa bort din kalender eller kanske en hälsning eller dedikering om
            det är en present till någon. Vill du hellre bli peppad? Skriv in
            ditt favoritcitat, ett motto eller någon mening som gör dig peppad
            och på riktigt bra humör!
          </p>
          <p>
            Du kan justera din text genom att välja ett typsnitt och en textfärg
            som du tycker om eller som passar din design allra bäst. Du kan även
            välja mellan våra olika designer för din förstasida. Här finns både
            bakgrundsbilder och färdiga designer som du själv kan fylla i när
            din kalender anländer hem till dig!
          </p>
        </div>
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/3-min-sida.jpg"
			@click="loadImage('/img/personligalmanacka/3-min-sida.jpg')"
            alt="Min Sida"
          />
        </div>
      </div>
    </section>
    <hr/>
    <section class="section">
      <div class="columns">
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/4-kalender.jpg"
			@click="loadImage('/img/personligalmanacka/4-kalender.jpg')"
            alt="Min Sida"
          />
        </div>
        <div class="column">
          <h5 class="title is-4">3. DITT PERSONLIGA INNEHÅLL</h5>
          <p>
            Nu är din kalender nästan redo! Nu ska du bara välja när du vill att
            din kalender ska starta, ska den starta till hösten eller våren?
            Eller när det blir ett nytt år? Du väljer!
          </p>
          <p>
            Hur ska innehållet se ut? Det finns tre layouter som du kan välja
            mellan:
            <strong>liggande format, kolumner eller anteckningar</strong>.
            Layouten “anteckningar” ger dig möjligheten att bestämma själv hur
            mycket anteckningsutrymme du vill ha på en dubbelsida. Precis som
            när du skapade ditt omslag kan du även här välja din egen design i
            både text, färg och grafik. Med de olika layouterna, färgerna och
            typsnitten har du helt plötsligt oändligt antal kombinationer i ditt
            skapande.
          </p>
        </div>
      </div>
    </section>
    <hr/>
    <section class="section">
      <div class="columns">
        <div class="column">
          <h5 class="title is-4">4. SMÅ MODULER MED STOR EFFEKT</h5>
          <p>Komplettera din kalender med våra moduler.</p>
          <div class="content">
            <ul>
              <li>Aktivera röda dagar</li>
              <li>Lägg till månens faser, stjärntecken och tidslinjer</li>
              <li>
                Har du valt det liggande formatet kan du addera ytterligare en
                kolumn med to-do boxar för att enkelt organisera din vardag.
              </li>
              <li>
                Olika vardagsmoduler ger dig möjligheten att lägga till dagliga
                anteckningar om vädret, data från träningsappar och många fler.
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/5-tillval-kalender.jpg"
			@click="loadImage('/img/personligalmanacka/5-tillval-kalender.jpg')"
            alt="Tillval och moduler"
          />
        </div>
      </div>
    </section>
    <hr/>
    <section class="section">
      <div class="columns">
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/6-personliga-innehall.jpg"
			@click="loadImage('/img/personligalmanacka/6-personliga-innehall.jpg')"
            alt="Din Slutdidor"
          />
        </div>
        <div class="column">
          <h5 class="title is-4">5. DIN SLUTSIDOR</h5>
          <p>
            I kalender ingår upp till 18 kostnadsfria slutsidor. Om du önskar
            addera fler utökar du enkelt antalet sidor och bilagor när du skapar
            dina slutsidor.
          </p>
          <p>
            Med Epical Me finns något som passar alla och du kan designa din
            egen kalender helt efter dina egna önskemål. Är du en som alltid har
            ett block med dig? Det behöver du inte längre då du kan addera
            linjerade eller rutiga sidor i din kalender. Jobbar du som lärare?
            Då tycker vi att du ska spana in våra bilagor speciellt anpassade
            för dig i läraryrket. Du kan även lägga till vanliga bilagor som
            årsöversikt, adresslistor eller sidor för personliga anteckningar.
          </p>
        </div>
      </div>
    </section>
    <hr/> 
    <section class="section">
      <div class="columns">
        <div class="column">
          <h5 class="title is-4">NU ÄR DIN KALENDER KLAR!</h5>
          <p>
            I översikten är alla dina val listade och i förhandsvisningen kan du
            kontrollera att allt ser bra ut. Om allt är korrekt kan du lägga din
            kalender i varukorgen. Skapa fler eller gå direkt till kassan!
          </p>
        </div>
        <div class="column is-narrow is-one-quarter">
          <img
            src="/img/personligalmanacka/thumb/7-oversikt.jpg"
			@click="loadImage('/img/personligalmanacka/7-oversikt.jpg')"
            alt="Tillval och moduler"
          />
        </div>
      </div>
    </section>
    <hr />
    <section class="section">
      <h5 class="title is-4">BÖRJA SKAPA DIN KALENDER</h5>
      <p>
        Nu har du koll på alla bitar i skapandet och du är redo att börja
        designa din egen kalender. Testa dig fram och lära känna vårt
        fantastiska verktyg - du kommer inte ångra dig!
      </p>
      <p>
        <br />
        <a href="/create" class="button is-dark is-medium title"
          >Skapa din kalender</a
        >
      </p>
    </section>

    <div ref="bigimagemodal" class="modal">
      <div class="modal-background"></div>
      <div class="animation-content modal-content" style="max-width: 1024px">
        <p class="image">
          <img ref="bigimage" src="/footer-logo.png" @click="$refs.bigimagemodal.classList.remove('is-active')" />
        </p>
        <button type="button" class="modal-close is-large" @click="$refs.bigimagemodal.classList.remove('is-active')"></button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  head: {
    title: 'Skapa en egen snygg personlig kalender | Epical.me',
    meta: [
      { hid: 'description', name: 'description', 
        content: 'Här visar vi dig steg för steg hur du använder vårt fantastiska verktyg för att i några få enkla steg designa din egen personliga kalender. Beställ enkelt online.'
      }
    ]
  },

  data() {
    return {
      isImageModalActive: false,
    };
  },

  methods: {
    loadImage(el) {
	  this.$refs.bigimage.src=el
      this.$refs.bigimagemodal.classList.add("is-active")
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
</style>