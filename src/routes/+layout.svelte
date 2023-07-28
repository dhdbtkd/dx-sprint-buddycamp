<script>
	import { fade,blur, fly, slide } from "svelte/transition";
    import "../app.css";
    import { page } from '$app/stores';
    import Modal from './modal.svelte';
    let toggleMenu = false;
    let toggleModal = false;
    let currentPath;
    $: currentPath = $page.url.pathname;
    const getPath = ()=>{
        currentPath = $page.url.pathname;
    }

    $: $page.url.pathname;
    $: getPath();
</script>
<div class="flex justify-between items-center py-3 px-4 border-b fixed w-full bg-white z-10">
    <a href="/" class="text-lg font-bold">
        BuddyCamp
    </a>
    <div on:click={()=>{toggleMenu = !toggleMenu}}>
        <svg fill="currentColor" class="text-blue-800" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    </div>
</div>
{#if toggleMenu}
<div transition:fly class="absolute w-full h-full bg-[#00000043] z-10 flex justify-end" on:click|self={(e)=>{
        toggleMenu = !toggleMenu
    }}>
    <div class="w-2/3 h-full bg-white px-3 py-4">
        <div class="text-lg font-bold">
            새로운 동료를 만나는 곳
        </div>
        <div class="flex flex-col items-end mt-16 text-gray-700">
            <a class="flex items-center py-2" href="/" on:click={()=>{toggleMenu = !toggleMenu}}>
                <svg class="mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="0.9em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                홈
            </a>
            <a class="flex items-center py-2" href="/party" on:click={()=>{toggleMenu = !toggleMenu}}>
                
                모임
            </a>
            <a class="flex items-center py-2" href="/search" on:click={()=>{toggleMenu = !toggleMenu}}>
                
                버디 찾기
            </a>
            
        </div>
    </div>
</div>
{/if}
<slot/>
<div class="z-10 fixed bg-white bottom-0 w-full flex justify-evenly py-3 border-t text-gray-500 text-sm shadow rounded-sm font-bold">
    <div on:click={()=>{toggleModal=!toggleModal;}} class="absolute flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 -translate-y-2 bottom-1/2 shadow-lg text-white">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
    </div>
    <a href="/party" class={currentPath=="/party"?"flex flex-col items-center justify-center border-r w-1/2 text-blue-600":"flex flex-col items-center justify-center border-r w-1/2"}>
        <svg fill="currentColor" class="mb-1" xmlns="http://www.w3.org/2000/svg" height="1.1rem" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"/></svg>
        모임
    </a>
    <a href="/search" class={currentPath=="/search"?"flex flex-col items-center justify-center border-r w-1/2 text-blue-600":"flex flex-col items-center justify-center border-r w-1/2"}>
        <svg fill="currentColor" class="mb-1" xmlns="http://www.w3.org/2000/svg" height="1.1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        버디찾기
    </a>
</div>
{#if toggleModal}
<Modal bind:toggleModal={toggleModal}></Modal>
{/if}