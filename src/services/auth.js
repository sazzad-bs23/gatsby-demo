import Cookies from 'js-cookie'

export const getUser = () => {
    const userId = Cookies.get('userId');
    return userId;
}

export const isLoggedIn = () => {
    let user = getUser();
    
    if (user == "" || user == undefined) {
        console.log("Login")
        window.location.replace("https://www.galapagoshealth.com/");
    } else {
        console.log(user + ", Logged In")
    }
}

export const logOut = () => {
    Cookies.remove('userId')
}