<script>
    import { PUBLIC_BACK_URL } from '$env/static/public';
    
    let id, pw='', pw2='';
    $: pwLength=pw.length;
    $: pw2Length=pw2.length;
    let pwSame;
    let pwValid;
    const validForm = ()=>{
        const checkEmail = validateEmail();
        if(!checkEmail){
            alert("유효하지 않은 이메일");
            return false;
        }
        const checkPw = validatePw();
        if(!checkPw){
            alert("유효하지 않은 비밀번호")
            return false;
        }
        return true;
    }
    const validateEmail = () => {
        if(id.includes("@")) return true;
        return false;
    }
    const validatePw = (e)=>{
        if(pw===pw2){
            
            pwSame = true;
        } else {
            pwSame = false;
        }
        return pwSame;
        
    }
    const fetchSignup = ()=>{
        const checkForm = validForm();
        if(!checkForm) return;
        const data =  {
                id : id,
                pw : pw,
            };
        fetch(`${PUBLIC_BACK_URL}/sprint/user/signup`,{
            method : "POST",
            body : JSON.stringify(data),
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((result)=>{
            console.log("🚀 ~ file: +page.svelte:13 ~ .then ~ result:", result)
            return result.json();
        })
        .then((json)=>{
            console.log("🚀 ~ file: +page.svelte:16 ~ .then ~ json:", json)
        })
    }
</script>
<div class="flex h-full">
    <div class="w-full md:w-1/2 px-5 py-6 select-none">
        <div class="text-2xl font-bold text-center my-16">
            회원가입
        </div>
        <div class="px-6">
            <div class="mb-6">
                <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                <input type="email" bind:value={id} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="mb-6">
                <label for="pw" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                <input type="password" bind:value={pw} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" on:input={validatePw}>
            </div>
            <div class="mb-12">
                <label for="pw2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 재확인</label>
                <input type="password" bind:value={pw2} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" on:input={validatePw}>
                {#if !pwSame && pwLength>0 && pw2Length>0}
                    <span class="text-xs text-rose-500">비밀번호가 일치하지 않습니다.</span>
                {/if}
            </div>
            
            <div class="rounded-lg text-center bg-slate-900 py-2 text-white font-bold cursor-pointer duration-300 hover:bg-slate-600 mb-6" on:click={()=>{fetchSignup()}}>
                회원가입
            </div>
            <div class="flex justify-between text-xs text-slate-600">
                <div>
                    이미 회원이라면
                    <a href="/login" class="font-bold underline cursor-pointer hover:text-slate-900 duration-300"  >
                        로그인
                    </a>
                </div>
            </div>
        </div>
        
        <div>

        </div>
    </div>
    <div class="md:block hidden w-1/2 bg-cover" style="background-image:url('1.jpg')">

    </div>
</div>