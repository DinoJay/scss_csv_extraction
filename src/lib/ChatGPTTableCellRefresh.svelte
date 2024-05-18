<script>
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
	import OpenAI from 'openai';
	import Spinner from './Spinner.svelte';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';
	import LightBox from './LightBox.svelte';
	import ChatGptExplanationModal from './ChatGPTExplanationModal.svelte';

	export let onChange;
	export let context;
	export let key;
	export let value;
	export let paragraph;

	let loadingResponse0 = false;
	let loadingResponse1 = false;

	let textPassages = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,

		dangerouslyAllowBrowser: true
	});

	$: question0 = `Find information for "${key}" in the given text. Don't include commentary text. Be concise and to the point! if you can't find an answer, respond with an "-"`;

	$: setChatGPTContext = (array) => {
		const messages = array.map((p) => ({
			role: 'user',
			content: p
		}));

		return openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [...messages],
			temperature: 0.2,
			// max_tokens: 256,
			// top_p: 1,
			frequency_penalty: -1
			// temperature: 1,
			// max_tokens: 256,
			// top_p: 1,
			// frequency_penalty: 0,
			// presence_penalty: 0
		});
	};
</script>

<button
	style="width:18px;height:18px"
	on:click={() => {
		loadingResponse0 = true;
		setChatGPTContext([...context, question0]).then((resp) => {
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
		const question1 = `Provide a text passage found in "${paragraph}" which were used as input to inform the response for the previous user command namely "${question0}". Run several iterations to find th Don't respond with an empty text passage such as \'\'. If you can't find an answer, respond with an "-". don't include any command string such as \`\`\`javascript`;

		// console.log('question', question1);
		loadingResponse1 = true;
		setChatGPTContext([...context, question0, question1]).then((resp) => {
			const answer = resp?.choices?.[0].message?.content;
			loadingResponse1 = false;
			textPassages = answer;
		});
	}}
>
	{#if loadingResponse1}
		<Spinner width="15px" height="15px"></Spinner>
	{:else}
		<MdErrorOutline></MdErrorOutline>
	{/if}
</button>

<ChatGptExplanationModal
	title="Source - {key}={value}"
	{paragraph}
	{textPassages}
	onClose={() => (textPassages = null)}
/>
