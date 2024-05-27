<script>
	import { store } from '$lib/store/index';
	import { page } from '$app/stores';
	import PreviewReports from '$lib/PreviewReports.svelte';
	import Paragraph from '$lib/ChatGPTparagraph.svelte';

	// const scrapedTxtsMap = data.scrapedTxtsMap;
	// const originalTxtsMap = data.originalTxtsMap;
	export let data;

	$: selectedTextId = $page.params.textId;
	$: paragraphId = $page.url.searchParams.get('pid');
	$: report = data.scrapedTxtsMap?.get(selectedTextId);

	$: selectedParagraph =
		report?.rdt?.find((d) => d.id === paragraphId) ||
		report?.acuteTox?.find((d) => d.id === paragraphId);
	// $: console.log('selectedParagraph', selectedParagraph);

	$: scraped = $page.url.searchParams.get('scraped') === 'true';
	$: console.log('scraped', scraped);
</script>

{#if paragraphId}
	{#if selectedParagraph}
		<Paragraph
			{scraped}
			type={selectedParagraph?.type}
			pid={paragraphId}
			reportId={report.id}
			paragraphText={selectedParagraph?.txt}
		></Paragraph>
	{:else}
		<div class="text-xl m-auto">Paragraph not found</div>
	{/if}
{:else if report}
	<PreviewReports
		{scraped}
		rdt={report?.rdt}
		acuteTox={report?.acuteTox}
		pid={paragraphId}
		text={report?.text}
		{selectedTextId}
	></PreviewReports>
{:else}
	<div class="text-xl m-auto">Report not found</div>
{/if}
