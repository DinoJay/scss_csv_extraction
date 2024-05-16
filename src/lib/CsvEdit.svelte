<script>
	export let visible;
	import { store } from '$lib/store';
	import Table from './Table.svelte';

	$: rdt = $store.csvRdt ? [...$store.csvRdt.entries()].map(([_, d]) => d) : [];
	$: acuteTox = $store.csvAcuteTox ? [...$store.csvAcuteTox.entries()].map(([_, d]) => d) : [];
</script>

{#if visible}
	<h2 class="text-lg mb-2">Repeated Dose Toxicity</h2>
	<Table
		data={rdt}
		onChange={(nd) =>
			store.update((st) => {
				const newMap = new Map(nd.map((d) => [d.id, d]));
				return { ...st, csvRdt: newMap };
			})}
	></Table>

	<h2 class="text-lg mb-2">Acute Dose Toxicity</h2>
	<Table
		data={acuteTox}
		onChange={(nd) =>
			store.update((st) => {
				const newMap = new Map(nd.map((d) => [d.id, d]));
				return { ...st, csvAcuteTox: newMap };
			})}
	></Table>
{/if}
