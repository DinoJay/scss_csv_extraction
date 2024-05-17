<script lang="ts">
	import OpenAI from 'openai';
	import endpoints from '$lib/endpoints';
	import EndpointNav from './EndpointNav.svelte';
	import LightBox from './LightBox.svelte';

	import Spinner from './Spinner.svelte';
	import Extendable from './Extendable.svelte';
	import EndpointList from './EndpointList.svelte';
	import ChatGptResult from './ChatGPTResult.svelte';

	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';

	import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
	export let selected;
	export let text;
	export let reportId;
	export let pid;
	export let scraped;
	export let type;

	let loadingResponse = false;

	let response = null;
	let chatGPTerror = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,

		dangerouslyAllowBrowser: true
	});

	// console.log('text', text);
	// const genQuery = (cols) =>
	// 	`create a html table (using only the table element) with following columns finding the information for the rows in the text given.
	// 	don't include any commentary text: ${cols}. Please `;
	const genQuery2 = (cols) =>
		`create a csv table with following columns: ${cols}. You find the information to fill in the csv in the text given. 
		Please, don't include data for which you can't find any answer. all rows in the csv should be meaningful. Please use "," as delimiter. Finally, don't include any commentary text and duplicate data. Please!`;
	let selEndpoints = [endpoints[0].name];
	$: question = genQuery2(
		selEndpoints
			.map((n) => endpoints.find((d) => d.name === n))
			.flatMap((e) => e.cols)
			.join(';')
	);

	$: setChatGPTContext = (array) => {
		const messages = array.map((p) => ({
			role: 'user',
			content: p
		}));

		loadingResponse = true;
		openai.chat.completions
			.create({
				model: 'gpt-3.5-turbo',
				messages: [
					// {
					// 	role: 'user',
					// 	content: question
					// },
					...messages
				],
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			})
			.then((d) => {
				loadingResponse = false;
				// console.log('d', d);
				response = d;
				// match(/```html\n([\s\S]*?)\n```/g)[0]
				// console.log('response', response.choices[0].message.content);
				chatGPTerror = null;
			})
			.catch((err) => {
				chatGPTerror = err;
				// console.log(error);
			});
	};

	// console.log('text', text, question);
	console.log('page', $page.state);
	console.log('type', type);
</script>

<div class="flex-1 overflow-auto flex flex-col">
	<div class="flex items-center mb-3">
		<a href={`/${reportId}?scraped=${scraped}`} style="width:20px;height:20px">
			<MdArrowBack></MdArrowBack>
		</a>
		<h1 class="text-xl ml-2">{reportId}/{pid}</h1>
	</div>
	<p
		class="p-2 mb-3 whitespace-pre-wrap border-2 max-h-72 overflow-auto text-gray-700"
		class:border-fuchsia-200={selected}
		class:border-fuchsia-100={!selected}
	>
		{text}
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
		<Extendable title="ChatGPT Prompt">
			<textarea
				on:change={(e) => {
					question = e.target.value;
				}}
				value={question}
				placeholder="ChatGPT question"
				class="h-32 w-full border-2 border-gray p-2 flex-grow"
			/>
		</Extendable>
	</div>
</div>
<div class="w-full flex">
	{#if chatGPTerror !== null}
		<div class="w-full flex h-44 overflow-auto">
			<p class="text-red-500">{chatGPTerror}</p>
		</div>
	{/if}

	{#key response?.choices?.[0].message?.content}
		<ChatGptResult
			{type}
			{pid}
			title="ChatGPT Result - {selEndpoints.join(',')}"
			onClose={() => pushState('', { showModal: false })}
			open={$page.state.showModal}
			onSubmit={() => {
				console.log('page', $page.state.showModal);
				// pushState('', { showModal: true });

				setChatGPTContext([text, question]);
			}}
			response={response?.choices?.[0].message?.content}
			{loadingResponse}
		></ChatGptResult>
	{/key}
</div>

<button
	class="w-full p-2 border-2 mt-2"
	on:click={() => {
		pushState('', { showModal: true });
		setChatGPTContext([text, question]);
	}}
	type="button"
>
	Submit
</button>
