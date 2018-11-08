class Data {
    constructor() {
        this._news = {},
        this._stocks = []
    }

    get news() {
        return this._news;
    }
    
    set news(data) {
        this._news = data;   
    }

    get stocks() {
        return this._stocks;
    }
    
    set stocks(data) {
        this._stocks = data.reduce((result, input) => {
            if(!result[input.identifier]) {
                result[input.identifier] = { [input.item.trim()]: input.value }
            } else {
                const current = result[input.identifier]
                result[input.identifier] = { ...current, [input.item.trim()]: input.value }
            }
            return result;
        }, {})
    }
}

const MemoryData = new Data();
module.exports = MemoryData;
