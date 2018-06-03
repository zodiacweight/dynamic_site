const dataStore = initData(), // return getter and setter 
    trans = $("#translation")[0];

// ===============

const { createStore } = Redux,
    reducerSelectsValues = (state = {}, action) => {
        // console.log('reducerSelectsValues reducer =>', { state: state, action: action });
        switch (action.type) {
            case 'cancel': state = 'canceled'; return [state]; break;
            case 'submit': state = 'submited'; return [state]; break;
            default: return state;
        }
    }, storeSelects = createStore(reducerSelectsValues),
    // handle sentence stats
    reducerHandleSentences = (state = {}, action) => {
        const edit = 'edit'
            , addWord = 'add-word'
            , addSentence = 'add-sentence';
        switch (action.type) {
            case edit: state = edit; return [state]; break;
            case addWord: state = addWord; return [state]; break;
            case addSentence: state = addSentence; return [state]; break;
            default: return state;
        }
    }, storeSentences = createStore(reducerHandleSentences);