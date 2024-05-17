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
	// console.log('scr', scr, typeof scr);
	// $: console.log('props', data);
	// fetch(`/scss_o_044.txt`)
	// 	.then((response) => response.text())
	// 	.then((text) => {
	// 		console.log('textsss', text.slice(0, 50));
	// 		// console.log('textId', textId, 'text', text.slice(0, 20))
	// 		// const acuteTox = scrapeAcuteTox(text, textId);
	// 		// const rdt = scrapeRDT(text, textId);
	// 		// console.log('rdt', rdt)
	// 		// updateStore({ rdt, acuteTox, text, oriinalTextIds: textIds })
	// 		// return { rdt, acuteTox, text, originalTextIds: textIds }
	// 		return { rdt: [], acuteTox: [], txt: text, originalTextIds: textIds };
	// 	});
	// $: console.log('originalTxtsMap', originalTxtsMap);
	$: console.log('scraped', scraped);
</script>

{#if paragraphId}
	{#if selectedParagraph}
		<Paragraph
			{scraped}
			type={selectedParagraph?.type}
			pid={paragraphId}
			reportId={report.id}
			text={selectedParagraph?.txt}
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
