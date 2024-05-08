<script>
	import CloseIcon from 'svelte-icons/md/MdClose.svelte';
	export let endpoints;
	export let cls;
	export let onClick;
</script>

<div class={cls}>
	{#if endpoints.length === 0}
		<div class=" text-sm text-gray-500 py-2">No Endpoints Selected</div>
	{/if}
	<div class="flex gap-2 flex-wrap mb-1">
		{#each endpoints as e}
			<button
				class="border-2 p-1 text-sm flex items-center"
				on:click={() => {
					console.log('e', e);
					onClick(e);
				}}
			>
				<div>{e}</div>
				{#if endpoints.length > 1}
					<div style="width:16px;height:16px">
						<CloseIcon />
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
