<script>
	import LoadingReports from '$lib/LoadingReports.svelte';
	import { store } from '$lib/store/index';
	import { page } from '$app/stores';
	import PreviewReports from '$lib/PreviewReports.svelte';
	import Paragraph from '$lib/Paragraph.svelte';

	// const scrapedTxtsMap = data.scrapedTxtsMap;
	// const originalTxtsMap = data.originalTxtsMap;
	export let data;

	console.log('data', data, 'selectedTextId', selectedTextId, 'page', $page);
	$: selectedTextId = $page.params.textId;
	$: paragraphId = $page.url.searchParams.get('pid');
	$: report = data.scrapedTxtsMap?.get(selectedTextId);

	$: console.log('paragraphId', paragraphId);

	$: selectedParagraph =
		report?.rdt?.find((d) => d.id === paragraphId) ||
		report?.acuteTox?.find((d) => d.id === paragraphId);
	// $: console.log('selectedParagraph', selectedParagraph);

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
	$: console.log('reportId', report);
</script>

{#if paragraphId}
	{#if selectedParagraph}
		<Paragraph pid={paragraphId} reportId={report.id} text={selectedParagraph?.txt}></Paragraph>
	{:else}
		<div class="text-xl m-auto">Paragraph not found</div>
	{/if}
{:else if report}
	<PreviewReports
		rdt={report?.rdt}
		acuteTox={report?.acuteTox}
		text={report?.text}
		originalTextIds={report?.originalTextIds}
		{selectedTextId}
	></PreviewReports>
{:else}
	<div class="text-xl m-auto">Report not found</div>
{/if}
