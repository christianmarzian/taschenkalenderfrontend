<template>
  <div class="container">
    <div class="centerlogo is-centered">
      <a href="/" title="epical home">            <img
          src="@/assets/images/epical.png"
          alt="epical.me"
      ></a>

    </div>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/images/logo-book.png"
                    alt="epical.me"
                >
            </b-navbar-item>
        </template>
        <template #start>


            
        </template>

        <template #end>

            <b-navbar-item :key="key" v-for="(item, key) of navitems" tag="nuxt-link" :to="item.to" class="textitem">
              {{ item.title }}
            </b-navbar-item>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <b-icon icon="cart"/>
                    </a>
                    <a class="button is-light">
                        <b-icon icon="login"/>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>


    <section class="main-content">
      

      <div class="container">
        <Nuxt />
      </div>
    </section>
    <section class="section"></section>
    <footer class="footer has-background-light">
      <div class="columns">
        <div class="column has-text-white">
          <a class="has-text-white" href="/om-oss">Om oss</a> | 
          <a class="has-text-white" href="/leverans">Leverans</a>
        </div>
        <div class="column has-background-dark has-text-light is-one-third" style="margin-right:-0.75em;">
          <h3 class="title is-1 has-text-light">Din Kalender</h3>
          <ul class="has-text-white">
            <li>+ genomskinligt plasthölje</li>
            <li>+ Spiralbindning (tre färger)</li>
            <li>+ Design på 250g kartong</li>
            <li>+ upp till 144 sidor</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
.footer {
  background-image:url('/footer-logo.png');
  background-repeat: no-repeat;
  background-position: -5em 10em;

  border-radius: 0.3rem 0.3rem 0 0;
}

//@import '~/assets/styles/variables.scss';
.centerlogo {
  position:absolute;
  z-index:70;
  top:20px;
  left:38%;
  img {
    position:relative;
    height:90px;
  }
}

@media screen and (max-width: 490px) {
  .centerlogo {
    top:30px;
    left:30%;
    img {
      height:70px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .centerlogo {
    left:40%;
  }
}



.navbar-item {
  & img {
    max-height: 3rem;
    margin-top:1.8em;
    margin-bottom:1.5em;
  }
}

.textitem {
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight:500;
  font-size:0.7rem;

  &.nuxt-link-exact-active {
    background-color:#fafafa;
  }
}

</style>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      navitems: [
        {
          title: 'Personal Kalender',
          icon: 'home',
          to: { name: 'almanacka' }
        },
        {
          title: 'Anteckningsbok',
          icon: 'lightbulb',
          to: { name: 'anteckningsbok' }
        }
      ]
    }
  }
}
</script>
