<template>
    <b-navbar type="is-primary">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/backend' }">
				<img
					src="/backendlogo.png"
					alt="mein-taschenkalender.com"
					height="28"
				>
            </b-navbar-item>
        </template>
        <template #start>
			<b-navbar-item v-if="$auth.login">
				<p>Hallo {{$auth.user.name}}</p>
			</b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button" @click="logOut()">
                        Abmelden
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
	methods: {
		logOut() {
			this.$auth.logout().then(()=> this.$router.push('/backend/login'))
		}
	}
}
</script>