<script>
    import {slide,draw} from "svelte/transition";
    export let toggleModal;
    const toggle = ()=>{
        toggleModal = !toggleModal;
    }
</script>

<div class="absolute z-10 w-full h-full bg-[#00000099] flex flex-col justify-center items-center p-10" on:click={()=>{
    toggle();
}}>
	<a in:slide={{delay:300}} href="/party/add" class="bg-white rounded-lg w-full mb-10 h-1/3 overflow-hidden">
        <div class="text-2xl font-bold py-4 text-center">모임 등록</div>
        <dotlottie-player autoplay loop mode="normal" src="/party.lottie" class="w-full px-12" />
    </a>
    <a in:slide={{delay:150}} href="/search/add" class="bg-white rounded-lg w-full h-1/3 overflow-hidden">
        <div class="text-2xl font-bold py-4 text-center">버디 등록</div>
        <dotlottie-player autoplay loop mode="normal" src="/buddy.lottie" class="w-full px-12" />
    </a>
    <div on:click|self={()=>{
        toggle();
    }} in:slide class="w-14 h-14 bg-rose-400 rounded-full mt-10 text-white flex items-center justify-center">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
    </div>
</div>
