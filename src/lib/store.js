import { writable, readonly } from 'svelte/store';

// export const backUrl = readonly("http://localhost:3000");
let buddies_value;
const buddies = writable({});
buddies.subscribe((value) => {
    buddies_value = value;
});
export {buddies_value, buddies};