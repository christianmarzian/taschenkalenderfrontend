<template>
  <div>

<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form class="box" @submit.prevent="userLogin">
            <div class="field">
              <label for="" class="label">Benutzer</label>
              <div class="control has-icons-left">
				  <b-icon
                icon="account"
                size="is-small">
            </b-icon>
                <input type="text" class="input" required v-model="login.username">

              </div>
            </div>
            <div class="field">
              <label for="" class="label">Passwort</label>
              <div class="control has-icons-left">
				                  <b-icon
                icon="lock"
                size="is-small">
            </b-icon>
                <input type="password" placeholder="*******" class="input" required v-model="login.password">
              </div>
            </div>
            <div class="field">
              <button class="button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>



  </div>
</template>

<script>
export default {

	layout: 'empty', 
	//auth: false,

  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })

      } catch (err) {
        console.log(err)
		this.$buefy.toast.open("Login nicht erfolgreich. Bitte nochmal versuchen.")
      }
    }
  }
}
</script>