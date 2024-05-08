<script>
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';

	export let data;

	import '../app.css';
	$: console.log('page', $page.params.textId);
	// $: console.log('page DATA', data);
</script>

<div class="flex h-screen">
	<div class="p-3 max-w-prose mx-auto flex flex-auto flex-col py-2 bg-gray-50">
		<div class="mb-3">
			<NavCsv data={data.textIds} selectedId={$page.params.textId}></NavCsv>
		</div>
		<slot></slot>
	</div>
</div>
