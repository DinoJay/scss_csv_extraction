<script lang="ts">
	import { paragraphQuery } from './chatGPTparagraphQueries';
	import OpenAI from 'openai';
	import endpoints from '$lib/endpoints';
	import EndpointNav from './EndpointNav.svelte';

	import chatGPTApiOptions from './chatGPTApiOptions';
	import Extendable from './Extendable.svelte';
	import EndpointList from './EndpointList.svelte';
	import ChatGptResult from './ChatGPTResult.svelte';

	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';

	import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
	import ChatGptCustomTextField from './ChatGPTCustomTextField.svelte';
	import { onMount } from 'svelte';
	export let paragraphText;
	export let reportId;
	export let pid;
	export let scraped;
	export let type;

	let responses: any[] | null = null;
	let customResponse: string | null = null;
	let chatGPTerror: null = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,

		dangerouslyAllowBrowser: true
	});

	let selEndpoints = [endpoints[0].name];

	$: question = paragraphQuery(
		selEndpoints
			.map((n) => endpoints.find((d) => d.name === n))
			.flatMap((e) => e?.cols)
			.join(', '),
		paragraphText
	);
	$: prompts = selEndpoints
		.flatMap((n) => endpoints.find((d) => d.name === n)?.cols)
		.map((c) => paragraphQuery([c], paragraphText));

	$: cols = selEndpoints.flatMap((n) => endpoints.find((d) => d.name === n)?.cols);

	$: console.log('prompts', prompts);

	$: setChatGPTContext = (array: any[]) => {
		const messages = array.map((p) => ({
			role: 'user',
			content: p
		}));

		return openai.chat.completions
			.create({
				messages: [...messages],
				...chatGPTApiOptions

				// presence_penalty: 0
			})
			.catch((err) => {
				chatGPTerror = err;
			});
	};

	$: fetchChatGPT = (array: any[]) => {
		return fetch('/.netlify/functions/chatGPT', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ inputArray: array })
		});
	};
	onMount(() => {
		fetchChatGPT(prompts).then((d) => {
			console.log('chatGPT', d);
		});
	});
	// console.log('text', text, question);
	// console.log('page', $page.state);
	// $: console.log('paragraphText', paragraphText);

	let completionCount = 0;
	const submitChatGPTQuery = (prompts) => {
		responses = null;
		Promise.all(
			prompts.map((p) =>
				setChatGPTContext([p]).then((d) => {
					completionCount = completionCount + 1;
					return d?.choices[0].message.content;
				})
			)
		).then((res) => {
			completionCount = 0;
			responses = res;
		});
	};

	$: console.log('completion Count', completionCount);
</script>

<div class="flex items-center mb-3">
	<a href={`/${reportId}?scraped=${scraped}`} style="width:20px;height:20px">
		<MdArrowBack></MdArrowBack>
	</a>
	<h1 class="text-xl ml-2">{reportId}/{pid}</h1>
</div>
<p
	class="p-2 mb-3 whitespace-pre-wrap border-2 overflow-auto text-gray-700 h-48 flex-auto 2xl:max-h-96"
>
	{paragraphText}
</p>
<div class="mb-auto">
	<Extendable title="Select Endpoints" preClosed={true}>
		<EndpointNav
			endpoints={endpoints.sort((a, b) => (a.path.length > b.path.length ? 1 : -1))}
			{selEndpoints}
			onClick={(e) => {
				if (selEndpoints.includes(e.name)) {
					if (selEndpoints.length > 1) selEndpoints = selEndpoints.filter((s) => s !== e.name);
				} else {
					selEndpoints = [...selEndpoints, e.name];
				}
			}}
		></EndpointNav>
	</Extendable>
</div>
<EndpointList
	endpoints={selEndpoints}
	cls="mt-3"
	onClick={(e) => {
		if (selEndpoints.length > 1) selEndpoints = selEndpoints.filter((s) => s !== e);
	}}
></EndpointList>

<div class="  mt-2 text-gray-700">
	{#key question}
		<ChatGptCustomTextField
			defaultQuestion={question}
			onClick={(q) => {
				pushState('', { showModalCustom: true });
				customResponse = null;
				setChatGPTContext([paragraphText, q]).then((d) => {
					customResponse = d?.choices[0].message.content;
					console.log('customResponse', customResponse);
				});
			}}
		/>
	{/key}
</div>
<div class="w-full flex">
	{#if chatGPTerror !== null}
		<div class="w-full flex h-44 overflow-auto">
			<p class="text-red-500">{chatGPTerror}</p>
		</div>
	{/if}
</div>
{#key customResponse}
	<ChatGptResult
		edit={false}
		{type}
		{pid}
		paragraph={paragraphText}
		{prompts}
		title="ChatGPT Custom Result"
		onClose={() => {
			pushState('', { showModalCustom: false });
			customResponse = null;
		}}
		open={$page.state.showModalCustom}
		responses={customResponse ? [customResponse] : null}
	/>
{/key}
{#key responses?.join(',')}
	<ChatGptResult
		{type}
		{pid}
		paragraph={paragraphText}
		completionPerc={Math.round((completionCount / prompts.length) * 100)}
		{prompts}
		{cols}
		title="ChatGPT Result - {selEndpoints.join(', ')}"
		onClose={() => pushState('', { showModal: false })}
		open={$page.state.showModal}
		onSubmit={() => {
			console.log('page', $page.state.showModal);
			submitChatGPTQuery(prompts);
		}}
		{responses}
	/>
{/key}

<button
	class="w-full p-2 border-2 mt-2 flex items-center justify-center"
	on:click={() => {
		pushState('', { showModal: true });
		submitChatGPTQuery(prompts);
	}}
	type="button"
>
	<span class="mr-1">Query ChatGPT</span>
	<img src="/chatgpt.svg" width="25" alt="chatgpt" />
</button>
