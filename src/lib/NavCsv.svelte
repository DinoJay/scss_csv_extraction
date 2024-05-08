<script>
	export let data;
	export let onClick;
	export let selectedId;
	import { fade } from 'svelte/transition';
	import MdDehaze from 'svelte-icons/md/MdDehaze.svelte';
	import { onDestroy, onMount } from 'svelte';

	let open = false;
	let handler;

	// onMount(() => {
	// 	if (window && document?.querySelector)
	// 		handler = document.querySelector('.main').addEventListener('click', () => {
	// 			console.log('click');
	// 			open = false;
	// 		});
	// });
	// onDestroy(() => {
	// 	if (window && !!!document?.querySelector)
	// 		document.querySelector('.main').removeEventListener('click', handler);
	// });
</script>

<div class="sticky mb-2 overflow-visible bg-blue-100 drop-shadow-md">
	<button on:click={() => (open = !open)} class=" w-full flex-1 p-2 flex items-center">
		<div style="width:32px; height:32px">
			<MdDehaze></MdDehaze>
		</div>
		<div class="ml-auto mr-3">
			{#if selectedId !== null}
				{selectedId}
			{:else}
				Select a CSV
			{/if}
		</div>
	</button>
	{#if open}
		<div transition:fade class="flex flex-col gap-1 z-30 absolute w-48 bg-blue-100 drop-shadow-md">
			{#each data.filter((d) => d !== selectedId) as key}
				<a
					href={`/${key}`}
					tabindex="-1"
					class="border-b-2 p-2 flex-1 z-20"
					on:click={() => {
						// onClick(key);
						open = false;
					}}
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							// onClick(key);
						}
					}}
					class:bg-blue-300={selectedId === key}
				>
					{key}
				</a>
			{/each}
		</div>
	{/if}
</div>
