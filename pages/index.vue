<template>
  <div>
  <div class="container" id="bigpicture">
    <div class="container has-text-centered is-vcentered">
      <h1 class="title is-3">Din<br>personlig Kalender</h1>

            <a href="" class="button is-dark is-inverted is-outlined is-large title">Skapa</a>
            <br>
            <a class="button is-dark is-inverted is-outlined is-small" href="#mehrinfos" >
              <span>Info</span>
              <b-icon icon="chevron-down"/>
            </a>
                
    </div>
            
  </div>
    

  <section class="section">
    <div class="columns is-mobile">

     
    </div>
  </section>

  <CategoryProducts collectionslug="personligkalender"></CategoryProducts>

  <CategoryProducts collectionslug="anteckningsbok"></CategoryProducts>
  </div>
</template>

<style lang="scss">
#bigpicture {
  height:500px;
  background: url('@/assets/images/bigpicture.jpg') center / cover;
  a.button {
    color:black; border: 1px solid black;
  }
  .container {
    padding-top:140px;
  }
}
</style>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

export default {
  name: 'IndexPage',


  beforeMount() {
    this.$store.dispatch('api/testcall')
    this.api.testcall

  },

  computed: {
    ...mapState(["counter","api"]),
  },

  methods: {
    ...mapActions("api",["testcall"]),
    ...mapMutations([
      'increment'
    ])
  }
}
</script>
