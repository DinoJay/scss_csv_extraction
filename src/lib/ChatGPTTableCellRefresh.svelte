<script>
	import { csvFormat } from 'd3-dsv';
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
	import OpenAI from 'openai';
	import Spinner from './Spinner.svelte';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';
	import LightBox from './LightBox.svelte';
	import ChatGptExplanationModal from './ChatGPTExplanationModal.svelte';
	import chatGPTApiOptions from './chatGPTApiOptions';
	import { paragraphQuery } from './chatGPTparagraphQueries';
	import { onMount } from 'svelte';

	export let onChange;
	export let context;
	export let key;
	export let value;
	export let paragraph;

	let loadingResponse0 = false;
	let loadingResponse1 = false;

	/**
	 * @type {string | null}
	 */
	let quote = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,

		dangerouslyAllowBrowser: true
	});

	$: question0 = paragraphQuery(key, paragraph);

	$: setChatGPTContext = (array, opts) => {
		const messages = array.map((p) => ({
			role: 'user',
			content: p
		}));

		return openai.chat.completions.create({
			...chatGPTApiOptions,
			...opts,
			model: 'gpt-4o',
			messages
		});
	};

	let confidence = '';
	// onMount(() => {
	// 	// console.log('key', key);
	// 	// console.log('value', value);
	// 	const pr = `What is the level of confidence in percentage (0%-100%) at answering "${question0}. Respond only with a numeric percentage value!"`;
	// 	setChatGPTContext([pr]).then((resp) => {
	// 		const answer = resp?.choices?.[0].message?.content;
	// 		confidence = answer;
	// 		console.log('confidence', answer);
	// 	});
	// 	// console.log('paragraph', paragraph);
	// });
</script>

<button
	style="width:18px;height:18px"
	on:click={() => {
		loadingResponse0 = true;
		setChatGPTContext([question0]).then((resp) => {
			// console.log('context', context);
			const answer = resp?.choices?.[0].message?.content;
			loadingResponse0 = false;
			onChange(answer);
		});
	}}
>
	{#if loadingResponse0}
		<Spinner width="15px" height="15px"></Spinner>
	{:else}
		<MdRefresh></MdRefresh>
	{/if}
</button>

<button
	style="width:18px;height:18px"
	on:click={() => {
		const question1 = `Provide a text quote from "${paragraph}" that was used to answer the previous user command namely "${question0}". Don't respond with any commentary or introduction text! Only respond with the exact quote as string. Don't use "" to wrap the quote!`;

		// console.log('question', question1);
		loadingResponse1 = true;
		setChatGPTContext([question1]).then((resp) => {
			const answer = resp?.choices?.[0].message?.content;
			// const js = answer ? Object.values(JSON.parse(answer)) : null;

			// console.log('answer', answer);
			loadingResponse1 = false;
			quote = answer;
		});
	}}
>
	{#if loadingResponse1}
		<Spinner width="15px" height="15px"></Spinner>
	{:else}
		<MdErrorOutline></MdErrorOutline>
	{/if}
</button>
<!-- <div>{confidence}</div> -->

<ChatGptExplanationModal
	title="Source - {key.replace(/_/g, ' ')}"
	{paragraph}
	{quote}
	onClose={() => (quote = null)}
/>
