<script>
	import { PUBLIC_BACK_URL } from '$env/static/public';
	export let data;
	let party_title, party_intro, selectedSido, party_num, hashtag;
	let hashtagArr = [];
	let positions=[];
	const checkboxInputStyle = "mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
	const splitHashtag = ()=>{

	}
	$: if(hashtag){
		if(hashtagArr.length<4){
			let temp;
			if(hashtag.charAt(0) === '#') {
				temp = hashtag.substr(1);
			}
			temp = temp.replace(" ","");
			hashtagArr = temp.split("#");
		} else {
			hashtagArr.pop();
		}
		
	}
	const submitForm = ()=>{
		if(!party_title){
			alert("이름 미지정");
			return
		}
		if(positions.length === 0){
			alert("포지션 미지정");
			return
		}
		if(!party_num){
			alert("모집인원 미지정");
			return
		}
		if(!party_intro){
			alert("모임소개 미지정");
			return
		}
		if(selectedSido == -1){
			alert("지역 미지정");
			return
		}
		const data = {
			title : party_title,
			introduce : party_intro,
			sido : selectedSido,
			number : party_num,
			positions : positions
		}
		fetch(`${PUBLIC_BACK_URL}/sprint/party/add`,{
			method : "post",
			body : JSON.stringify(data),
			headers : {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
			}
		})
		.then((response)=>{
			return response.json()
		})
		.then((json)=>{
			if(json.result){
				location.href="/party"
			} else {
				alert("error");
			}
		})
	}
</script>
<div class="mt-12 mb-20 p-3">
	<!-- <div class="font-bold my-3">모임 열기</div> -->
	<div>
		<form on:submit={submitForm}>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<div class="text-gray-600 mb-2">
						모임 정보
					</div>
					<label
						for="first_name"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">모임명</label
					>
					<input
						bind:value={party_title}
						type="text"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="이름"
						required
					/>
				</div>
				<div>
					<label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>모임목적</label
					>
					<input
						bind:value={party_intro}
						type="text"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="무엇을 위한 모임인가요?"
						required
					/>
				</div>
				<div>
					<label
						for="countries"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">활동지역</label
					>
					<div class="flex">
						<select bind:value={selectedSido}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option selected value="-1">전체</option>
							{#each data.siCode as code, index (index)}
							<option value={code.code}>{code.name}</option>
							{/each}
						</select>
                        
					</div>
				</div>
				<div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>모집인원</label
					>
					<input
						bind:value={party_num}
						type="number"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="모집인원"
						required
					/>
				</div>
				<div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>모집 포지션</label
					>
					<div class="flex justify-between">
						<div class="flex items-center">
							
							<label
								class="flex items-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								<input
								bind:group={positions}
								type="checkbox"
								value="1"
								class={checkboxInputStyle}
							/>개발자</label
							>
						</div>
						<div class="flex items-center">
							
							<label
								class="flex items-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								<input
								bind:group={positions}
								type="checkbox"
								value="2"
								class={checkboxInputStyle}
							/>디자이너</label
							>
						</div>
						<div class="flex items-center">
							
							<label
								class="flex items-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								<input
								bind:group={positions}
								type="checkbox"
								value="3"
								class={checkboxInputStyle}
							/>기획자</label
							>
						</div>
					</div>
				</div>
				<!-- <div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>해시태그(#)</label
					>
					<input
						on:change={splitHashtag}
						bind:value={hashtag}
						type="text"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="해시태그"
						required
					/>
					{#if hashtag}
					<div class="mt-2">
						{#each hashtagArr as tag, index (index)}
							<span class="px-2 mx-1 py-0.5 rounded-full bg-blue-300 text-xs">
								{tag}
							</span>
						{/each}
					</div>
					{/if}
				</div>
			</div> -->
			<button
				type="submit"
				class="text-white bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
				>등록</button
			>
		</form>
	</div>
</div>