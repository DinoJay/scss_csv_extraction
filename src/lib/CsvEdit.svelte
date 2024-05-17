<script>
	export let visible;
	import { store } from '$lib/store';
	import Table from './Table.svelte';

	$: rdt = $store.csvRdt ? [...$store.csvRdt.entries()].map(([_, d]) => d) : [];
	$: acuteTox = $store.csvAcuteTox ? [...$store.csvAcuteTox.entries()].map(([_, d]) => d) : [];
</script>

<div class="transition-all" class:min-h-fit={!visible} class:min-h-60={visible}>
	<button
		class="bg-blue-100 w-full p-2 mt-2 drop-shadow-md"
		class:mb-2={!visible}
		on:click={() => (visible = !visible)}
	>
		CSV</button
	>
	{#if visible}
		<div class="p-3 bg-gray-100">
			<h2 class="text-lg mb-2">Repeated Dose Toxicity</h2>
			<Table
				data={rdt}
				onChange={(nd) =>
					store.update((st) => {
						const newMap = new Map(nd.map((d) => [d.id, d]));
						return { ...st, csvRdt: newMap };
					})}
			></Table>

			<h2 class="text-lg my-2">Acute Dose Toxicity</h2>
			<Table
				data={acuteTox}
				onChange={(nd) =>
					store.update((st) => {
						const newMap = new Map(nd.map((d) => [d.id, d]));
						return { ...st, csvAcuteTox: newMap };
					})}
			></Table>
		</div>
		<div class="flex gap-2 mb-3">
			<button class="p-2 flex-1 border-2"> Export CSV </button>
			<button class="p-2 flex-1 border-2"> View CSV </button>
		</div>
	{/if}
</div>
