const LOAD = 'coins/LOAD'
const ONE = 'coins/ONE'
const USER = 'coins/USER'

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

export const requestCoins = () => async(dispatch)=> {
    const response = await fetch('https://api.nomics.com/v1/currencies/ticker?key=2dea8624d0f169a05115d37d8ed28cc2&ids=BTC,ETH,XRP,ADA,XLM,LTC,UNI,ETC,AAVE,ATOM,DOGE,TRX&interval=1d,7d,30d,365d,ytd&convert=USD&per-page=100&page=1')
    const coins = await response.json()
    console.log(coins)
    dispatch(getCoins(coins))
}

export const requestUserCoins = (userId) => async(dispatch)=> {
    const response = await fetch(`/api/vault-coins/${userId}`)
    const coins = await response.json()
    console.log(coins)
    dispatch(getUserCoins(coins))
}

export const requestOneCoin = (symbol) => async(dispatch) => {
    const response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=2dea8624d0f169a05115d37d8ed28cc2&ids=${symbol}&interval=1h,1d,30d,365d,ytd&convert=USD&per-page=100&page=1`)
    const coin = await response.json()
    dispatch(getOneCoin(coin))
}

const initialState = {list: [], userCoins: [], coin: null}

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
            
            return { userCoins: state.userCoins, ...coinObj, list: coinList, coin: state.coin}
        }
        case ONE: {
            const coin = action.payload[0];
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
        default: 
            return state;
    }
}

export default coinReducer;