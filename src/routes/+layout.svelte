<script>
	import { blur } from 'svelte/transition';
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';
	import { store } from '$lib/store';

	export let data;

	import '../app.css';
	import CsvEdit from '$lib/CsvEdit.svelte';
	$: console.log('page', data);
	// $: console.log('page DATA', data);
	let visible = false;

	$: paragraphId = $page.url.searchParams.get('pid');

	$: scraped = $page.url.searchParams.get('scraped') === 'true';

	$: console.log('store', $store);
	$: console.log('url', $$props);
</script>

<div class="flex h-svh">
	<div class="max-w-3xl mx-auto flex flex-1 flex-col transition-all">
		<div class="mb-1">
			<NavCsv data={data.textIds} selectedId={$page.params.textId} {scraped}></NavCsv>
		</div>
		<div class="flex flex-col flex-1 overflow-auto p-3 bg-gray-50">
			<slot></slot>
		</div>
		{#if data.url?.pathname !== '/'}
			<CsvEdit {visible}></CsvEdit>
		{/if}
	</div>
</div>
