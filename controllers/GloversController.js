let glovers = {}

class GloversController {
	list(){
		return glovers
	}
	add(data){
		if(data.name && (data.name.length > 1)){
			const gloverId = +new Date()
			glovers[gloverId] = {
				name: data.name,
				id: gloverId
			}
			return this.ok()
		} else {
			throw "Provide name for the glover"
		}
	}

	delete(gloverId){
		if(glovers[gloverId]){
			delete glovers[gloverId]
			return this.ok()
		} else {
			throw `Glover with id=${gloverId} not found`
		}
	}

	ok(){
		return {status: 'ok'}
	}
}

module.exports = new GloversController()