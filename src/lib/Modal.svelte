<script>
	import { modalPortal } from '$lib/portalAction';
	import { onDestroy, onMount } from 'svelte';
	import { blur, fly, fade } from 'svelte/transition';
	// import { v4 as uuidv4 } from 'uuid';

	export let isOpen = false;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let isMandatory = false;

	let handler = null;

	// onMount(() => {
	// 	handler = window.addEventListener('click', () => {
	// 		console.log('click');
	// 		open = false;
	// 	});
	// });
	// onDestroy(() => {
	// 	window.removeEventListener('click', handler);
	// });
</script>

{#if isOpen}
	<!-- <div class="absolute w-screen h-screen bg-black"></div> -->
	<div
		on:keydown={() => null}
		use:modalPortal
		class="fixed modal cont h-full w-full flex z-50 py-3"
		transition:blur
		on:click={(/** @type {{ stopPropagation: () => void; }} */ e) => {
			if (!isMandatory) {
				e.stopPropagation();
				// close();
			}
		}}
	>
		<slot />
	</div>
{/if}

<style>
	.modal {
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}
	.cont {
		background: rgba(0, 0, 1, 0.3) !important;

		will-change: transform;
	}
</style>
