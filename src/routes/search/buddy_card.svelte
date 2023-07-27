<script>
    
    export let buddy;
    let style = {
        1 : {
            badge_class : "rounded-full text-xs bg-sky-700 text-white text-center py-0.5 mt-3 px-3"
        },
        2 : {
            badge_class : "rounded-full text-xs bg-rose-700 text-white text-center py-0.5 mt-3 px-3"
        },
        3 : {
            badge_class : "rounded-full text-xs bg-yellow-700 text-white text-center py-0.5 mt-3 px-3"
        }
    }
    const abbreviateText = (str, maxLength)=>{
        if (str.length <= maxLength) {
            return str;
        }
        return str.slice(0, maxLength) + '...';
    }
</script>
<div class="flex mx-4 shadow rounded-lg my-3 p-3 buddy_card" si_code = {buddy.bcode.substr(0,2)} work_year={buddy.work_year} position={buddy.position}>
    
    <div class="w-1/4 flex flex-col items-center justify-center">
        <div class="bg-white w-14 h-14 rounded-full overflow-hidden border shadow">
            <img src={buddy.avatar_path}>
        </div>
        <div class={style[buddy.position].badge_class}>
            {#if buddy.position == 1}
                개발자
            {:else if buddy.position == 2}
                디자이너
            {:else}
                기획자
            {/if}
        </div>
        <div class="mt-2 flex flex-wrap justify-center items-center text-[0.6rem] text-gray-500">
            <svg class="mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>
            <span class="mr-1">
                {buddy.add_1depth}
            </span>
            <span>
                {buddy.add_2depth}
            </span>
        </div>
    </div>
    <div class="flex flex-col justify-between w-3/4 text-right">
        <div>
            <div class="text-sm font-bold mb-2">
                {buddy.name}
            </div>
            <div class="text-xs mb-2">
                {buddy.work_year}년
            </div>
            <div class="text-xs">
                {abbreviateText(buddy.introduce,45)}
            </div>
        </div>
        <div class="flex text-gray-500 justify-end items-center mr-2">
            <svg class="mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
            {buddy.comment_num}
        </div>
    </div>
    
</div>