<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let selectedStartIndex = 0;
	export let single = false;
	export let style = '';
	export let flow = 'row';

	// context is not reactive, so it's common to use stores together with context to get reactivity.
	const tabs = writable([]);

	// track which tab is active
	let activeIndexes = [selectedStartIndex];

	// create a context called "tabs" to share the store with children
	setContext('tabs', { tabs });

	// update the tabs store whenever the active index changes
	// it will cause children to update since they are subscribed to the store
	$: $tabs = $tabs.map((tab, i) => {
		return {
			...tab,
			active: activeIndexes.includes(i)
		};
	});
</script>

<nav class="flex flex-wrap gap-1 mb-3">
	{#each $tabs as tab, i}
		<button
			class="btn flex-1 flex items-center p-2"
			class:disabled={$tabs.length === 1}
			aria-disabled={$tabs.length === 1}
			class:sel-btn={tab.active || $tabs.length === 1}
			class:bg-blue-100={tab.active}
			class:border-2={!tab.active}
			class:opacity-70={!tab.active}
			on:click={() => {
				if ($tabs.length === 1) return;
				if (activeIndexes.includes(i)) {
					if (activeIndexes.length > 1) activeIndexes = activeIndexes.filter((d) => d !== i);
				} else {
					if (single) activeIndexes = [i];
					else activeIndexes = [...activeIndexes, i];
				}
			}}
			style:background={tab.color}
		>
			<div class="m-auto flex items-center">
				{tab.title}
			</div>
		</button>
	{/each}
</nav>

{#if flow === 'row'}
	<div class="flex flex-wrap dir gap-3 h-full w-full" {style}>
		<slot />
	</div>
{/if}
{#if flow === 'col'}
	<slot />
{/if}

<style>
	.dir {
		@apply flex-col justify-start;
	}
	/* @screen sm {
		.dir {
			@apply flex-row justify-center;
		}
	} */
</style>
