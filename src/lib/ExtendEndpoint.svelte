<script>
	export let selected;
	export let onClick;
	export let endpoint;

	let ext = false;
</script>

<div class="">
	<div class="flex">
		<button class="flex-1 text-left" on:click={onClick}><slot></slot></button>
		{#if selected}
			<button on:click={() => (ext = !ext)}>@</button>
		{/if}
	</div>
	{#if ext}
		<div class="mt-1">
			{endpoint.cols.join(';')}
		</div>
	{/if}
</div>
