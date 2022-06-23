<template>
  <div class="container">

    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/images/epical-logo.png"
                    alt="epical.me"
                >
            </b-navbar-item>
        </template>
        <template #start>

            <b-navbar-item :key="key" v-for="(item, key) of navitems" tag="nuxt-link" :to="item.to" class="textitem">
              {{ item.title }}
            </b-navbar-item>
            
        </template>

        <template #end>
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
  </div>
</template>

<style lang="scss">
//@import '~/assets/styles/variables.scss';
.navbar-item {
  & img {
    max-height: 6rem;
  }
}

.textitem {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size:0.8rem;

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
