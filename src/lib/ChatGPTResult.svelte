<script>
	import { store } from '$lib/store/index';
	import LightBox from './LightBox.svelte';
	import Spinner from './Spinner.svelte';
	import isEqual from 'lodash.isequal';

	export let loadingResponse;
	export let response;
	export let title;
	export let onSubmit;
	export let onClose;
	export let open;
	export let type;
	export let pid;

	import { csvParse } from 'd3-dsv';
	import { ACUTETOX, RDT } from './reportIds';
	import Table from './Table.svelte';

	console.log('response', response);
	let data = response ? csvParse(response).map((d, i) => ({ ...d, id: `${pid}-${i}` })) : [];

	$: console.log('csv', data);
	$: console.log('type', type);
	let csvMode = false;
	$: rdt = $store.csvRdt ? [...$store.csvRdt.entries()].map(([_, d]) => d) : [];
	$: acuteTox = $store.csvAcuteTox ? [...$store.csvAcuteTox.entries()].map(([_, d]) => d) : [];

	$: updateStoreCsv = () => {
		console.log('store', $store);
		if (type === RDT) {
			[...$store.csvRdt.keys()].forEach((k) => {
				if (!data.find((d) => d.id === k)) {
					store.update((st) => {
						st.csvRdt.delete(k);
						return st;
					});
				}
			});
			data.forEach((d, i) => {
				store.update((st) => {
					st.csvRdt.set(d.id, d);
					return st;
				});
			});
		} else {
			[...$store.csvRdt.keys()].forEach((k) => {
				if (!data.find((d) => d.id === k)) {
					$store.csvRdt.delete(k);
					store.update((st) => {
						st.csvAcuteTox.delete(k);
						return st;
					});
				}
			});
			data.forEach((d, i) => {
				store.update((st) => {
					st.csvAcuteTox.set(d.id, d);
					return st;
				});
			});
		}
		console.log('store', $store);
	};

	$: removeStore = () => {
		if (type === RDT) {
			[...$store.csvRdt.keys()].forEach((k) => {
				if (k.includes(pid))
					store.update((st) => {
						st.csvRdt.delete(k);
						return st;
					});
			});
		} else {
			[...$store.csvAcuteTox.keys()].forEach((k) => {
				if (k.includes(pid))
					store.update((st) => {
						st.csvAcuteTox.delete(k);
						return st;
					});
			});
		}
		console.log('store', $store);
	};

	$: isSaved = () => {
		if (type === ACUTETOX) return [...$store.csvAcuteTox.values()].some((d) => d.id.includes(pid));

		return [...$store.csvRdt.values()].some((d) => d.id.includes(pid));
	};

	$: equals = () => {
		const keys = type === ACUTETOX ? [...$store.csvAcuteTox.keys()] : [...$store.csvRdt.keys()];

		if (keys.length !== data.length) return false;
		if (keys.length === 0) return false;

		return keys.every((k) =>
			data.find(
				(d) =>
					d.id === k &&
					isEqual(d, type === ACUTETOX ? $store.csvAcuteTox.get(k) : $store.csvRdt.get(k))
			)
		);
	};
</script>

<LightBox {title} isOpen={open} close={onClose}>
	<div class="w-full flex flex-col overflow-auto min-h-64">
		{#if loadingResponse}
			<div class="h-44 flex flex-1">
				<div class="m-auto" style="width:20px;height:20px"><Spinner></Spinner></div>
			</div>
		{:else if response}
			{#if csvMode}
				<p class="bg mt-2 p-1 overflow-auto" style:background="#cae6ea">
					{response}
				</p>
			{:else}
				<Table {data} onChange={(nd) => (data = nd)}></Table>
			{/if}

			<!-- <table>
				<tr>
					{#each Object.keys(row) as key}
						<td>{row[key]}</td>
					{/each}
				</tr>
			</table> -->
		{/if}
	</div>

	{#if response && !loadingResponse}
		<div class="flex mt-3">
			<button class="flex-1 p-2 border-2" on:click={() => onSubmit()}> Re-Submit </button>
			<button class="flex-1 p-2 border-2 ml-1 bg-gray-100" on:click={() => (csvMode = !csvMode)}
				>csv</button
			>
			<button
				class="flex-1 p-2 border-2 ml-1"
				on:click={updateStoreCsv}
				class:bg-green-400={equals()}
				class:bg-yellow-400={!equals()}>Save to CSV</button
			>
			<button
				class="flex-1 p-2 border-2 ml-1"
				class:bg-red-400={isSaved()}
				class:opacity-50={!isSaved()}
				on:click={removeStore}>Remove from CSV</button
			>
		</div>
	{/if}
</LightBox>
