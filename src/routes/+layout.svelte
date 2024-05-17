<script>
	import { blur } from 'svelte/transition';
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';
	import { store } from '$lib/store';

	export let data;

	import '../app.css';
	import Table from '$lib/Table.svelte';
	import CsvEdit from '$lib/CsvEdit.svelte';
	$: console.log('page', data);
	// $: console.log('page DATA', data);
	let visible = false;

	$: console.log('store', $store);
</script>

<div class="flex h-svh">
	<div class="max-w-3xl mx-auto flex flex-1 flex-col transition-all">
		<div class="mb-1">
			<NavCsv data={data.textIds} selectedId={$page.params.textId}></NavCsv>
		</div>
		<div class="flex flex-col flex-1 overflow-auto p-3 bg-gray-50">
			<slot></slot>
		</div>
		<CsvEdit {visible}></CsvEdit>
	</div>
</div>
