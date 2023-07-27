import { writable, readonly } from 'svelte/store';

// export const backUrl = readonly("http://localhost:3000");
let buddies_value, parties_value;
const buddies = writable({});
buddies.subscribe((value) => {
    buddies_value = value;
});
const parties = writable({});
parties.subscribe((value) => {
    parties_value = value;
});
export {buddies_value, parties_value, buddies, parties};