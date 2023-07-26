<script>
	import { buddies_value } from '$lib/store';
	console.log('🚀 ~ file: +page.svelte:3 ~ buddies_value:', buddies_value);
	export let data;
	const buddy = buddies_value.buddies.data.find((buddy) => buddy.id == data.params.slug);
    let comment;
    const submitComment = ()=>{

    }
</script>

<div class="my-14">
	<div class="mx-3 my-6 rounded-lg flex flex-col items-center border-b">
		<div>
			<div class="bg-white w-20 h-20 rounded-full overflow-hidden border shadow">
				<img src={buddy.avatar_path} />
			</div>
		</div>
		<div class="font-bold text-xl my-2">
			{buddy.name}
		</div>
		<div class="flex text-xs w-1/2 justify-between items-center my-1 text-gray-600">
			<div>경력</div>
			<div class="">
				{buddy.work_year}년차
			</div>
		</div>
		<div class="flex text-xs w-1/2 justify-between items-center my-1 text-gray-600">
			<div>포지션</div>
			<div>
				{#if buddy.position == 1}
					개발자
				{:else if buddy.position == 2}
					디자이너
				{:else}
					기획자
				{/if}
			</div>
		</div>
		<div class="flex text-xs w-1/2 justify-between items-center my-1 text-gray-600">
			<div>활동지역</div>
			<div class="">
				{buddy.add_1depth}
				{buddy.add_2depth}
			</div>
		</div>
		<div class="flex text-xs w-1/2 justify-center items-center mt-4 text-gray-600">
			<div>자기소개</div>
		</div>
		<div class="text-sm mt-2 mb-5">
			{buddy.introduce}
		</div>
	</div>
	<div class="mx-2 text-gray-700">
		<div class="text-sm mb-2">댓글</div>
		<div >
			<form on:submit={submitComment}>
				<div
					class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
				>
					<div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
						<label for="comment" class="sr-only">Your comment</label>
						<textarea
                            bind:value={comment}
							rows="2"
							class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
							placeholder="관심을 보내보세요"
							required
						/>
					</div>
					<div class="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
						<button
							type="submit"
							class="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-sky-900 hover:bg-sky-800"
						>
							등록
						</button>
						
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
