const LOAD = 'transferss/LOAD'
const CREATE = 'transfers/CREATE'
const ERROR = 'transfers/ERROR'
const getTransfers = (list) =>({
    type: LOAD,
    list
})

const postTransfer = (payload) =>({
    type: CREATE,
    payload
})

const errors = (payload) =>({
    type: ERROR,
    payload
})

export const requestTransfers = () => async (dispatch) => {
    const response = await fetch('/api/transfers/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getTransfers(data))
    
}

export const makeTransfers = (sessionId, receiverIdentification, coinAmt, coinId ) => async (dispatch)=> {
    const response = await fetch("/api/transactions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'sender_id': sessionId,
            'receiver_identification': receiverIdentification,
            'coinamt': coinAmt,
            'coin_id': coinId
        }),
    });
    if (data.errors) {
        return data;
    }
    const data = await response.json();
    dispatch(postTransfer(data));
}
const initialState = { list : [] }

const transferReducer = (state= initialState, action)=> {
    switch(action.type){
        case LOAD: {
            const transferList = action.list
            const transferObj = {}
            transferList.map(transfer =>{
                transferObj[transfer.id] = transfer
            })
            
            return { list: transferList, ...transferObj}
        }
        case CREATE: {
            state.list.push(action.payload);
            const newTransferId = action.payload.id;
            const object = {}
            object[newTransferId]= action.payload.id
            return {...state, ...object }
        }
        case ERROR:{
            return {...state, errors: action.payload.errors}
        }    
        default:
            return state;
    }
}

export default transferReducer;