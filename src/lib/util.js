import { PUBLIC_BACK_URL } from '$env/static/public';

const Util = {
    loginValid : async (token)=>{
        const body_data = {
            jwtToken : token
        }
        const result = await fetch(`${PUBLIC_BACK_URL}/sprint/user/payload`, {
            credentials : 'include'
        })
        .then(res => res.json())
        .then(json => {
            
            console.log("🚀 ~ file: util.js:18 ~ loginValid: ~ json:", json)
            if(json.result){
                return true;
            } else {
                // return false;
                return true; //로그인 개발 중 중단으로 login 검증 사실상 필요없도록 함
            }
        });
        return result;
    }
}

export default Util;