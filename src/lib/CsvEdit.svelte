<script>
	import TabItem from './TabItem.svelte';
	export let visible;
	import { store } from '$lib/store';
	import Table from './ChatGPTTable.svelte';
	import endpoints from './endpoints';
	import Tabs from './Tabs.svelte';

	import { csvFormat } from 'd3-dsv';
	import FileSaver from 'file-saver';
	import ExportCsvBtn from './ExportCsvBtn.svelte';
	import { slide } from 'svelte/transition';
	import LightBox from './LightBox.svelte';

	$: rdt = $store.csvRdt ? [...$store.csvRdt.entries()].map(([_, d]) => d) : [];
	$: acuteTox = $store.csvAcuteTox ? [...$store.csvAcuteTox.entries()].map(([_, d]) => d) : [];
	$: emptyData = acuteTox.length === 0 && rdt.length === 0;

	let csvMode = false;
	// $: console.log('store', $store);
	// $: console.log('rdt', rdt);
	$: colsRDT = [...new Set(rdt.flatMap((d) => Object.keys(d)))];
	$: colsAcuteTox = [...new Set(acuteTox.flatMap((d) => Object.keys(d)))];
	// $: console.log('colsRDT', colsRDT);
	// $: console.log('colsAcuteTox', colsAcuteTox);
	$: selEndpointsRDT = colsRDT.flatMap((n) => endpoints.filter((d) => d.cols.includes(n)));
	$: selEndpointsAcuteTox = colsAcuteTox.flatMap((n) =>
		endpoints.filter((d) => d.cols.includes(n))
	);
	// $: console.log('endpoints', endpoints);
	// $: console.log('selEndpointsRDT', selEndpointsRDT);
</script>

<button class="bg-blue-100 w-full p-2 mt-2 drop-shadow-md" on:click={() => (visible = !visible)}>
	CSV</button
>

<LightBox isOpen={visible} close={() => (visible = false)}>
	<div class="p-3">
		<Tabs single={true} selectedStartIndex={selEndpointsAcuteTox.length > 0 ? 1 : 0}>
			<TabItem title="Repeated Dose Toxicity">
				{#if rdt.length > 0}
					<div class="flex items-center my-2">
						<ExportCsvBtn fileName="rdt.csv" data={csvFormat(rdt)} disabled={rdt.length === 0}
						></ExportCsvBtn>
					</div>
				{/if}
				{#if !csvMode}
					<Table
						edit={true}
						data={rdt}
						paragraph={null}
						endpoints={selEndpointsRDT}
						columns={colsRDT}
						onChange={(nd) =>
							store.update((st) => {
								const newMap = new Map(nd.map((d) => [d.id, d]));
								return { ...st, csvRdt: newMap };
							})}
					></Table>
				{:else if rdt.length === 0}
					<div class="text-sm text-gray-500 p-24">No Data</div>
				{:else}
					<textarea class="w-full h-56">{csvFormat(rdt)}</textarea>
				{/if}
			</TabItem>

			<TabItem title="Acute Dose Toxicity">
				{#if acuteTox.length > 0}
					<div class="flex my-2">
						<ExportCsvBtn
							fileName="acuteToxicity.csv"
							data={csvFormat(acuteTox)}
							disabled={acuteTox.length === 0}
						></ExportCsvBtn>
					</div>
				{/if}

				{#if !csvMode}
					<Table
						edit={true}
						data={acuteTox}
						endpoints={selEndpointsAcuteTox}
						columns={colsAcuteTox}
						paragraph={null}
						onChange={(nd) =>
							store.update((st) => {
								const newMap = new Map(nd.map((d) => [d.id, d]));
								return { ...st, csvAcuteTox: newMap };
							})}
					></Table>
				{:else if acuteTox.length === 0}
					<div class="text-sm text-gray-500 p-24">No Data</div>
				{:else}
					<textarea class="w-full h-60" readonly>{csvFormat(acuteTox)}</textarea>
				{/if}
			</TabItem>
		</Tabs>
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
</LightBox>
