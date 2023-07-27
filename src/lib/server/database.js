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
    },
    getParties : async ()=>{
        const result = await fetch(`${PUBLIC_BACK_URL}/sprint/party`)
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            return json;
        })
        return result;
    },
    getComments : async (parent_id, category)=>{
        const result = await fetch(`${PUBLIC_BACK_URL}/sprint/comment?category=${category}&parent_id=${parent_id}`)
        .then((response)=>{
            console.log("🚀 ~ file: database.js:28 ~ .then ~ response:", response)
            return response.json()
            
        })
        .then((json)=>{
            return json;
        })
        return result;
    }
}
export default db