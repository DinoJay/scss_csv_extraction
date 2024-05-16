<script lang="ts">
	import { onMount } from 'svelte';
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';
	// import { store, updateStore } from '$lib/store';
	import ParagraphPreview from './ParagraphPreview.svelte';
	import { goto } from '$app/navigation';
	import { pushState } from '$app/navigation';

	export let paragraph;
	export let rdt;
	export let acuteTox;
	export let selectedPid;
	export let selectedTextId;
	export let text;
	export let scraped;
</script>

<div class="flex-1 main flex flex-col overflow-auto bg-gray-50 p-2">
	{#if scraped}
		<div class="flex-1 overflow-auto p-3">
			{#if rdt?.length > 0}
				<h1 class="text-xl mb-3">Repeated Dose Toxicity</h1>
			{/if}
			{#each rdt as p, i (p.id)}
				<ParagraphPreview
					{scraped}
					selected={selectedPid === p.id}
					title={`Study ${i + 1}`}
					text={p.txt}
					type={p.type}
					pid={p.id}
					reportId={selectedTextId}
				/>
			{/each}

			{#if acuteTox?.length > 0}
				<h1 class="text-xl mb-3">Acute Dose Toxicity</h1>
			{/if}
			{#each acuteTox as p, i (p.id)}
				<ParagraphPreview
					{scraped}
					selected={selectedPid === p.id}
					title={`Study ${i + 1}`}
					pid={p.id}
					type={p.type}
					reportId={selectedTextId}
					text={p.txt}
				></ParagraphPreview>
			{/each}
		</div>
	{/if}

	<!-- <Paragraph
						text={paragraph}
						selected={paragraph === p}
						reportId={selectedTextId}
						type={selectedParagraph?.type}
					/> -->
	<!-- {/if} -->
	{#if !scraped}
		<div class="whitespace-pre-wrap flex-1 overflow-y-auto">
			{text}
		</div>
	{/if}
	<a
		href="/{selectedTextId}?scraped={!scraped}"
		class="p-2 border-2 0 mt-3 flex"
		class:bg-yellow-200={!scraped}
		class:bg-green-200={scraped}><span class="m-auto">{scraped ? 'Scraped' : 'Scrape'}</span></a
	>
</div>
