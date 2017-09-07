// Admin actions
export function checkAdmin(user) {
    return {
        type: "CHECK_USER",
        payload: user
    }
}

// User actions
export function addUser(user) {
    return {
        type: "ADD_USER",
        payload: user
    }
}

export function deleteUser(id) {
    console.log("Delete function called");
    return {
        type: "DELETE_USER",
        payload: id
    }
}

export function editUser(user) {
    console.log("Edit function called");
    return {
        type: "EDIT_USER",
        payload: user
    }
}

export function searchUser(user) {
    return {
        type: "SEARCH_USER",
        payload: user
    }
}

export function resetUser() {
    return {
        type: "RESET_USER",
        payload: {}
    }
}