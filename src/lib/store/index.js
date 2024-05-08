import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const storedItems = JSON.parse(browser && localStorage.getItem('store')) || {
    scrapedTxtsMap: [],
    originalTxtsMap: []
};
const defaultStore = {
    scrapedTxtsMap: undefined,
    originalTxtsMap: undefined
}
export const store = writable(defaultStore /*browser && storedItems*/);

// store.subscribe((val) => browser && (localStorage.store = JSON.stringify(val)));

export const updateStore = (u) => {
    store.update(obj => ({ ...obj, ...u }))

}