export default (context, inject) => {


	const toSek = (intprice) => {
		return String(parseFloat(intprice) / 100.0).replace(".", ",") + " kr"
	}
	inject('toSek', toSek)

	const getFacetCode = (facets, name) => {
		let facetval = ""
		facets.forEach(el => {
			if (el.facet.name == name) {
				facetval = el.code
			}
		})
		return facetval
	}
	inject('getFacetCode', getFacetCode)

	const ensureHttps = (url, mode = 'large') => {
		//console.log("Mode", mode)
		return url.replace("http://", "https://") + "?preset=" + mode
	}
	inject('ensureHttps', ensureHttps)

}