<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h1 class="is-title">Din beställning lyckades</h1>
		<h2 class="subtitle">Ditt ordernummer är {{slug}}</h2>
      </div>
    </div>
  </section>
</template>
<script>
import gql from "graphql-tag";

export default {
  asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },

}
</script>
