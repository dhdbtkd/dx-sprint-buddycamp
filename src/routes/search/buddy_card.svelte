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
    <div class="w-3/4 text-right">
        <div class="text-sm font-bold mb-2">
            {buddy.name}
        </div>
        <div class="text-xs mb-2">
            {buddy.work_year}년
        </div>
        <div class="text-xs">
            {buddy.introduce}
        </div>
    </div>
    
</div>