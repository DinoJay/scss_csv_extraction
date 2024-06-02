<script>
	import { getContext, onDestroy, onMount, afterUpdate } from 'svelte';

	// get the tabs store from the context
	const { tabs } = getContext('tabs');

	export let title;
	export let checked = null;
	let index;

	// pull out current tab, updates whenever store changes
	// ie, if tab.active changes, it will cause this to update

	onMount(() => {
		// compute index
		index = $tabs.length;

		// add a record to the tabs store
		$tabs = [...$tabs, { title }];
	});

	$: tab = $tabs[index];
</script>

{#if tab && tab.active}
	<div class="fl flex flex-col width height overflow-y-auto">
		<slot />
	</div>
{/if}

<style>
	.fl {
		@apply flex-none;
	}
	.width {
		width: 100%;
	}
</style>
