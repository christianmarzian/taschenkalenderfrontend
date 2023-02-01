export default (context, inject) => {


	const toEur = (intprice) => {
		return String(parseFloat(intprice) / 100.0).replace(".", ",") + " €"
	}
	inject('toEur', toEur)

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
		if (process.env.NODE_ENV !== 'production') {
			return url + "?preset=" + mode
		} else {
			return url.replace("http://", "https://").replace("localhost:3001", "backend.mein-taschenkalender.com") + "?preset=" + mode
		}
		
	}
	inject('ensureHttps', ensureHttps)

	const resizedImg = (server, path, size="small", withoutid=false, counter='nocounter') => {
		try {
			const addcounter = counter != 'nocounter' ? '-' + counter : ''
			const addid = withoutid ? '' : "?id=e9a7a2b220cb1f1c"
			const resize = (size == "original" || size == false) ? "" : size + "_"
			const replace = (size == "original" || size == false) ? ".pdf" : addcounter + ".jpg"
			const patharray = path.split("/")
			const imageFile = patharray.pop().replace(".pdf", replace)
			const imagePath = patharray.join("/")
			return server + imagePath + "/" + resize + imageFile + addid;
		} catch(e) {
			console.log(e)
			return "/blank.gif"
		}

	}
	inject('resizedImg', resizedImg)

}