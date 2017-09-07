import { combineReducers } from 'redux';
import uuid from 'uuid';

let defaultUser = [
    {
        id: uuid.v4(),
        fname: "Tarique",
        lname: "Ejaz",
        state: "West Bengal",
        city: "Kolkata",
        email: "tariqueejaz.93102@gmail.com"
    },
    {
        id: uuid.v4(),
        fname: "Harman",
        lname: "Baweja",
        state: "Maharashtra",
        city: "Mumbai",
        email: "hbaweja2@gmail.com"
    },
    {
        id: uuid.v4(),
        fname: "Arnold",
        lname: "Jones",
        state: "Odisha",
        city: "Bhubaneshwar",
        email: "a.jones122@gmail.com"
    }
];

let admin = {
    email: "m1039130@mindtree.com",
    password: "react201",
    errorMessage: "",
    logValue: false
};

let defaultState=defaultUser;

const usersReducer = (state = defaultUser, action) => {
    switch (action.type) {
        case "ADD_USER":
            state = state.concat(action.payload);
            defaultState = state;
            alert("New user added");
            break;
        case "DELETE_USER":
            let array = state.slice();
            let index = array.findIndex(x => x.id === action.payload); 
            array.splice(index, 1);
            state = array;
            defaultState = state;
            break;
        case "EDIT_USER":
            console.log(action.payload);
            let arr = state.slice();
            for(var i=0; i<arr.length; i++) {
                if(arr[i].id === action.payload.id) {
                    arr[i].fname = action.payload.fname;
                    arr[i].lname = action.payload.lname;
                    arr[i].email = action.payload.email;
                }
            }
            state = arr;
            defaultState = state;
            break;
        case "SEARCH_USER":
            // defaultState = state;
            let arrSearch = state.slice();
            let output = arrSearch.filter((user) => {
                console.log(user);
                return ((user.fname).toLocaleLowerCase() === (action.payload.fname).toLocaleLowerCase() || (user.lname).toLocaleLowerCase() === (action.payload.lname).toLocaleLowerCase() || (user.email).toLocaleLowerCase() === (action.payload.email).toLocaleLowerCase())
            });
            state = output;
            break;
        case "RESET_USER":
            state = defaultState;
            break;
        default:
            return state;
    }
    return state;
};

const adminReducer = (state = admin, action) => {
    switch (action.type) {
        case "CHECK_USER":
            if (action.payload.email === state.email && action.payload.password === state.password) {
                state = {
                    ...state,
                    errorMessage: "",
                    logValue: true
                };
            }
            else {
                state = {
                    ...state,
                    errorMessage: "Enter Correct Credentials",
                    logValue: false
                };
            }
            break;
            default: return state;
    }
    return state;
};

const reducers = combineReducers({
    users: usersReducer,
    admin: adminReducer
})

export default reducers;