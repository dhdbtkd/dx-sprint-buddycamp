<script>
    import { PUBLIC_BACK_URL } from '$env/static/public';
    import { invalidateAll } from '$app/navigation';
	import { onMount, beforeUpdate } from 'svelte';
    export let buddy;
    export let modalShow;
    let comments;
    let nickName = {
        words : ["고정된 댓글"]
    };
    const toggleModal = ()=>{
        modalShow = !modalShow;
    }
    const refreshComment = async ()=>{
        comments = await fetch(`${PUBLIC_BACK_URL}/sprint/comment?category=buddy&parent_id=${buddy.id}`)
        .then((response)=>{
            return response.json()
            
        })
        .then((json)=>{
            return json;
            
        })
    }
    onMount(async ()=>{ 
        nickName = await fetch("/search/map/nickname")
        .then((response)=>{
            return response.json()
            
        })
        .then((json)=>{
            return json;
        })
        comments = await fetch(`${PUBLIC_BACK_URL}/sprint/comment?category=buddy&parent_id=${buddy.id}`)
        .then((response)=>{
            return response.json()
            
        })
        .then((json)=>{
            return json;
        })
    })
    let comment;
    let submitBtnDisabled = false;
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
        submitBtnDisabled = true;
		const formData = {
			id : buddy.id,
			comment : comment,
			writer : nickName.words[0],
			category : "buddy"
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
                refreshComment();
				comment = '';
                submitBtnDisabled = false;
			}
		})
    }
</script>
<div class="z-20 absolute h-full w-full bg-[#000000cc] flex items-center justify-center" on:click|self={()=>{toggleModal()}}>
    <div class="bg-white w-full h-2/3 overflow-scroll rounded-lg m-6">
        <div class="my-3">
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
                {#if comments}
                {#if comments.data}
                    {#each comments.data as writenComment, index (index)}
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
                                    placeholder={`${nickName.words[0]}이(가) 남기는 댓글...`}
                                    required
                                />
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <div>
                                    <span class="text-xs mr-1">
                                        랜덤 닉네임💥
                                    </span>
                                    <span class="font-bold text-xs">
                                        {nickName.words[0]}
                                    </span>
                                </div>
                                
                                <button
                                    disabled={submitBtnDisabled}
                                    type="submit"
                                    class="disabled:bg-gray-300 inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-sky-900 hover:bg-sky-800"
                                
                                    >
                                    {submitBtnDisabled?"처리중":"작성"}
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>