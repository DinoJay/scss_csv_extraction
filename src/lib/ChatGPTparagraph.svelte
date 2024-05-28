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

	const genQueryDetailed = (cols: string | string[] | undefined) =>
		`Create a csv table with following column headers: "${cols}". The information to fill in the csv has to be extracted from the text given before "${paragraphText.slice(0, 50)}...". Use "," as delimiter. 
		If the answer is not present in the text, respond with an "-". Respond with an csv row only. Make sure that each answer that you provide for a cell adheres to the semantics of the coressponding the column name.  
		Don't include any commentary text or command strings such as "\`\`\`csv"! Your response must be a text string in valid csv format including the column header row correctly formatted. 
		`;

	let selEndpoints = [endpoints[0].name];

	$: question = paragraphQuery(
		selEndpoints
			.map((n) => endpoints.find((d) => d.name === n))
			.flatMap((e) => e?.cols)
			.join(', '),
		paragraphText
	);
	$: prompts = selEndpoints
		.map((n) => endpoints.find((d) => d.name === n)?.cols)
		.map((cols) => paragraphQuery(cols, paragraphText));

	$: setChatGPTContext = (array: any[]) => {
		const messages = array.map((p) => ({
			role: 'user',
			content: p
		}));

		// loadingResponse = true;
		return (
			openai.chat.completions
				.create({
					messages: [...messages],
					...chatGPTApiOptions

					// presence_penalty: 0
				})
				// .then((d) => {
				// 	// loadingResponse = false;
				// 	response = d;
				// 	chatGPTerror = null;
				// })
				.catch((err) => {
					chatGPTerror = err;
				})
		);
	};

	// console.log('text', text, question);
	// console.log('page', $page.state);
	// $: console.log('paragraphText', paragraphText);
</script>

<div class="flex-1 overflow-auto flex flex-col">
	<div class="flex items-center mb-3">
		<a href={`/${reportId}?scraped=${scraped}`} style="width:20px;height:20px">
			<MdArrowBack></MdArrowBack>
		</a>
		<h1 class="text-xl ml-2">{reportId}/{pid}</h1>
	</div>
	<p class="p-2 mb-3 whitespace-pre-wrap border-2 max-h-72 overflow-auto text-gray-700">
		{paragraphText}
	</p>
	<div class="gap-2 mb-auto">
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
		<EndpointList
			endpoints={selEndpoints}
			cls="mt-3"
			onClick={(e) => {
				if (selEndpoints.length > 1) selEndpoints = selEndpoints.filter((s) => s !== e);
			}}
		></EndpointList>
	</div>

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
		{prompts}
		title="ChatGPT Result - {selEndpoints.join(', ')}"
		onClose={() => pushState('', { showModal: false })}
		open={$page.state.showModal}
		onSubmit={() => {
			console.log('page', $page.state.showModal);
			responses = null;

			// pushState('', { showModal: true });

			//TODO:
			Promise.all(prompts.map((p) => setChatGPTContext([paragraphText, p]))).then((d) => {
				console.log('done', d);
				responses = d.map((d) => d?.choices[0].message.content);
			});
		}}
		{responses}
	/>
{/key}

<button
	class="w-full p-2 border-2 mt-2 flex items-center justify-center"
	on:click={() => {
		pushState('', { showModal: true });
		responses = null;
		Promise.all(prompts.map((p) => setChatGPTContext([paragraphText, p]))).then((d) => {
			// loadingResponse = false;
			console.log('done', d);
			responses = d.map((d) => d?.choices[0].message.content);
			// response = d;
			// chatGPTerror = null;
		});
	}}
	type="button"
>
	<span class="mr-1">Query ChatGPT</span>
	<img src="/chatgpt.svg" width="25" alt="chatgpt" />
</button>
