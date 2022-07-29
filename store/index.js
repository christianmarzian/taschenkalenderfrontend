export const state = () => ({
    isLoading: false, 
	forceRefresh: false
})

export const mutations = {

    setIsLoading(state, val) {
        state.isLoading = val
    },

	setForceRefresh(state, val) {
        state.forceRefresh = val
    },

}