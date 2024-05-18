<script>
	import { store } from '$lib/store/index';
	import LightBox from './LightBox.svelte';
	import Spinner from './Spinner.svelte';
	import isEqual from 'lodash.isequal';

	export let prompts;
	export let responses;
	export let title;
	export let onSubmit;
	export let onClose;
	export let open;
	export let type;
	export let pid;
	export let paragraph;

	import { csvParse, csvFormat } from 'd3-dsv';
	import { ACUTETOX, RDT } from './reportIds';
	import Table from './ChatGPTTable.svelte';
	import OpenAI from 'openai';

	// $: console.log('response', response);

	const joinData = (responses) => {
		let newData = responses.map((r, j) =>
			csvParse(r).map((d, i) => ({ ...d, id: `${pid}-${i}`, paragraph }))
		);
		let groupedObj = Object.groupBy(newData.flat(), (d) => d.id);
		return Object.values(groupedObj).map((d) => d.reduce((acc, d) => ({ ...acc, ...d }), {}));
	};

	let data = responses ? joinData(responses) : [];

	$: currentContext = () => [
		...prompts.flatMap((d, i) => [d, responses[i]]).slice(0, -1),
		csvFormat(data)
	];
	let csvMode = false;

	// $: rdt = $store.csvRdt ? [...$store.csvRdt.entries()].map(([_, d]) => d) : [];
	// $: acuteTox = $store.csvAcuteTox ? [...$store.csvAcuteTox.entries()].map(([_, d]) => d) : [];

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
		{#if data.length === 0}
			<div class="m-auto">
				<Spinner></Spinner>
			</div>
		{:else if data.length > 0}
			{#if csvMode}
				<p class="bg mt-2 p-1 overflow-auto" style:background="#cae6ea">
					{data}
				</p>
			{:else}
				<Table
					{data}
					refreshable={true}
					onChange={(nd) => (data = nd)}
					{paragraph}
					context={currentContext()}
				></Table>
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

	{#if data?.length > 0}
		<div class="flex mt-3">
			<button class="flex-1 p-2 border-2" on:click={() => onSubmit()}> Re-Submit </button>
			<button class="flex-1 p-2 border-2 ml-1 bg-gray-100" on:click={() => (csvMode = !csvMode)}
				>csv</button
			>
			<button
				class="flex-1 p-2 border-2 ml-1"
				on:click={updateStoreCsv}
				class:bg-green-300={equals()}
				class:bg-yellow-300={!equals()}>Save to CSV</button
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
