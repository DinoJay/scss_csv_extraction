<script>
	import PageTrans from './../lib/PageTrans.svelte';
	import { blur, slide } from 'svelte/transition';
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';
	import { store } from '$lib/store';

	export let data;

	import '../app.css';
	import CsvEdit from '$lib/CsvEdit.svelte';
	import { onNavigate } from '$app/navigation';
	$: console.log('page', data);
	// $: console.log('page DATA', data);
	let visible = false;

	$: paragraphId = $page.url.searchParams.get('pid');

	$: scraped = $page.url.searchParams.get('scraped') === 'true';

	$: console.log('store', $store);
	$: console.log('url', $page.url);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="flex h-lvh m-auto">
	<div
		class="max-w-3xl mx-auto my-3 2xl:my-6 flex flex-auto flex-col transition-all w-full sm:max-height 2xl:max-large-height sm:max-width 2xl:max-large-width"
	>
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
