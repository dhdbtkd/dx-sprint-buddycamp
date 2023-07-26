import { BACK_URL } from '$env/static/private';

const db = {
    getBuddies : async ()=>{
        const result = await fetch(`${BACK_URL}/sprint/buddy`)
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            return json;
        })
        return result;
    }
}
export default db