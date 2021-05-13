const LOAD = 'coins/LOAD'
const ONE = 'coins/ONE'
const USER = 'coins/USER'
const SPARK = 'coins/SPARK'

const getCoins = (list) =>({
    type: LOAD,
    list
})

const getUserCoins = (list) =>({
    type: USER,
    list
})

const getOneCoin = (payload) =>({
    type: ONE,
    payload
})

const getSparkline = (payload) => ({
    type: SPARK,
    payload
})


export const requestCoins = () => async(dispatch)=> {
    const response = await fetch('https://api.nomics.com/v1/currencies/ticker?key=2dea8624d0f169a05115d37d8ed28cc2&ids=BTC,ETH,XRP,ADA,XLM,LTC,UNI,ETC,AAVE,ATOM,DOGE,TRX&interval=1d,7d,30d,365d,ytd&convert=USD&per-page=100&page=1')
    const coins = await response.json()
    dispatch(getCoins(coins))
}

export const requestUserCoins = (userId) => async(dispatch)=> {
    const response = await fetch(`/api/vault-coins/${userId}`)
    const coins = await response.json()
    dispatch(getUserCoins(coins))
}

export const requestOneCoin = (symbol) => async(dispatch) => {
    console.log(symbol)
    const response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=2dea8624d0f169a05115d37d8ed28cc2&ids=${symbol}&interval=1h,1d&convert=USD&per-page=100&page=1`,
    {
        mode: 'no-cors'
    })
    const coin = await response.json()
    dispatch(getOneCoin(coin))
}
export const requestSparklineWeekly = (symbol) => async(dispatch) =>{
    const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${symbol}&market=USD&apikey=4EVCTZM7MXVNN237`)
    const coins = await response.json();
    console.log(coins)
    dispatch(getSparkline(coins))
}

export const requestSparklineDaily = (symbol) => async(dispatch) =>{
    const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=USD&apikey=4EVCTZM7MXVNN237`)
    const coins = await response.json();
    console.log(coins)
    dispatch(getSparkline(coins))
}

export const requestSparklineMonthly = (symbol) => async(dispatch) =>{
    const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${symbol}&market=USD&apikey=4EVCTZM7MXVNN237`)
    const coins = await response.json();
    console.log(coins)
    dispatch(getSparkline(coins))
}

export const requestSparklineOneDay = (symbol) => async(dispatch) =>{
    const response = await fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=USD&interval=30min&apikey=4EVCTZM7MXVNN237`)
    const coins = await response.json();
    console.log(coins)
    dispatch(getSparkline(coins))
}

export const requestSparklineIntraDay = (symbol) => async(dispatch) =>{
    const response = await fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=USD&interval=5min&apikey=4EVCTZM7MXVNN237`)
    const coins = await response.json();
    console.log(coins)
    dispatch(getSparkline(coins))
}

const initialState = {list: [], userCoins: [], coin: null, spark: null, oneDay: null}

const coinReducer = (state=initialState, action) => {
    console.log(action)
    switch(action.type) {
        case LOAD: {
            const coinList = action.list
            console.log(coinList)
            const coinObj = {}
            coinList.map(coin =>{
                coinObj[coin.id] = coin
            })
            
            return { userCoins: state.userCoins, ...coinObj, list: coinList, coin: state.coin, spark: state.spark, oneDay:state.oneDay}
        }
        case ONE: {
            const coin = action.payload[0];
            console.log(coin)
            return {...state, coin: coin}
        }
        case USER: {
            const coinList = action.list
            const newList = []
            for (const key in coinList){
                newList.push(coinList[key])
            }
            return { ...state, userCoins: newList}
        }
        case SPARK:{
            return{...state, spark: action.payload}
        }
        default: 
            return state;
    }
}

export default coinReducer;