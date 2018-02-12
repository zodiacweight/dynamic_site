
const dataStore = initData(), // return getter and setter 
    trans = $("#translation")[0];
// store data in local dictionary
// getData();

// ===============

const { createStore } = Redux,
    reducerSelectsValues = (state = {}, action) => {
        console.log('reducerSelectsValues reducer =>', { state: state, action: action });
        switch (action.type) {
            case 'cancel':
                state = 'canceled';
                return [
                    state
                ]
                break;
            case 'submit':
                state = 'submited';
                return [
                    state
                ]
                break;
            default:
                return state;
        }
    },
    storeSelects = createStore(reducerSelectsValues);

// ===============

function output(fnc, args, color) {
    color ? console.groupCollapsed('%c' + fnc, 'color:' + color) : console.groupCollapsed(fnc);
    console.trace();
    console.log(args);
    console.groupEnd();
}