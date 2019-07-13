// _data/users.js

const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/users'

module.exports = async fetcher => {
	
	let apiData = await axios.get(url).then(
		
		console.log("Grabbed some data...")
    ).catch( err => {
      console.log("An error occurred with the API call:: " + err)
      return err
    } )
    
    return apiData.data
}