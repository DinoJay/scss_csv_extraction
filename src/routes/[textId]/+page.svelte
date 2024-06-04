<script>
	import { page } from '$app/stores';
	import PreviewReports from '$lib/PreviewReports.svelte';

	export let data;

	$: selectedTextId = $page.params.textId;
	$: paragraphId = $page.params.pid;
	$: report = data.scrapedTxtsMap?.get(selectedTextId);

	$: selectedParagraph =
		report?.rdt?.find((d) => d.id === paragraphId) ||
		report?.acuteTox?.find((d) => d.id === paragraphId);
	// $: console.log('selectedParagraph', selectedParagraph);

	$: scraped = $page.url.searchParams.get('scraped') === 'true';
</script>

{#if report}
	<PreviewReports
		{scraped}
		rdt={report?.rdt}
		acuteTox={report?.acuteTox}
		pid={paragraphId}
		text={report?.text}
		{selectedTextId}
	></PreviewReports>
{:else}
	<div class="text-xl m-auto">Report not found!</div>
{/if}
