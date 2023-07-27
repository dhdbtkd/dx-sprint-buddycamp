<script>
	import { flip } from "svelte/animate";
	import { crossfade } from "svelte/transition";
	import Party from './Party_card.svelte';
	import { quintOut } from 'svelte/easing';
	import { parties } from "$lib/store";

	export let data;
	console.log("🚀 ~ file: +page.svelte:9 ~ data:", data.parties)
	let selectedSido;
	$: parties.set(data);
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

<div class="mt-12 py-4 px-3 flex justify-between items-center">
	<div>모임 리스트</div>
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
	</div>
</div>
<div class="overflow-scroll mb-20">
    {#each data.parties.data.filter((party)=>{
			return (party.sido == selectedSido || selectedSido == "-1")
	}) as party, index (party.id)}
	<a href={`/party/${party.id}`}
	in:receive={{ key: party.id }}
	out:send={{ key: party.id }}
	animate:flip={{duration:250}}>
		<Party si_code={data.siCode} party={party}/>
	</a>
		
    {/each}
	
</div>
