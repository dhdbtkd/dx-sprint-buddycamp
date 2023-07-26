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
				duration: 300,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<div class="mt-12 py-4 px-3 flex justify-between items-center">
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
<div class="overflow-scroll mb-20">
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
	animate:flip={{duration:200}}>
		<Buddy buddy={buddy}/>
	</a>
		
    {/each}
	
</div>
