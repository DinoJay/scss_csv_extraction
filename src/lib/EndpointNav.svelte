<script lang="ts">
	import ExtendEndpoint from './ExtendEndpoint.svelte';
	export let endpoints;
	export let onClick;

	export let selEndpoints;
	let curEndpoints = endpoints;

	const label = (e) => (e.path.length > 1 ? `${e.path.substring(1)}/${e.name}` : e.name);

	const selected = (e) => selEndpoints.includes(e.name);
	console.log('selEndpoint', selEndpoints);
</script>

<div class="w-full flex-1 flex flex-col overflow-auto">
	<input
		type="text"
		class="w-full p-1 mb-2 border-2"
		placeholder="Search endpoints"
		on:input={(e) => {
			const val = e.target.value;
			curEndpoints = endpoints.filter((e) => label(e).toLowerCase().includes(val.toLowerCase()));
		}}
	/>
	{#if curEndpoints.length === 0}
		<div class="m-auto text-sm text-gray-500">No Endpoints Found</div>
	{/if}
	<ul class="gap-1 overflow-auto w-full flex flex-col pr-2 h-48 2xl:h-auto">
		{#each curEndpoints as e}
			<li class="p-1 border-b flex-1 text-sm" class:bg-blue-100={selected(e)}>
				<ExtendEndpoint endpoint={e} selected={selected(e)} onClick={() => onClick(e)}>
					{label(e)}
				</ExtendEndpoint>
			</li>
		{/each}
	</ul>
</div>
