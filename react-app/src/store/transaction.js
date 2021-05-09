const LOAD = 'transactions/LOAD'
const CREATE = 'transactions/CREATE'

const getTransactions = (list) =>({
    type: LOAD,
    list
})

const postTransaction = (payload) =>({
    type: CREATE,
    payload
})

export const requestTransactions = () => async (dispatch) => {
    const response = await fetch('/api/transactions/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getTransactions(data))
    
}

export const makeTransaction = (coinAmt, fiatPrice, purchase, fiatId, coinId, sessionId) => async (dispatch)=> {
    console.log( 'amount:', coinAmt, 'price:', fiatPrice, 'purchase:', purchase, 'fiatId:', fiatId, 'coinId:', coinId, 'userId:',sessionId)
    const response = await fetch("/api/transactions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            purchase,
            'user_id': sessionId,
            'fiat_id': fiatId,
            'coinamt': coinAmt,
            'fiatprice' : fiatPrice,
            'coin_id': coinId
        }),
    });
    const data = await response.json();
    dispatch(postTransaction(data));
}
const initialState = { list : [] }

const transactionReducer = (state= initialState, action)=> {
    switch(action.type){
        case LOAD: {
            const transactionList = action.list
            const transactionObj = {}
            transactionList.map(transaction =>{
                transactionObj[transaction.id] = transaction
            })
            
            return { list: transactionList, ...transactionObj}
        }
        case CREATE: {
            state.list.push(action.payload);
            const newTransactionId = action.payload.id;
            return {...state, newTransactionId : action.payload }
        }
        default:
            return state;
    }
}

