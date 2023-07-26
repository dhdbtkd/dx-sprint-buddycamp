import { PUBLIC_BACK_URL } from '$env/static/public';

const db = {
    getBuddies : async ()=>{
        const result = await fetch(`${PUBLIC_BACK_URL}/sprint/buddy`)
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