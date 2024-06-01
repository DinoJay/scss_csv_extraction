<script lang="ts">
	import { onMount } from 'svelte';
	import NavCsv from '$lib/NavCsv.svelte';
	import { page } from '$app/stores';
	// import { store, updateStore } from '$lib/store';
	import ParagraphPreview from './ParagraphPreview.svelte';
	import { goto } from '$app/navigation';
	import { pushState } from '$app/navigation';

	export let rdt;
	export let acuteTox;
	export let selectedPid;
	export let selectedTextId;
	export let text;
	export let scraped;
</script>

<div class="flex-1 main flex flex-col overflow-auto bg-gray-50 p-2 relative">
	{#if scraped}
		<div class="flex-1 overflow-auto">
			{#if rdt?.length > 0}
				<h1 class="text-xl mb-3">Repeated Dose Toxicity</h1>
			{/if}
			<div class="mb-12 flex flex-col gap-6">
				{#each rdt as p, i (p.id)}
					<ParagraphPreview
						{scraped}
						title={`Study ${i + 1}`}
						text={p.txt}
						pid={p.id}
						reportId={selectedTextId}
					/>
				{/each}
			</div>

			{#if acuteTox?.length > 0}
				<h1 class="text-xl mb-3">Acute Dose Toxicity</h1>
			{/if}
			<div class="flex flex-col gap-6">
				{#each acuteTox as p, i (p.id)}
					<ParagraphPreview
						{scraped}
						title={`Study ${i + 1}`}
						pid={p.id}
						reportId={selectedTextId}
						text={p.txt}
					></ParagraphPreview>
				{/each}
			</div>
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
</div>
