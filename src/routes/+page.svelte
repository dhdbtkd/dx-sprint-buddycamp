<script>
	import lottie from 'lottie-web';
	import { onMount } from 'svelte';
	let btnClass = 'rounded-full text-white bg-blue-500 w-1/2 text-center py-1 my-12 shadow-sm';
    let lottieContainer = [];

    onMount(()=>{
        lottie.loadAnimation({
            container : lottieContainer[0],
            path : "https://lottie.host/378439b1-1ae7-428e-ba95-54fdb64484bc/QaTtVhranK.json"
        })
        lottie.loadAnimation({
            container : lottieContainer[1],
            path : "https://lottie.host/dbe2f614-1f09-4122-9f41-67fa236c3bb0/Py72FKX289.json"
        })
    })
</script>

<div class="flex-1 mt-12 h-full">
	<div class="flex flex-col items-center justify-center h-full">
		<div class="text-center py-8">
			<p>스타트업, 공모전에 관심 있다면?</p>
			<p>기획자, 개발자, 디자이너</p>
			<p>
				<strong>모두</strong> 모이는 곳
			</p>
		</div>
        <div class="w-3/4 my-8" bind:this={lottieContainer[0]}/>
		<a class={btnClass} href="/signup">가입하기</a>
	</div>
	<div class="flex flex-col items-center justify-center my-8 h-full">
		<div class="text-center py-10">
			<p>프로필을 올리고</p>
			<p>마음에 드는 버디들과</p>
			<p>팀을 만들어보세요!</p>
		</div>
        <div class="w-2/3 my-8" bind:this={lottieContainer[1]}/>
		<a class={btnClass} href="/search">프로필 구경하기</a>
	</div>
</div>
