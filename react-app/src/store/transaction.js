import transferReducer from "./transfer"

const LOAD = 'transactions/LOAD'
const CREATE = 'transactions/CREATE'
const ERROR = 'transactions/ERROR'
const getTransactions = (list) =>({
    type: LOAD,
    list
})

const postTransaction = (payload) =>({
    type: CREATE,
    payload
})

const errors = (payload) =>({
    type: ERROR,
    payload
})

export const requestTransactions = (id) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${id}`, {
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
    if (data.errors) {
        return dispatch(errors(data));
    }
    dispatch(postTransaction(data));
}
const initialState = { list : [] }

const transactionReducer = (state= initialState, action)=> {
    switch(action.type){
        case LOAD: {
            const transactionList = action.list
            const newList = []
            for (const key in transactionList){
                newList.unshift(transactionList[key])
            }
            return { list: newList, ...transactionList}
        }
        case CREATE: {
            state.list.push(action.payload);
            const newTransactionId = action.payload.id;
            const object = {}
            object[newTransactionId]= action.payload.id
            return {...state, ...object }
        }
        case ERROR:{
            return {...state, errors: action.payload.errors}
        }    
        default:
            return state;
    }
}

export default transactionReducer;