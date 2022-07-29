export default function({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
        // check if the user is authenticated
        if (store.state.auth.accessToken) {
            // set the Authorization header using the access token
            config.headers.Authorization = 'Bearer ' + store.state.auth.accessToken;
        }

        return config;
    });
}