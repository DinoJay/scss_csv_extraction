<script lang="ts">
	import LightBox from './LightBox.svelte';
	import ParagraphPreview from './ParagraphPreview.svelte';
	import Paragraph from './Paragraph.svelte';
	import Modal from './Modal.svelte';

	import '../app.css';

	export const prerender = false;

	// export let data;

	import { onMount } from 'svelte';

	let allpromiseTxt: Promise<string[]> | null = null;
	let paragraph: number | null = null;

	const scrapeRDT = (txt) => {
		const regexRepeatedDoseToxicity =
			/3\.3\.5[\.]*\s+Repeated dose toxicity[\s\S]*?(?=3\.3\.6[\.]*\s+Mutagenicity \/ Genotoxicity)/g;
		// const regexRepeatedDoseToxicity = /.*/;

		const rdtMatches = [...txt.matchAll(regexRepeatedDoseToxicity)];
		const rdtText = rdtMatches[rdtMatches.length - 1]?.[0];
		// console.log('rdtText\n', rdtText);

		let pattern = /Guideline:[\s\S]*?Ref\.*:* \d+\s/gm;

		let matchesRDT = rdtText?.match(pattern);
		// console.log('matchesRDTGuideline\n', matchesRDT);
		// ?.map((d) => d.substring(10));

		// console.log('matches rdt', [...txt.matchAll(regexRepeatedDoseToxicity)]);
		return matchesRDT;
	};

	const scrapeAcuteTox = (txt) => {
		const regexAcuteToxicity =
			/3\.3\.1[\.]*\s+Acute toxicity[\s\S]*?(?=3\.3\.2[\.]*\s*Irritation and corrosivity)/g;

		// const regex = /3\.3\.1\s+Acute\s+toxicity\s*([\s\S]*?)3\.3\.2\s+Irritation\s+and\s+corrosivity/;

		const acuteToxMatches = txt.matchAll(regexAcuteToxicity);
		const acuteToxicityTxt = [...acuteToxMatches][acuteToxMatches.length - 1]?.[0];
		console.log('acuteToxicityTxt\n', [...acuteToxMatches]);

		// console.log('acuteToxicityTxt\n', acuteToxicityTxt);
		let pattern = /Guideline:[\s\S]*?Ref\.*:* \d+\s/gm;
		// let pattern = /Guideline:[\s\S]*?Ref\.:.*?(?=\n|$)/g;
		// console.log('repeatedDose\n', repeatedDoseToxicityTxt);

		let matchesAcuteToxicity = acuteToxicityTxt?.match(pattern);
		// console.log('matchesAcuteToxicity\n', matchesAcuteToxicity);
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

	let originalTxtsMap: Map<any, any> | null = null;
	let scrapedTxtsMap: Map<any, any> | null = null;

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
			fetch('/sccs_o_195.txt').then((response) => response.text()),
			fetch('/sccs_o_222.txt').then((response) => response.text())
			// const promise230 = fetch('/sccs_o_230.txt').then((response) => response.text());
		];

		allpromiseTxt = Promise.all([...prs]).then((values) => {
			const tmpMap0 = new Map();
			values.forEach((v, i) => {
				tmpMap0.set(textIds[i], v);
			});
			originalTxtsMap = tmpMap0;

			const tmpMap1 = new Map();
			values.forEach((v, i) => {
				tmpMap1.set(textIds[i], { rdt: scrapeRDT(v), acuteTox: scrapeAcuteTox(v) });
			});
			scrapedTxtsMap = tmpMap1;
		});
	});

	const convertIter = (m) => (m ? [...m?.entries()] : []);

	$: selector = (t) => t === paragraph || paragraph === null;

	$: console.log('scrapedmap', scrapedTxtsMap);
	$: acuteTox = scrapedTxtsMap?.get(selectedTextId)?.acuteTox;
	$: rdt = scrapedTxtsMap?.get(selectedTextId)?.rdt;

	$: getSelectedParagraph = (p) => {
		const inRdt = rdt?.find((d) => d === p);
		const inAcute = acuteTox?.find((d) => d === p);

		if (inRdt) {
			return { txt: inRdt, type: 'RDT', index: rdt.indexOf(inRdt) + 1 };
		} else if (inAcute) {
			return { txt: inAcute, type: 'Acute Toxicity', index: acuteTox.indexOf(inAcute) + 1 };
		}
	};
	$: selectedParagraph = getSelectedParagraph(paragraph);

	// $: onTextClick = (i) => (selectedTextId = selectedTextId === textIds[i] ? null : textIds[i]);
</script>

<div class="flex h-screen">
	<div class="p-3 max-w-prose mx-auto flex flex-auto flex-col py-2">
		{#await allpromiseTxt}
			...Loading
		{:then _}
			<div class="flex gap-2 mb-3 overflow-auto">
				{#each convertIter(originalTxtsMap) as [key, txt]}
					<button
						class="border-2 p-2 flex-1"
						on:click={() => {
							selectedTextId = key;
							scraped = false;
							paragraph = null;
						}}
						class:bg-blue-300={selectedTextId === key}>{key}</button
					>
				{/each}
			</div>
			<div class="flex-1 flex overflow-auto bg-gray-50 p-2">
				{#if scraped}
					<div class="flex-1 overflow-auto p-3">
						{#if rdt?.length !== 0}
							<h1 class="text-xl mb-3">Repeated Dose Toxicity</h1>
						{/if}
						{#each rdt as p, i}
							<ParagraphPreview
								selected={paragraph === p}
								title={`Study ${i + 1}`}
								text={p}
								onClick={() => (paragraph = p)}
							></ParagraphPreview>
						{/each}

						{#if acuteTox?.length !== 0}
							<h1 class="text-xl mb-3">Acute Dose Toxicity</h1>
						{/if}
						{#each acuteTox as p, i}
							<ParagraphPreview
								selected={paragraph === p}
								title={`Study ${i + 1}`}
								text={p}
								onClick={() => (paragraph = p)}
							></ParagraphPreview>
						{/each}
					</div>
				{/if}
				<LightBox
					title={`${selectedTextId} - ${selectedParagraph?.type} - Study ${selectedParagraph?.index}`}
					isOpen={paragraph !== null}
					close={() => (paragraph = null)}
				>
					<Paragraph title={selectedTextId} text={paragraph} />
				</LightBox>
				{#if !scraped}
					<div class="whitespace-pre-wrap flex-1 overflow-auto">
						{originalTxtsMap?.get(selectedTextId)}
					</div>
				{/if}
			</div>
			<button
				class="p-2 border-2 0 mt-3"
				on:click={() => (scraped = !scraped)}
				class:bg-yellow-200={!scraped}
				class:bg-green-200={scraped}>{scraped ? 'Scraped' : 'Scrape'}</button
			>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>
