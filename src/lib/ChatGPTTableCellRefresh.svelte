<script>
	import { onMount } from 'svelte';
	import fetchChatGPT from './fetchChatGPT';
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
	import Spinner from './Spinner.svelte';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';
	import ChatGptExplanationModal from './ChatGPTExplanationModal.svelte';
	import ConfidenceLevel from './ConfidenceLevel.svelte';

	export let onChange;
	export let key;
	export let paragraph;
	export let prompt;
	export let value;

	let loadingResponse0 = false;
	let loadingResponse1 = false;

	/**
	 * @type {string | null}
	 */
	let quote = null;

	$: question0 = prompt; //paragraphQuery(key, paragraph);
</script>

<button
	style="width:18px;height:18px"
	on:click={() => {
		loadingResponse0 = true;
		fetchChatGPT([question0]).then((resp) => {
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
		const question1 = `Provide a text quote from "${paragraph}" that is used to answer the following command namely "${question0}". Don't respond with any commentary or introduction text! Only respond with the exact quote as string. Don't use "" to wrap the quote!`;

		// console.log('question', question1);
		loadingResponse1 = true;
		fetchChatGPT([question1]).then((resp) => {
			const answer = resp?.choices?.[0].message?.content;
			// const js = answer ? Object.values(JSON.parse(answer)) : null;

			console.log('answer', answer);
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
<ConfidenceLevel {paragraph} baseQuestion={question0} />

<ChatGptExplanationModal
	title="Source - {key.replace(/_/g, ' ')}"
	{paragraph}
	{quote}
	onClose={() => (quote = null)}
/>
