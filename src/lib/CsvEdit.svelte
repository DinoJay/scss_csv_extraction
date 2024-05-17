<script>
	export let visible;
	import { store } from '$lib/store';
	import Table from './ChatGPTTable.svelte';

	import { csvFormat } from 'd3-dsv';
	import FileSaver from 'file-saver';
	import ExportCsvBtn from './ExportCsvBtn.svelte';
	import { slide } from 'svelte/transition';

	$: rdt = $store.csvRdt ? [...$store.csvRdt.entries()].map(([_, d]) => d) : [];
	$: acuteTox = $store.csvAcuteTox ? [...$store.csvAcuteTox.entries()].map(([_, d]) => d) : [];
	$: emptyData = acuteTox.length === 0 && rdt.length === 0;

	let csvMode = false;
</script>

<div class="" transition:slide class:min-h-fit={!visible} class:min-h-60={visible}>
	<button
		class="bg-blue-100 w-full p-2 mt-2 drop-shadow-md"
		class:mb-2={!visible}
		on:click={() => (visible = !visible)}
	>
		CSV</button
	>
	{#if visible}
		<div class="p-3 bg-gray-100">
			<div class="flex items-center mb-2">
				<h2 class="text-lg">Repeated Dose Toxicity</h2>

				{#if rdt.length > 0}
					<ExportCsvBtn fileName="rdt.csv" data={csvFormat(rdt)} disabled={rdt.length === 0}
					></ExportCsvBtn>
				{/if}
			</div>
			{#if !csvMode}
				<Table
					data={rdt}
					onChange={(nd) =>
						store.update((st) => {
							const newMap = new Map(nd.map((d) => [d.id, d]));
							return { ...st, csvRdt: newMap };
						})}
				></Table>
			{:else if rdt.length === 0}
				<div class="text-sm text-gray-500">No Data</div>
			{:else}
				<textarea class="w-full h-48">{csvFormat(rdt)}</textarea>
			{/if}

			<div class="flex">
				<h2 class="text-lg my-2">Acute Dose Toxicity</h2>
				{#if acuteTox.length > 0}
					<ExportCsvBtn
						fileName="acuteToxicity.csv"
						data={csvFormat(acuteTox)}
						disabled={acuteTox.length === 0}
					></ExportCsvBtn>
				{/if}
			</div>

			{#if !csvMode}
				<Table
					data={acuteTox}
					onChange={(nd) =>
						store.update((st) => {
							const newMap = new Map(nd.map((d) => [d.id, d]));
							return { ...st, csvAcuteTox: newMap };
						})}
				></Table>
			{:else if acuteTox.length === 0}
				<div class="text-sm text-gray-500">No Data</div>
			{:else}
				<textarea class="w-full h-60" readonly>{csvFormat(acuteTox)}</textarea>
			{/if}
			<div class="flex gap-2 mb-1 mt-2">
				<button
					class="p-2 flex-1 border-2"
					disabled={emptyData}
					class:opacity-50={emptyData}
					on:click={() => (csvMode = !csvMode)}
					class:bg-gray-300={csvMode}
				>
					View CSV
				</button>
			</div>
		</div>
	{/if}
</div>
