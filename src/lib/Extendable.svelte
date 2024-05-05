<script>
	import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';
	import { slide, blur } from 'svelte/transition';

	export let title = '';
	/**
	 * @type {null|string}
	 */
	export let height = null;

	export let style = '';
	export let preClosed = false;
	let expanded = preClosed;

	let el;
	$: {
		if (expanded) {
			setTimeout(() => {
				el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'end' });
			}, 600);
		}
	}

	// onDestroy(() => {
	// 	clearTimeout(id);
	// });
</script>

<!-- Main block -->
<div
	class="{expanded ? 'expanded ' : ''}  flex flex-col overflow-hidden custom-shadow"
	{style}
	style:height={height !== null && expanded ? height : undefined}
	bind:this={el}
>
	<div
		on:keydown={() => null}
		role="button"
		tabindex="0"
		class="flex {expanded ? 'mb-3' : ''}  w-full flex flex-none justify-center cursor-pointer"
		on:click={() => {
			expanded = !expanded;
		}}
	>
		<h1 class="  drop-shadow-xl crop text-gray-700">
			{title}
		</h1>
		<div class="ml-auto">
			<slot name="header" />
		</div>

		<span class=" mr-2 transition-all {expanded ? 'rotate' : ''}" style="width:24px;height:24px">
			<MdExpandMore />
		</span>
	</div>

	<div class="flex-grow flex flex-col">
		{#if expanded}
			{#key expanded}
				<div class="flex flex-col flex-grow" transition:slide>
					<slot />
				</div>
			{/key}
		{/if}
	</div>
</div>

<style>
	.panel-container {
		transition: all 0.3s ease;
	}

	.expanded {
		max-height: 40rem;
	}

	.rotate {
		transform: rotate(90deg);
	}

	/* .custom-shadow {
		box-shadow: 5px 5px 5px #a6a29f;
	} */
</style>
