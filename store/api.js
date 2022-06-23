export const state = () => ({
	apitest: "Mein Wert",
	ergebnis: "Ergebnis"
})

export const mutations = {
	increment(state) {
		state.apitest++
	},

	SET_APITEST(state, val) {
		state.apitest = val
	},

	SET_ERGEBNIS(state, val) {
		state.ergebnis = val
	}
}

export const actions = {
    async testcall({ commit }) {
		commit('SET_ERGEBNIS', await apiCall("/orders/d37f9f363e9591e9/totalprice"))
    },
}

async function apiCall(path, method = "GET", data = false) {
	const apiserver = (process.env.NODE_ENV === 'production') ? "https://api.mein-taschenkalender.com" : "https://api.mein-taschenkalender.com"
	let url =  (path.includes("http")) ? path : `${apiserver}${path}`

	//console.log(url)
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const requestOptions = {
	  method: method,
	  headers: myHeaders,
	  redirect: "follow",
	};
	if (data) {
	  requestOptions["body"] = JSON.stringify(data);
	}

	const response = await fetch(url, requestOptions);
	console.log(response)
	if (response.ok) {
	  const result = await response.text()
	  return JSON.parse(result)
	} else {
	  return false
	}
  }