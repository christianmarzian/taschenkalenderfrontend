<template>
  <div>
    <div class="container">
      
      <div class="centerlogo is-centered">
        <a href="/" title="epical home">
          <img src="@/assets/images/epical.png" alt="epical.me"
        /></a>
      </div>
      <b-navbar>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img class="brandlogo" src="/footer-logo.png" alt="epical.me" />
          </b-navbar-item>
        </template>
        <template #start> </template>

        <template #end>
          <b-navbar-item
            :key="key"
            v-for="(item, key) of navitems"
            tag="nuxt-link"
            :to="item.to"
            class="textitem"
          >
            {{ item.title }}
          </b-navbar-item>
          <b-navbar-item tag="div">
            <CartButton></CartButton>
          </b-navbar-item>
        </template>
      </b-navbar>

      <section class="main-content">
        <div class="container">
          <Nuxt />
        </div>
      </section>
      
      <section class="section"> </section>

    </div>
    <footer class="footer has-background-light">
      <div class="container">
        <div class="columns">
          <div class="column has-text-white">
            <a class="has-text-white" href="/anvandarvillkor">Användarvillkor</a> |
            <a class="has-text-white" href="/personuppgifter">Personuppgifter</a>
          </div>
          <div class="column has-background-dark has-text-light is-one-third">
            <h3 class="title is-1 has-text-light">Din Kalender</h3>
            <ul class="has-text-white" style="list-style-type:'+ ';margin-left:20px;margin-top:-10px;">

              <li>Kraftigt skyddande omslag</li>
              <li>Runda hörn</li>
              <li>Klistermärken ingår</li>
              <li>Snodd och bindning i flera olika färger</li>
              <li>Personligt eller designat omslag</li>
              <li>Temasidor</li>

            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "DefaultLayout",
  data() {
    return {
      navitems: [
        {
          title: "Personal Kalender",
          icon: "home",
          to: { name: "almanacka" },
        },
        {
          title: "Anteckningsbok",
          icon: "lightbulb",
          to: { name: "anteckningsbok" },
        },
      ],
    }
  },
};
</script>

<style lang="scss">
.footer {
  background-image: url("/footer-logo.png");
  background-repeat: no-repeat;
  background-position: -5em 10em;

  //border-radius: 0.3rem 0.3rem 0 0;
}

//@import '~/assets/styles/variables.scss';
.centerlogo {
  position: absolute;
  z-index: 40;
  top: 30px;
  left: 38%;
  img {
    position: relative;
    height: 90px;
  }
}

@media screen and (max-width: 490px) {
  .centerlogo {
    top: 30px;
    left: 30%;
    img {
      height: 70px;
    }
  }

  .brandlogo {
    width:1px;
    min-height:30px;
    opacity:0;
  }
}

@media screen and (min-width: 1280px) {
  .centerlogo {
    left: 40%;
  }
}

.navbar-item {
  & img {
    max-height: 5rem;
    margin-top: 1.5em;
    margin-bottom: 3.5em;
  }
}

.textitem {
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight: 500;
  font-size: 0.7rem;

  &.nuxt-link-exact-active {
    background-color: #fafafa;
  }
}
</style>


