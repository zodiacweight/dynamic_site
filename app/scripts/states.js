const dataStore = initData(), // return getter and setter 
    trans = $("#translation")[0];

// ===============

const { createStore } = Redux,
    //
    reducerSelectsValues = (state = {}, action) => {
        // console.log('reducerSelectsValues reducer =>', { state: state, action: action });
        switch (action.type) {
            case 'cancel': state = 'canceled'; return [state]; break;
            case 'submit': state = 'submited'; return [state]; break;
            default: return state;
        }
    }, storeSelects = createStore(reducerSelectsValues),
    // check inputs
    reducerForm = (state = {}, action) => {
        const haveList = 'haveList'
            , haveNewWordBlock = 'haveNewWordBlock';
        switch (action.type) {
            case haveNewWordBlock: state[haveNewWordBlock] = true; return state; break;
            case 'haveNoNewWordBlock': state[haveNewWordBlock] = false; return state; break;
            case haveList: state[haveList] = true; return state; break;
            // explicitly means that we have no list
            case 'haveNoList': state[haveList] = false; return state; break;
            // drop to 'default', so doesn't matter whether we have list
            case 'cancel': state[haveList] = null; return state; break;
            default:
                break;
        }
    }, storeForm = createStore(reducerForm),
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