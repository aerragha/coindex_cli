const KeyManager = require('../lib/KeyManager')
const CryptoAPI = require('../lib/CryptoAPI')

const check = {
    async price(cmd) {
        try {
            const keyManager = new KeyManager()
            const key = keyManager.getKey()

            const api = new CryptoAPI(key)

            const priceOutputData = await api.getPriceDate(cmd.coin, cmd.cur)

            console.log(priceOutputData)
        } catch (e) {
            console.error(e.message.red)
        }
    }
}

module.exports = check