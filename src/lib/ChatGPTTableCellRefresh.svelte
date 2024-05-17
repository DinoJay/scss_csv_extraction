<script>
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
	import OpenAI from 'openai';
	import Spinner from './Spinner.svelte';

	export let onChange;
	export let context;
	export let key;

	let loadingResponse = false;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,

		dangerouslyAllowBrowser: true
	});

	$: setChatGPTContext = (array) => {
		const messages = array.map((p) => ({
			role: 'user',
			content: p
		}));

		return openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [...messages],
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0
		});
	};
</script>

<button
	style="width:18px;height:18px"
	on:click={() => {
		const question = `Find information for "${key}" in the given text? Don't include commentary text. Be concise and to the point! if you can't find an answer, respond with an "-"`;

		console.log('question', question);
		loadingResponse = true;
		setChatGPTContext([...context, question]).then((resp) => {
			const answer = resp?.choices?.[0].message?.content;
			loadingResponse = false;
			onChange(answer);
		});
	}}
>
	{#if loadingResponse}
		<Spinner width="15px" height="15px"></Spinner>
	{:else}
		<MdRefresh></MdRefresh>
	{/if}
</button>
