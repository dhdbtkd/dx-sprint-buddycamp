import { PUBLIC_BACK_URL } from '$env/static/public';

const Util = {
    loginValid : async (token)=>{
        const body_data = {
            jwtToken : token
        }
        const result = await fetch(`${PUBLIC_BACK_URL}/sprint/user/payload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body_data),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            
            console.log("🚀 ~ file: util.js:18 ~ loginValid: ~ json:", json)
            if(json.result){
                return true;
            } else {
                return false;
            }
        });
        return result;
    }
}

export default Util;