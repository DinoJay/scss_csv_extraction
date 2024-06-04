<script>
	import { page } from '$app/stores';
	import Paragraph from '$lib/ChatGPTparagraph.svelte';

	// const scrapedTxtsMap = data.scrapedTxtsMap;
	// const originalTxtsMap = data.originalTxtsMap;
	export let data;

	$: selectedTextId = $page.params.textId;
	$: paragraphId = $page.params.pid;
	$: report = data.scrapedTxtsMap?.get(selectedTextId);

	$: selectedParagraph =
		report?.rdt?.find((d) => d.id === paragraphId) ||
		report?.acuteTox?.find((d) => d.id === paragraphId);
	// $: console.log('selectedParagraph', selectedParagraph);

	$: scraped = $page.url.searchParams.get('scraped') === 'true';
	$: console.log('scraped', scraped);
	$: console.log('reportId', report);
	$: console.log('paragraphId', paragraphId);
	$: console.log('selectedParagraph', selectedParagraph);
</script>

{#if report && selectedParagraph}
	<Paragraph
		{scraped}
		type={selectedParagraph?.type}
		pid={paragraphId}
		reportId={report.id}
		paragraphText={selectedParagraph?.txt}
	></Paragraph>
{:else}
	<div class="text-xl m-auto">Paragraph not found!</div>
{/if}
