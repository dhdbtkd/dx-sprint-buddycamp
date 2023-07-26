
<script>
	import { onMount } from "svelte";
	import { PUBLIC_BACK_URL } from '$env/static/public';

	let address, coord, add_1depth, add_2depth, bcode;
	let name, position, workYear, introduce;
	let si_code;
	const openDaumSearch = ()=>{
		new daum.Postcode({
			oncomplete: function(data) {
				address = data.address;
				bcode = data.bcode;
				getGeocodeKakao(address);
			}
		}).open();
	}
	
	let randomAvatar = [];
	let selectedAvatar;
	const getRandomInt=(min, max)=>{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	for(let i = 0;i<5;i++){
		let randomNumber = getRandomInt(1,105);
		while(randomAvatar.includes(randomNumber)){
			randomNumber = getRandomInt(1,105);
		}
		randomAvatar.push(`/avatar/peep-${randomNumber}.png`);
	}
	
	const getGeocodeKakao = (address)=>{
		fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,{
			headers : {
				"Authorization" : "KakaoAK f6a97ac96924a52574ccb7e805ce61df"
			}
		})
		.then((response)=>{
			console.log("🚀 ~ file: +page.svelte:22 ~ .then ~ response:", response)
			return response.json()
		})
		.then((json)=>{
			console.log("🚀 ~ file: +page.svelte:25 ~ .then ~ json:", json)
			if(!json) return
			const address = json.documents[0].address;
			coord = [address.x, address.y];
			add_1depth = address.region_1depth_name;
			add_2depth = address.region_2depth_name;
			bcode = address.b_code;
		})
	}
    const submitForm = ()=>{
		if(!name){
			alert("이름 미지정");
			return
		}
		if(position === "0"){
			alert("포지션 미지정");
			return
		}
		if(!workYear){
			alert("경력 미지정");
			return
		}
		if(!introduce){
			alert("한줄소개 미지정");
			return
		}
		if(!address){
			alert("주소 미지정");
			return
		}
		if(!selectedAvatar){
			alert("프로필 이미지 미지정");
			return
		}
		const data = {
			name : name,
			position : position,
			workYear : workYear,
			introduce : introduce,
			address : address,
			coord_x : coord[0],
			coord_y : coord[1],
			add_1depth : add_1depth,
			add_2depth : add_2depth,
			avatar_path : selectedAvatar,
			bcode : bcode
		}
		fetch(`${PUBLIC_BACK_URL}/sprint/buddy/add`,{
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
				location.href="/search"
			} else {
				alert("error");
			}
			console.log("🚀 ~ file: +page.svelte:72 ~ .then ~ json:", json)
		})
	}
</script>
<div class="mt-12 mb-20 p-3">
	<div class="font-bold my-3">버디 등록</div>
	<div>
		<form on:submit={()=>{submitForm()}}>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<label
						for="first_name"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label
					>
					<input
						type="text"
						bind:value={name}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="이름"
						required
					/>
				</div>
				<div>
					<label
						for="countries"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>포지션</label
					>
					<select
						bind:value={position}
						id="countries"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					>
						<option value="0" selected>포지션 선택</option>
						<option value="1">개발자</option>
						<option value="2">디자이너</option>
						<option value="3">기획자</option>
					</select>
				</div>
				<div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>경력</label
					>
					<input
						type="number"
						bind:value={workYear}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="숫자만 입력"
						required
					/>
				</div>
				<div>
					<label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>한줄소개</label
					>
					<input
						type="text"
						bind:value={introduce}
						maxlength="150"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="나를 어필할 수 있는 한 줄 소개"
						required
					/>
				</div>
				<div>
					<label for="website" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
						>활동지역</label
					>
					<span class="text-xs text-gray-700 mb-2">
						* 상세주소는 없음
					</span>
					<input on:click={()=>{openDaumSearch()}}
						type="text"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly
						placeholder="활동지역 검색" bind:value={address}
						required
					/>
				</div>
				<div>
					<label for="website" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
						>프로필</label
					>
					<div class="flex">
						{#each Array(5) as _, index (index)}
						
						<label class="w-1/5 mx-1">
							<input class="hidden" type="radio" bind:group={selectedAvatar} name="avatar" value={randomAvatar[index]}>
							<div value="index" class={selectedAvatar==randomAvatar[index]?"w-full rounded-lg border border-gray-400 bg-gray-200":"w-full rounded-lg border border-gray-400"}>
								<img class="w-full" src={randomAvatar[index]}>
							</div>
						</label>
						{/each}
					</div>
				</div>
				
			</div>
			<button
				type="submit"
				class="text-white bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
				>등록</button
			>
		</form>
	</div>
</div>
