<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h2 class="is-title">Designs</h2>
      </div>
      <div class="column is-narrow">
        <div class="buttons" style="margin: 1.5rem 0;">
          <b-button type="is-primary" @click="isCreateModalActive = true">
            <b-icon icon="plus-circle" ></b-icon>
            <span>Neu</span>
          </b-button>
        </div>
      </div>
    </div>
    

    <b-table
      :data="isEmpty ? [] : data"
      @page-change="onPageChange"
      :bordered="false"
      :striped="false"
      :narrowed="false"
      :hoverable="false"
      :loading="isLoading"
      :focusable="false"
      :mobile-cards="false"
    >
      <b-table-column v-slot="props" sortable field="favorite" label="Favorit">
        <b-field>
            <b-checkbox disabled :value="props.row.is_favorite"></b-checkbox>
        </b-field>
      </b-table-column>

      <b-table-column v-slot="props" sortable field="din" label="DIN">
        {{ props.row.din }}
      </b-table-column>

      <b-table-column v-slot="props" sortable field="name" label="Name">
        <span :title="props.row.id">{{ props.row.name }}</span>
      </b-table-column>

      <b-table-column v-slot="props" sortable field="category" label="Kategorie">
        {{ props.row.category }}
      </b-table-column>

      <b-table-column label="Umschlag" v-slot="props">
        <a :href="$resizedImg($config.imageapi_url,props.row.coverimage, 'original')" target="_blank">
          <img class="coverimg" :src="$resizedImg($config.imageapi_url,props.row.coverimage)" alt="Umschlag" />
        </a>
      </b-table-column>

      <b-table-column label="Widmung" v-slot="props">
        <a :href="$resizedImg($config.imageapi_url,props.row.dedicationimage, 'original')" target="_blank">
          <img class="coverimg" :src="$resizedImg($config.imageapi_url,props.row.dedicationimage)" alt="Widmung" />
        </a>
      </b-table-column>

      <b-table-column label="Kalender" v-slot="props">
        <a :href="$resizedImg($config.imageapi_url,props.row.contentimage, 'original')" target="_blank">
          <img class="coverimg" :src="$resizedImg($config.imageapi_url,props.row.contentimage)" alt="Kalender" />
        </a>
      </b-table-column>

      <b-table-column sortable field="created_at" label="Erstellt" v-slot="props">
        {{ new Date(props.row.created_at).toLocaleDateString() }}
      </b-table-column>

      <b-table-column v-slot="props" sortable label="Aktiv">
        <b-field>
            <b-checkbox disabled :value="props.row.is_active"></b-checkbox>
        </b-field>
      </b-table-column>

      <b-table-column label="" v-slot="props">
        <div class="buttons">
          <b-button @click="deleteCover(props.row)">
            <b-icon icon="delete" type=""></b-icon>
          </b-button>
        </div>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered" style="height:200px;"></div>
      </template>

    </b-table>

    <b-modal
            v-model="isCreateModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Example Modal"
            close-button-aria-label="Close"
            aria-modal>
            <template #default="props">
              <Uploadimage 
                @close="props.close" 
                model="cover" 
                :allowedTypes="allowedTypes"
                infotext="<p>Die Größe der Bilddatei muss <strong>3591x 2551 Pixel</strong> betragen.
				<br>Dies entspricht DIN-A5 mit umseitig 3mm Beschnitt und 3mm Rücken bei 300dpi. Das Bild wird andernfalls abgeschnitten.</p>"
              ></Uploadimage>
            </template>
        </b-modal>
  </section>
</template>

<script>
import imageapiaxios from "axios";
export default {

  layout: 'backend',

  data() {
    return {
      data: [],
      isEmpty: false,
      isLoading: true,
      isCreateModalActive: false,
      allowedTypes: ["image/jpeg", "image/png"]
    };
  },

  mounted() {
    this.loadAsyncData();
  },

  watch: {
    isCreateModalActive: function (val) {
		if (!val) {
      this.isLoading = true
			//this.loadAsyncData()
      this.$router.go(0)
		}
		},
  },

  methods: {

    async loadAsyncData() {
      this.data = await this.$axios.$get('themes')
      console.log(this.data)
      this.isLoading = false
    },

    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },


    async deleteCover(imgdata) {
      console.log(imgdata)
      this.$buefy.dialog.confirm({
          message: 'Design wirklich löschen?',
          cancelText: 'Doch nicht',
          onConfirm: async () =>  {
            await this.$axios.delete("themes/" + imgdata.id)
            imageapiaxios.post(this.$config.imageapi_url + '/login', this.$config.imageapi_login)
            .then((tres)=> {
              console.log(tres)
              const url = this.$config.imageapi_url + '/' + encodeURIComponent(imgdata.img)
              console.log(url)
              apiaxios.delete(url,{ headers: {Authorization: "Bearer " + tres.data.accessToken} })
            })
            .catch((e)=> {
              console.log(e)
            })
            .finally(()=> {
              this.loadAsyncData()
            })
          }
      })
    }

  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
.coverimg {
  width: 200px;
}
</style>