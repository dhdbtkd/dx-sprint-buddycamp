<script>
	import { flip } from "svelte/animate";
	import { crossfade } from "svelte/transition";
	import Buddy from './buddy_card.svelte';
	import { quintOut } from 'svelte/easing';
	import { buddies } from "$lib/store";

	export let data;
	let selectedSido;
	let selectedPosition;
	let selectedWorkYear;
	$: buddies.set(data);
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 500,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<div class="relative mt-12 mb-20">
	<div class=" py-4 px-3 flex justify-between items-center">
		<div>버디리스트</div>
		<div class="flex text-xs">
			<div class="mx-2">
				<label class="block mb-2 font-medium text-gray-900 dark:text-white"
					>지역</label
				>
				<select bind:value={selectedSido}
					id="countries"
					class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-r-8 border-transparent"
				>
					<option selected value="-1">전체</option>
					{#each data.siCode as code, index (index)}
					<option value={code.code}>{code.name}</option>
					{/each}
				</select>
			</div>
			<div class="mx-2">
				<label class="block mb-2 font-medium text-gray-900 dark:text-white"
					>포지션</label
				>
				<select bind:value={selectedPosition}
					class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-r-8 border-transparent"
				>
					<option selected value="-1">전체</option>
					<option value="3">기획자</option>
					<option value="1">개발자</option>
					<option value="2">디자이너</option>
				</select>
			</div>
			<div class="mx-2">
				<label for="countries" class="block mb-2 font-medium text-gray-900 dark:text-white"
					>경력</label
				>
				<select
					bind:value={selectedWorkYear}
					class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-r-8 border-transparent"
				>
					<option selected value="-1">전체</option>
					<option value="0-0">신입</option>
					<option value="1-3">1-3년</option>
					<option value="4-6">4-6년</option>
					<option value="7-9">7-9년</option>
					<option value="10-12">10-12년</option>
				</select>
			</div>
		</div>
	</div>
	<div class="overflow-scroll">
		{#each data.buddies.data.filter((buddy)=>{
			if(selectedWorkYear){
				const minWorkYear = selectedWorkYear.split("-")[0];
				const maxWorkYear = selectedWorkYear.split("-")[1];
				return (buddy.bcode.substr(0,2) == selectedSido || selectedSido == "-1") && (buddy.position == selectedPosition || selectedPosition == "-1") && ((buddy.work_year >= minWorkYear && buddy.work_year<= maxWorkYear ) || selectedWorkYear == "-1")
			}
		}) as buddy, index (buddy.id)}
		<a href={`/search/${buddy.id}`}
		in:receive={{ key: buddy.id }}
		out:send={{ key: buddy.id }}
		animate:flip={{duration:300}}>
			<Buddy buddy={buddy}/>
		</a>
	
		{/each}
	</div>
</div>
<div class="absolute bottom-3 right-5 bg-blue-800 rounded-full w-14 h-14 mb-20 text-white flex justify-center items-center shadow-lg">
	<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z"/></svg>
</div>
