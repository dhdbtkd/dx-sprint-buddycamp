<script>
	import lottie from 'lottie-web';
	//swiper
	import Swiper from 'swiper';
	import { Navigation, Pagination } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import { onMount } from 'svelte';
	let btnClass = 'flex items-center justify-center rounded text-white bg-blue-500 px-6 text-center py-3 my-12 shadow-sm text-lg font-bold';
    let lottieContainer = [];
	let device;
	const detectDevice=()=>{
		const userAgent = navigator.userAgent;
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ? 'Mobile' : 'Desktop';
	}
    onMount(()=>{
        lottie.loadAnimation({
            container : lottieContainer[0],
            path : "https://lottie.host/378439b1-1ae7-428e-ba95-54fdb64484bc/QaTtVhranK.json"
        })
        lottie.loadAnimation({
            container : lottieContainer[1],
            path : "https://lottie.host/dbe2f614-1f09-4122-9f41-67fa236c3bb0/Py72FKX289.json"
        });
		const swiper = new Swiper('.swiper', {
			modules: [Navigation, Pagination],
			direction: "vertical",
			mousewheel: {
				releaseOnEdges: true,
			},
			mousewheelControl: true,
			parallax: true,
			speed: 600,
		});
		device = detectDevice();
		console.log("🚀 ~ file: +page.svelte:37 ~ onMount ~ device:", device)
    })
	let datas = {
		alert : [
			"소중한 시간내서 방문해주셔서 감사합니다",
			"현재 데스크톱에서 접속하신 것으로 확인됩니다",
			"모바일 환경에서만 UI가 올바르게 보이도록 개발됐습니다",
			"계속 이용 가능하지만 UI가 옳지 않으므로 양해부탁드립니다"
		],
		page3 : ["주변에서 같이 창업 프로젝트를 할 팀원을 구하고 싶은 기획자 및 개발자",
		"IT 현업자를 목표로 하는 예비 개발자",
		"사이드 프로젝트로 역량을 쌓고 싶은 IT 종사자",
		"개발 스터디가 하고 싶은 대학생, 직장인",
		"창업 관련 부트캠프나 공모전 정보가 필요한 분"
	]
	}
	
</script>
{#if device != "Mobile"}
<div class="flex flex-col justify-center items-center absolute z-30 h-full w-full bg-[#000000dd] text-white text-lg">
	<div class="text-4xl my-10 font-bold">
		BUDDYCAMP
	</div>
	{#each datas.alert as alert, index(index)}
		<p class="my-3">
			{alert}
		</p>
	{/each}
	<div on:click={()=>{device = "Mobile"}} class="bg-orange-400 px-32 py-2 mt-20 rounded text-2xl font-bold hover:cursor-pointer animate-bounce hover:bg-orange-500 hover:scale-125 duration-300">
		Continue
	</div>
</div>
{/if}
<div class="swiper mt-12 mb-20">
	<div class="swiper-wrapper">
		<div class="swiper-slide flex flex-col items-center justify-center h-full px-2">
			<div class="text-center py-8">
				<p class="text-xl font-bold">지역, 소개, 포지션만 입력하면 끝🚀</p>
				<p>만나서 관심사를 이야기하고</p>
				<p>프로젝트를 꾸려보세요</p>
			</div>
			<dotlottie-player autoplay loop mode="normal" src="/main_page1.lottie" class="w-full px-12" />
			<div class="text-center">
				<a class={btnClass} href="/party">
					
					모임 구경하기
					<svg fill="currentColor" class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
				</a>
			</div>
		</div>
		<div class="swiper-slide flex flex-col items-center justify-center h-full px-2">
			<div class="text-center py-5">
				<p>프로필을 올리고</p>
				<p>마음에 드는 버디들과</p>
				<p class="text-2xl font-bold">팀을 만들어보세요👋</p>
			</div>
			<div class="w-1/2 my-8 mx-auto" bind:this={lottieContainer[1]}/>
			<div class="text-center">
				<a class={btnClass} href="/search">
					버디 구경하기
					<svg fill="currentColor" class="ml-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
				</a>
		</div>
		</div>
		<div class="swiper-slide flex flex-col items-center justify-center h-full px-2">
			<dotlottie-player autoplay loop mode="normal" src="/main_page3.lottie" class="w-full px-12" />
			<div class="py-10 px-6">
				<p class="font-bold">이런 분이라면 버디캠프를 잘찾아오셨어요</p>
				<div class="text-sm">
					{#each datas.page3 as text, index}
						<div class="my-2">
							<span class="mr-2">
								✅
							</span>
							{text}
						</div>
					{/each}
				</div>
	
			</div>
		</div>
	</div>
</div>
<style>
	.swiper-slide {
		display: flex !important;
	}
</style>
