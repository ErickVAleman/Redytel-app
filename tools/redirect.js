import Router from "next/router"
/**
 * 
 * @param { String } url
 */
async function redirect(url) {
    try{
        const storageUser = await localStorage.getItem('storeUser');
        const sessionUser = await sessionStorage.getItem('sessionUser');
        if(storageUser || sessionUser){
            return true;
        }
        Router.push(url);
        return false;
    }catch(err){
        console.error(err)
        throw new Error(err)
    }
}
export default redirect