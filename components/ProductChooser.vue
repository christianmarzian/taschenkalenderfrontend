<template>
  <section class="section">
    <div class="columns box">
      <div class="column">
        <div class="field">
          <label class="label">Din produkt</label>
          <div class="select">
            <select id="product" name="product" v-model="product">
              <option value="">Almanacka</option>
              <option value="Anteckningsbok">Anteckningsbok</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Önskad storlek</label>
          <div class="select">
            <select id="format" name="format" v-model="format">
              <option value="a4">A4: 210x297 mm</option>
              <option value="a5">A5: 148x210 mm</option>
              <option value="a6">A6: 105 x 148 mm</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <button
            class="button is-primary"
            @click="jetztgestalten()"
            style="margin-top: 32px"
          >
            Börja skapa &gt;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductChooser",
  data() {
    return {
	  product: "",
      format: "a5",
    };
  },

  methods: {
	jetztgestalten() {
		document.location.href=(`${this.$config.designerurl}/${this.product}?format=${this.format}&covertype=sp`)
	}
  }
};
</script>