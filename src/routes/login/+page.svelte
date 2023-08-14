<script>
    import { PUBLIC_BACK_URL } from '$env/static/public';
    import {goto} from '$app/navigation';
    import Util from '$lib/util';

    let id, pw='';
    const fetchLogin = ()=>{
        const checkEmail = validateEmail();
        if(!checkEmail){
            alert("이메일 형식 확인");
            return;
        };
        const data =  {
                id : id,
                pw : pw,
            };
        fetch(`${PUBLIC_BACK_URL}/sprint/user/login`, {
            method : "POST",
            body : JSON.stringify(data),
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((result)=>{
            return result.json()
        })
        .then((json)=>{
            if(json.result){
                // alert("로그인 성공");
                goto('/party')
            } else {
                alert(`로그인 실패 - ${json.msg}`)
            }
        })
    }
    const validateEmail = () => {
        if(id.includes("@")) return true;
        return false;
    }
    const loginValid = ()=>{
        fetch(`${PUBLIC_BACK_URL}/sprint/user/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log("🚀 ~ file: +page.svelte:44 ~ loginValid ~ json:", json)
        });
    }
</script>
<div class="flex h-full">
    <div class="w-full md:w-1/2 px-5 py-6 select-none">
        <div class="text-2xl font-bold text-center my-16">
            로그인
        </div>
        <div class="px-6">
            <div class="mb-6">
                <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                <input type="email" bind:value={id} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="mb-12">
                <label for="pw" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                <input type="password" bind:value={pw} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="rounded-lg text-center bg-slate-900 py-2 text-white font-bold cursor-pointer duration-300 hover:bg-slate-600 mb-6" on:click={()=>{fetchLogin()}}>
                로그인
            </div>
            <div class="flex justify-between text-xs text-slate-600">
                <div>
                    아직 회원이 아니라면
                    <a href="/signup" class="font-bold underline cursor-pointer hover:text-slate-900 duration-300"  >
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="md:block hidden w-1/2 bg-cover" style="background-image:url('1.jpg')">

    </div>
</div>