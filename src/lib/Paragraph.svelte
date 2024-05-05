<script lang="ts">
	import OpenAI from 'openai';
	import endpoints from '$lib/endpoints';
	import EndpointNav from './EndpointNav.svelte';
	import LightBox from './LightBox.svelte';

	import CloseIcon from 'svelte-icons/md/MdClose.svelte';
	import Spinner from './Spinner.svelte';
	import Extendable from './Extendable.svelte';

	export let selected;
	export let onClick;
	export let title;
	export let text;

	let loadingResponse = false;

	let response = null;
	let chatGPTerror = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,

		dangerouslyAllowBrowser: true
	});

	console.log('textPPPPPP', text);

	const genQuery = (cols) =>
		`create a html table (using only the table element) with following columns finding the information for the rows in the text given. don't include any commentary text: ${cols}. Please `;
	let selEndpoints = [endpoints[0].name];
	$: question = genQuery(
		selEndpoints
			.map((n) => endpoints.find((d) => d.name === n))
			.flatMap((e) => e.cols)
			.join(';')
	);
	$: console.log('selEndpoints', selEndpoints);
	$: console.log('question', question);

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
				console.log('d', d);
				response = d;
				// match(/```html\n([\s\S]*?)\n```/g)[0]
				console.log('response', response.choices[0].message.content);
				chatGPTerror = null;
			})
			.catch((err) => {
				chatGPTerror = err;
				// console.log(error);
			});
	};

	console.log('text', text, question);
</script>

<div class="flex-1 overflow-auto flex flex-col">
	<p
		class="p-2 mb-3 whitespace-pre-wrap border-2 max-h-72 overflow-auto text-gray-700"
		class:border-fuchsia-200={selected}
		class:border-fuchsia-100={!selected}
	>
		{text}
	</p>
	<div class="gap-2 mb-auto">
		<Extendable title="Select Endpoints">
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
		<div class="mt-3">
			{#if selEndpoints.length === 0}
				<div class=" text-sm text-gray-500 py-2">No Endpoints Selected</div>
			{/if}
			<div class="flex gap-2 flex-wrap mb-1">
				{#each selEndpoints as e}
					<button
						class="border-2 p-1 text-sm flex items-center"
						on:click={() => {
							if (selEndpoints.length > 1) selEndpoints = selEndpoints.filter((s) => s !== e);
						}}
					>
						<div>{e}</div>
						{#if selEndpoints.length > 1}
							<div style="width:16px;height:16px">
								<CloseIcon />
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="  mt-2 text-gray-700">
		<Extendable title="ChatGPT Prompt" preClosed={true}>
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
	<LightBox
		title="ChatGPT Result - {selEndpoints.join(',')}"
		isOpen={loadingResponse || response}
		close={() => (response = null)}
	>
		<div class="w-full flex">
			{#if loadingResponse}
				<div class="h-44 flex flex-1">
					<div class="m-auto" style="width:20px;height:20px"><Spinner></Spinner></div>
				</div>
			{:else if response}
				<p class="bg mt-2 p-1 overflow-auto" style:background="#cae6ea">
					{@html response.choices[0].message.content}
				</p>
			{/if}
		</div>

		{#if response}
			<button
				class="w-full p-2 border-2 mt-3"
				on:click={() => setChatGPTContext([text, question])}
				type="button"
			>
				Re-Submit
			</button>
		{/if}
	</LightBox>
</div>

<button
	class="w-full p-2 border-2 mt-2"
	on:click={() => setChatGPTContext([text, question])}
	type="button"
>
	Submit
</button>
