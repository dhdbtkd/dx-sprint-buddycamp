import { json } from '@sveltejs/kit';
export async function GET() {
	const nickName = await fetch("https://nickname.hwanmoo.kr/?format=json&count=1&max_length=6")
	
	.then((response)=>{
		return response.json()
	})
	.then((json)=>{
		return json
	})
    console.log("🚀 ~ file: +server.js:3 ~ GET ~ nickName:", nickName)
	return json(nickName);
}
