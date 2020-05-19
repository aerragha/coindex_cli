const axios = require('axios')
const colors = require('colors')

class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.nomics.com/v1/currencies/ticker'
    }

    async getPriceDate(coinOption, curOption) {
        try {
            // Formatter for currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: curOption
            })

            const res = await axios.get(`${this.baseUrl}?key=${this.apiKey}&ids=${coinOption}&convert=${curOption}`)

            let output = '';

            res.data.forEach((coin, index, array) => {
                output += `Coin: ${coin.symbol.yellow} (${coin.name} | Price: ${formatter.format(coin.price).green}) | Rank: ${coin.rank.blue}`
                if (index !== array.length - 1) output += '\n'
            })

            return output
        } catch (e) {
            handelApiError(e)
        }
    }
}

function handelApiError(e) {
    if (e.response.status === 401) throw new Error('API Key is invalid -- Get a valid key at https://nomics.com')
    else if (e.response.status === 404) throw new Error('API is not responding')
    else throw new Error('Samething is not working')
}

module.exports = CryptoAPI