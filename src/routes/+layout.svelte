<script>
	import { blur } from 'svelte/transition';
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';

	export let data;

	import '../app.css';
	$: console.log('page', data);
	// $: console.log('page DATA', data);
</script>

<div class="flex h-svh">
	<div class="max-w-3xl mx-auto flex flex-1 flex-col">
		<div class="mb-1">
			<NavCsv data={data.textIds} selectedId={$page.params.textId}></NavCsv>
		</div>
		<div class="flex flex-col flex-1 overflow-auto p-6">
			<slot></slot>
		</div>
	</div>
</div>
