<template>
  <section class="section">
    <div class="columns">
      <div class="column" v-if="$route.query.redirect_status != 'failed'">
        <h1 class="is-title">Din beställning lyckades</h1>
		    <h2 class="subtitle">Ditt ordernummer är {{slug}}</h2>
      </div>
    </div>
  </section>
</template>
<script>
import { mapMutations } from "vuex";
import gql from "graphql-tag";

export default {
  asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },

  async mounted() {
    console.log("PARAMS", this.$route.query.redirect_status)
    if (this.$route.query.redirect_status == 'failed') {
      this.$router.push("/cart")
    } else {
      this.setForceRefresh(true)
    }
    
  },

  methods: {
    ...mapMutations(["setForceRefresh"])
  }

}
</script>
