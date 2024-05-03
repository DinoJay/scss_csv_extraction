<script>
	export let selected;
	export let onClick;
	export let endpoint;
	import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';

	let ext = false;
</script>

<div class="">
	<div class="flex items-center">
		<button class="flex-1 text-left" on:click={onClick}><slot></slot></button>
		{#if selected}
			<button style="width:16px;height:16px" on:click={() => (ext = !ext)}>
				<MdExpandMore></MdExpandMore>
			</button>
		{/if}
	</div>
	{#if ext}
		<div class="mt-1">
			{endpoint.cols.join(';')}
		</div>
	{/if}
</div>
