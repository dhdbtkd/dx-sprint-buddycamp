<script>
    export let si_code;
    export let party;
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
<div class="flex flex-col mx-4 shadow rounded-lg my-3 p-3 buddy_card" si_code = {party.sido}>
    <div class="flex justify-between">
        <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-400 mb-1">
            {si_code.find((code)=>party.sido == code.code).name}
        </span>
    </div>
    
    <div class="mb-2 font-bold">
        {party.title}
    </div>
    <div class="text-xs">
        {abbreviateText(party.introduce, 50)}
    </div>
    <div class="text-gray-500 flex justify-end text-xs">
        <div class="flex items-center mr-2">
            <svg class="mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
            {party.comment_num}
        </div>
        <div class="flex items-center mr-2">
            <svg class="mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
            {party.like}
        </div>
        <div class="flex items-center mr-2">
            <svg class="mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
            {party.view}
        </div>
        
    </div>
</div>