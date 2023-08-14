<script>
	import { parties_value } from '$lib/store';
	import { PUBLIC_BACK_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import Util from '$lib/util';
	export let data;
	console.log("🚀 ~ file: +page.svelte:7 ~ data:", data)
	let party, sidoName;
	let isLogin;
	let comment;
	let likeBtn = false;
	let likeNum;


	onMount(async ()=>{
		// isLogin = await Util.loginValid();
		// if(isLogin){
		// 	alert("로그인함");
		// 	if(data.liked){
		// 		likeBtn = true;
		// 	}
		// 	party = parties_value.parties.data.find((party) => party.id == data.params.slug);
		// 	sidoName = parties_value.siCode.find((sido)=>sido.code == party.sido).name;
		// 	likeNum = party.like;
		// } else {
		// 	alert("로그인 안함");
		// }
		if(data.liked){
			likeBtn = true;
		}
		party = parties_value.parties.data.find((party) => party.id == data.params.slug);
		sidoName = parties_value.siCode.find((sido)=>sido.code == party.sido).name;
		likeNum = party.like;
	
	})
	const commentDate = (timeStamp)=>{
		const date = new Date(timeStamp);
		return timeAgo(date);
	}
	const timeAgo = (date)=>{
		const now = new Date();
		const secondsAgo = Math.round((now - date) / 1000);  // Difference in seconds
		const minutesAgo = Math.round(secondsAgo / 60);  // Difference in minutes
		const hoursAgo = Math.round(minutesAgo / 60);  // Difference in hours

		if (secondsAgo < 60) {
			return "방금 전";
		} else if (minutesAgo < 60) {
			return minutesAgo + "분 전";
		} else if (hoursAgo < 24) {
			return hoursAgo + "시간 전";
		} else {
			return Math.round(hoursAgo / 24) + "일 전";
		}
	}
    const submitComment = ()=>{
		const formData = {
			id : party.id,
			comment : comment,
			writer : data.nickName.words[0],
			category : "party"
		}
		fetch(`${PUBLIC_BACK_URL}/sprint/comment`,{
			method : "post",
			body : JSON.stringify(formData),
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
				invalidateAll();
				comment = '';
			}
		})
    }
	const setCookie = (name, value, days)=>{
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}
	const partyLike = ()=>{
		if(likeBtn) return;
		const data = {
			id : party.id
		}
		fetch(`${PUBLIC_BACK_URL}/sprint/party/like`,{
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
				likeBtn = true;
				likeNum++;
				setCookie(`party_like_${party.id}`, true, 1);
			}
		})
	}
</script>
{#if party}
<div class="mt-14 mb-20">
	<div class="mx-3 my-6 rounded-lg flex flex-col items-center border-b">

		<div class="w-4/5 font-bold text-xl my-2">
			{party.title}
		</div>
		
		<div class="w-4/5 flex justify-between text-sm text-gray-600">
			<div>
				<span class="text-md">
					🗺️
				</span>
				지역
			</div>
			<div class="font-bold">
				{sidoName}
			</div>
		</div>
		<div class="w-4/5 flex justify-between text-sm text-gray-600 my-1 pb-3">
			<div>
				<span class="text-md">
					👋
				</span>
				모집 포지션
			</div>
			<div class="flex font-bold text-[0.5rem]">
				{#each party.positions.split(",") as position, index (index)}
					{#if position == 1}
						<span class="border border-gray-300 rounded-full mx-0.5 px-1.5 py-0.5">개발자</span>
					{:else if position == 2}
						<span class="border border-gray-300 rounded-full mx-0.5  px-1.5 py-0.5">디자이너</span>
					{:else}
						<span class="border border-gray-300 rounded-full mx-0.5  px-1.5 py-0.5">기획자</span>
					{/if}
				{/each}
			</div>
		</div>
		<div class="text-sm w-4/5 mt-3 mb-10">
			<div class="text-xs text-gray-600 text-center mb-2">
				모임소개
			</div>
			<div>
				{party.introduce}
			</div>
			
		</div>
	</div>
	<div class="flex justify-center my-5">
		<div on:click={partyLike} class="flex items-center justify-center w-1/2 rounded-tl-lg rounded-bl-lg text-center text-sm px-4 py-2 border border-gray-500 text-gray-800">
			{#if likeBtn}
			<svg class="mr-2 text-rose-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
			관심을 보냈어요
			{:else}
			<svg fill="currentColor" class="mr-2" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
			관심있어요
			{/if}
			
		</div>
		<div class="font-bold flex items-center justify-center w-1/8 rounded-tr-lg rounded-br-lg text-center text-sm px-4 py-1 border border-l-0 border-gray-500 text-gray-800">
			{likeNum}
		</div>
	</div>
	<div class="mx-2 text-gray-700">
		<div class="text-sm mb-2">댓글</div>
		{#if data.comments.data}
			{#each data.comments.data as writenComment, index (index)}
				<div class="text-xs my-3 py-2 border-b">
					<div class="flex mb-1">
						<span class="text-slate-800 font-bold">
							{writenComment.writer}
						</span>
						<span>
							ㆍ{commentDate(writenComment.created_at)}
						</span>
					</div>
					<div class="text-slate-600">
						{writenComment.comment}
					</div>
				</div>
			{/each}
		{/if}
		
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
							class="w-full px-0 text-xs text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
							placeholder={`${data.nickName.words[0]}이(가) 남기는 댓글...`}
							required
						/>
					</div>
					<div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
						<div>
							<span class="text-xs mr-1">
								랜덤 닉네임💥
							</span>
							<span class="font-bold text-xs">
								{data.nickName.words[0]}
							</span>
						</div>
						
						<button
							type="submit"
							class="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-sky-900 hover:bg-sky-800"
						>
							작성
						</button>
						
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
{/if}