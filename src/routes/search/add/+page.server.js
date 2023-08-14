import { error, redirect } from '@sveltejs/kit';
import Util from '$lib/util';

export async function  load({cookies, fetch}) {
	const token = cookies.get('jwtToken');
	const isLogin = await Util.loginValid(token);
	if(!isLogin){
		throw redirect(302, '/login');
	}
}