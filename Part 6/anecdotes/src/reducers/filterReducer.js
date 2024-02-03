const initialState = ''

export const filterAnecdotes = (filterText) =>  {
  return {
    type: 'FILTER', 
    payload: {
      filterText
    }
  }
}

const filterReducer = (state = initialState, action) => {
  switch(action.type){
    case 'FILTER': {
      return action.payload.filterText
    }
    default: {
      return state
    }
  }
}

export default filterReducer