class Data {
    constructor() {
        this._news = {},
        this._stocks = {},
        this._movies = [],
        this._tv = [],
        this._stocksListPerSocket = {}
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
        }, this._stocks)
    }

    get movies() {
        return this._movies;
    }

    set movies(data) {
        this._movies = data;   
    }

    get tv() {
        return this._tv;
    }

    set tv(data) {
        this._tv = data;   
    }

    getStockListForSocket(socketId, stocksData) {
        if(!this._stocksListPerSocket[socketId]) {
            return {}
        }
        const stocksForSocket = this._stocksListPerSocket[socketId].split(',');
        return stocksForSocket.reduce((result, input) => {
            if(!result[input]) {
                result[input] = stocksData[input];
            }
            return result;
        }, {})
    }

    setStockListForSocket(socketId, data) {
        this._stocksListPerSocket[socketId] = data;   
    }

    removeSocket(socketId) {
        delete this._stocksListPerSocket[socketId];
    }

    getAllSocketsIds() {
        return Object.keys(this._stocksListPerSocket);
    }
}

const MemoryData = new Data();
module.exports = MemoryData;
