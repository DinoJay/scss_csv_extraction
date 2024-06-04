<script>
	export let data;
	export let onClick;
	export let selectedId;
	import { fade } from 'svelte/transition';
	import MdDehaze from 'svelte-icons/md/MdDehaze.svelte';
	import { onDestroy, onMount } from 'svelte';

	let open = false;
	let handler;
	// export let pid;
	export let scraped;

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

<div class="sticky mb-2 overflow-visible bg-blue-100 drop-shadow-md z-50">
	<div class=" w-full flex-1 p-2 flex items-center">
		<button
			class="text-lg flex gap-2 items-center"
			style="height:32px"
			on:click={() => (open = !open)}
		>
			<div style="width:32px;height:32px">
				<MdDehaze></MdDehaze>
			</div>
			<div>Select Report</div>
		</button>
		<div class="ml-auto mr-3">
			{#if selectedId !== null}
				{selectedId}
			{:else}
				Select a CSV
			{/if}
		</div>
		{#if selectedId}
			<div>
				<a
					href="/{selectedId}?scraped={!scraped}"
					class="ml-auto p-1 border-2 flex mr-1 bg-gray-100"
					style:width="72px"><span class="m-auto">{scraped ? 'Scraped' : 'Scrape'}</span></a
				>
			</div>
		{/if}
	</div>

	{#if open}
		<div transition:fade class="flex flex-col gap-1 z-50 absolute w-48 bg-blue-100 drop-shadow-md">
			{#each data as key}
				<a
					href={`/${key}`}
					tabindex="-1"
					class:underline={selectedId === key}
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
				>
					{key}
				</a>
			{/each}
		</div>
	{/if}
</div>
