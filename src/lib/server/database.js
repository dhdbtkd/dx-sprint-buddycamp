const db = {
    getBuddies : async ()=>{
        const result = await fetch("http://localhost:3000/sprint/buddy")
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