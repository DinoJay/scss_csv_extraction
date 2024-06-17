<script>
	import { store } from '$lib/store/index';
	import LightBox from './LightBox.svelte';
	import Spinner from './Spinner.svelte';
	import isEqual from 'lodash.isequal';

	export let prompts;
	export let responses;
	export let title;
	export let onSubmit = null;
	export let onClose;
	export let open;
	export let type;
	export let pid;
	export let paragraph;
	export let edit = true;
	export let cols;
	export let completionPerc;
	export let endpoints;

	import { csvFormat } from 'd3-dsv';
	import { ACUTETOX, RDT } from './reportIds';
	import Table from './ChatGPTTable.svelte';

	// $: console.log('response', response);

	const joinData = (responses, cs) => {
		console.log('responses JOIN', responses);
		const datum = responses.reduce((acc, r, i) => {
			return { ...acc, [cs[i]]: r, id: pid, paragraph };
		}, {});
		console.log('DATUM', datum);
		return [datum];
	};

	$: console.log('responses', responses);

	let data = responses ? joinData(responses, cols) : [];

	console.log('data', data);

	$: currentContext = () => {
		// console.log('prompts	', prompts);
		// console.log('responses	', responses);
		return [...prompts.flatMap((d, i) => [d, responses[i]]), csvFormat(data)];
	};

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
		console.log('equals', type);
		const keys = type === ACUTETOX ? [...$store.csvAcuteTox.keys()] : [...$store.csvRdt.keys()];
		console.log('keys', keys, 'data store', $store);

		if (keys.length !== data.length) return false;
		if (keys.length === 0) return false;

		return keys.every((k) =>
			data.find((d) => {
				console.log('d', d, 'store', $store.csvAcuteTox.get(k));
				return (
					d.id === k &&
					isEqual(d, type === ACUTETOX ? $store.csvAcuteTox.get(k) : $store.csvRdt.get(k))
				);
			})
		);
	};
</script>

<LightBox {title} isOpen={open} close={onClose}>
	<div class="w-full flex flex-col overflow-auto min-h-64">
		{#if data.length === 0}
			<div class="m-auto relative">
				<div class="absolute flex" style:left="8px" style:top="21px" style:width="50px">
					<div class="m-auto font-bold">
						{completionPerc}%
					</div>
				</div>
				<Spinner></Spinner>
			</div>
		{:else if data.length > 0}
			{#if csvMode}
				<p class="bg mt-2 p-1 overflow-auto" style:background="#cae6ea">
					{csvFormat(data)}
				</p>
			{:else}
				<Table
					{data}
					columns={cols}
					{endpoints}
					refreshable={true}
					onChange={(nd) => (data = nd)}
					{paragraph}
					context={currentContext()}
				></Table>
			{/if}
		{/if}
	</div>

	{#if data?.length > 0 && edit}
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
