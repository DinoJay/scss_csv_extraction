import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const storedItems = JSON.parse(browser && localStorage.getItem('store')) || {
    csvAcuteTox: new Map(),
    csvRdt: new Map(),
};
const defaultStore = {
    csvAcuteTox: new Map(),
    csvRdt: new Map(),
}
export const store = writable(defaultStore /*browser && storedItems*/);

// store.subscribe((val) => browser && (localStorage.store = JSON.stringify(val)));

export const updateStore = (u) => {
    store.update(obj => ({ ...obj, ...u }))

}