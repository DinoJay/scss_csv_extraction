<script lang="ts">
	import '../app.css';

	export const prerender = false;

	// export let data;

	import Paragraph from '$lib/Paragraph.svelte';

	import { onMount } from 'svelte';

	let allpromiseTxt: Promise<string[]> | null = null;
	let paragraph: number | null = null;

	const scrapeTxt = (txt) => {
		const regexRepeatedDoseToxicity =
			/3\.3\.5\.\s+Repeated dose toxicity[\s\S]*?(?=3\.3\.6\.\s+Mutagenicity \/ Genotoxicity)/;
		const repeatedDoseToxicityTxt = txt.match(regexRepeatedDoseToxicity)?.[0];

		const regexAcuteToxicity =
			/3\.3\.1\.\s+Acute toxicity[\s\S]*?(?=3\.3\.3\.\s+Skin sensitisation)/;
		const acuteToxicityTxt = txt.match(regexAcuteToxicity)?.[0];

		console.log('acuteToxicityTxt\n', acuteToxicityTxt);
		// console.log('repeatedDose\n', repeatedDoseToxicityTxt);

		let pattern = /^Results\s[\s\S]*?Ref\.: \d+\s/gm;

		let matchesRepeatedDoseToxicity = repeatedDoseToxicityTxt
			?.match(pattern)
			?.map((d) => d.substring(10));

		let matchesAcuteToxicity = acuteToxicityTxt?.match(pattern)?.map((d) => d.substring(10));
		console.log('matchesRepeatedDoseToxicity', matchesRepeatedDoseToxicity);

		// console.log('matches', matches);
		return { matchesRepeatedDoseToxicity, matchesAcuteToxicity };
	};

	const textIds = ['scss_o_044', 'scss_o_040', 'scss_o_059', 'scss_o_230'];

	let originalTxtsMap: Map<any, any> | null = null;
	let scrapedTxtsMap: Map<any, any> | null = null;

	let selectedTextId = textIds[0];
	let scraped = false;

	onMount(() => {
		const promise044 = fetch('/sccs_o_044.txt').then((response) => response.text());
		const promise040 = fetch('/sccs_o_040.txt').then((response) => response.text());
		const promise059 = fetch('/sccs_o_059.txt').then((response) => response.text());
		const promise230 = fetch('/sccs_o_230.txt').then((response) => response.text());

		allpromiseTxt = Promise.all([promise044, promise040, promise059, promise230]).then((values) => {
			const tmpMap0 = new Map();
			values.forEach((v, i) => {
				tmpMap0.set(textIds[i], v);
			});
			originalTxtsMap = tmpMap0;

			const tmpMap1 = new Map();
			values.forEach((v, i) => {
				tmpMap1.set(textIds[i], scrapeTxt(v));
			});
			scrapedTxtsMap = tmpMap1;
		});
	});

	const convertIter = (m) => (m ? [...m?.entries()] : []);
</script>

<div class="flex h-screen">
	<div class="p-3 max-w-prose mx-auto flex flex-auto flex-col">
		{#await allpromiseTxt}
			...Loading
		{:then _}
			<div class="flex gap-2 mb-3">
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
			{#if scraped}
				<div class="flex-1 overflow-auto">
					<h1 class="text-xl mb-3">Repeated Dose Toxicity</h1>
					{#each scrapedTxtsMap?.get(selectedTextId).matchesRepeatedDoseToxicity as p, i}
						<Paragraph
							selected={paragraph === i}
							title={`Study ${i + 1}`}
							text={p}
							onClick={() => (paragraph = i)}
						></Paragraph>
					{/each}
					<h1 class="text-xl mb-3">Acute Dose Toxicity</h1>
					{#each scrapedTxtsMap?.get(selectedTextId).matchesAcuteToxicity as p, i}
						<Paragraph
							selected={paragraph === i}
							title={`Study ${i + 1}`}
							text={p}
							onClick={() => (paragraph = i)}
						></Paragraph>
					{/each}
				</div>
			{/if}
			{#if !scraped}
				<div class="whitespace-pre-wrap flex-1 overflow-auto">
					{originalTxtsMap?.get(selectedTextId)}
				</div>
			{/if}
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
