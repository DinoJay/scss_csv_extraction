<script lang="ts">
	import ExtendEndpoint from './ExtendEndpoint.svelte';
	export let endpoints;
	export let onClick;

	export let selEndpoint;
	let curEndpoints = endpoints;

	const label = (e) => (e.path.length > 1 ? `${e.path.substring(1)}/${e.name}` : e.name);

	const selected = (e) => e.name === selEndpoint;
	console.log('selEndpoint', selEndpoint);
</script>

<div class="w-full h-48 flex flex-col">
	<input
		type="text"
		class="w-full p-2 mb-3 border-2"
		placeholder="Search endpoints"
		on:input={(e) => {
			console.log('cehck');
			const val = e.target.value;
			curEndpoints = endpoints.filter((e) => label(e).includes(val));
		}}
	/>
	{#if curEndpoints.length === 0}
		<div class="m-auto text-sm text-gray-500">No Endpoints Found</div>
	{/if}
	<ul class="gap-1 overflow-auto w-full flex flex-col">
		{#each curEndpoints as e}
			<li class="p-1 border-b flex-1 text-sm" class:bg-blue-100={selected(e)}>
				<ExtendEndpoint endpoint={e} selected={selected(e)} onClick={() => onClick(e)}>
					{label(e)}
				</ExtendEndpoint>
			</li>
		{/each}
	</ul>
</div>
