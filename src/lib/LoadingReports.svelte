<script lang="ts">
	import LightBox from './LightBox.svelte';
	import ParagraphPreview from './ParagraphPreview.svelte';
	import Paragraph from './Paragraph.svelte';
	import Modal from './Modal.svelte';

	import '../app.css';

	export const prerender = false;

	// export let data;

	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';
	import { store, updateStore } from './store';
	import PreviewReports from './PreviewReports.svelte';

	let allpromiseTxt: Promise<string[]> | null = null;

	export let scrapedTxtsMap;
	export let originalTxtsMap;

	console.log('loadingReports');
	const scrapeRDT = (txt) => {
		const regexRepeatedDoseToxicity =
			/3\.3\.5[\.]*\s+Repeated dose toxicity[\s\S]*?(?=3\.3\.6[\.]*\s+Mutagenicity \/ Genotoxicity)/g;

		const rdtMatches = [...txt.matchAll(regexRepeatedDoseToxicity)];
		const rdtText = rdtMatches[rdtMatches.length - 1]?.[0];

		let pattern = /Guideline:[\s\S]*?Ref\.*:* \d+\s/gm;

		let matchesRDT = [
			...rdtText?.matchAll(pattern).map((d, i) => ({ id: `${selectedTextId}-rdt-${i}`, txt: d[0] }))
		];
		// console.log('matchesRDT\n', matchesRDT);
		return matchesRDT;
	};

	$: console.log('scrapedTxtsMap', scrapedTxtsMap);

	const scrapeAcuteTox = (txt) => {
		const regexAcuteToxicity =
			/3\.3\.1[\.]*\s+Acute toxicity[\s\S]*?(?=3\.3\.2[\.]*\s*Irritation and corrosivity)/g;

		const acuteToxMatches = [...txt.matchAll(regexAcuteToxicity)];
		const acuteToxicityTxt = [...acuteToxMatches][acuteToxMatches.length - 1]?.[0];

		let pattern = /Guideline:[\s\S]*?Ref\.*:*\s\d+\s/gm;

		let matchesAcuteToxicity = [...acuteToxicityTxt?.matchAll(pattern)].map((d, i) => ({
			id: `${selectedTextId}-acute-${i}`,
			txt: d[0]
		}));

		return matchesAcuteToxicity;
	};

	const textIds = [
		'scss_o_044',
		'scss_o_040',
		'scss_o_059',
		'scss_o_082',
		'scss_o_087',
		'scss_o_180',
		'scss_o_195',
		'scss_o_222'
	];

	let selectedTextId = textIds[0];
	let scraped = false;

	onMount(() => {
		const prs = [
			fetch('/sccs_o_044.txt').then((response) => response.text()),
			fetch('/sccs_o_040.txt').then((response) => response.text()),
			fetch('/sccs_o_059.txt').then((response) => response.text()),
			fetch('/sccs_o_082.txt').then((response) => response.text()),
			fetch('/sccs_o_087.txt').then((response) => response.text()),
			fetch('/sccs_o_180.txt').then((response) => response.text()),
			fetch('/sccs_o_195.txt').then((response) => response.text())
			// fetch('/sccs_o_222.txt').then((response) => response.text())
			// const promise230 = fetch('/sccs_o_230.txt').then((response) => response.text());
		];

		allpromiseTxt = Promise.all([...prs]).then((values) => {
			const tmpMap0 = new Map();
			values.forEach((v, i) => {
				tmpMap0.set(textIds[i], v);
			});
			const originalTxtsMap = tmpMap0;

			const tmpMap1 = new Map();
			values.forEach((v, i) => {
				tmpMap1.set(textIds[i], { rdt: scrapeRDT(v), acuteTox: scrapeAcuteTox(v) });
			});
			updateStore({ scrapedTxtsMap: tmpMap1, originalTxtsMap });
		});
	});
</script>

{#if scrapedTxtsMap === undefined}
	<div class="m-auto">
		<Spinner></Spinner>
	</div>
{:else}
	<slot></slot>
	<!-- {:catch error}
	<p>{error.message}</p> -->
{/if}
