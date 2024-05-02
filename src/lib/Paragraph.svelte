<script lang="ts">
	import OpenAI from 'openai';
	import endpoints from '$lib/endpoints';
	import EndpointNav from './EndpointNav.svelte';

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

	const genQuery = (cols) =>
		`create a html table (using only the table element) with following columns finding the information for the rows in the text given. don't include any commentary text: ${cols}. Please `;
	let selEndpoint = endpoints[0].name;
	let question = genQuery(endpoints[0].cols);

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
</script>

<div
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			// onClick();
		}
		// e.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}}
	on:click={(e) => {
		// onClick();
		// response = null;
		// console.log('check');
	}}
	tabindex="0"
	role="button"
	class=" mb-3"
>
	<div
		role="button"
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				e.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
			}
		}}
		on:click={(e) => {
			e.stopPropagation();

			e.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
		}}
	>
		<div class="flex">
			<h2 class="text-lg mb-2 flex-1 items-center">{title}</h2>
			<button on:click={onClick}>@</button>
		</div>
		<p
			class="p-2 whitespace-pre-wrap border-2 max-h-56 overflow-hidden"
			class:border-fuchsia-200={selected}
			class:border-fuchsia-100={!selected}
		>
			{text}
		</p>
	</div>
	{#if selected}
		<div class="flex flex-col">
			<div class="mt-3">
				<div class="flex gap-2 overflow-auto">
					<EndpointNav
						endpoints={endpoints.sort((a, b) => (a.path.length > b.path.length ? 1 : -1))}
						{selEndpoint}
						onClick={(e) => {
							selEndpoint = e.name;
							question = genQuery(e.cols.join(';'));
						}}
					></EndpointNav>
				</div>

				<div class=" flex my-2">
					<textarea
						on:change={(e) => {
							question = e.target.value;
						}}
						value={question}
						placeholder="ChatGPT question"
						class="h-32 border-2 border-gray p-2 flex-grow"
					/>
				</div>
				<button
					class="w-full p-2 border-2"
					on:click={() => setChatGPTContext([text, question])}
					type="button"
				>
					Submit
				</button>
			</div>
			<div class="w-full flex">
				{#if chatGPTerror !== null}
					<div class="w-full flex h-44 overflow-auto">
						<p class="text-red-500">{chatGPTerror}</p>
					</div>
				{/if}
				<div class="w-full flex">
					{#if loadingResponse}
						<div class="h-44 flex w-full">
							<div class="m-auto">Loading...</div>
						</div>
					{:else if response}
						<p class="bg mt-2 p-1 min-h-44 overflow-auto" style:background="#cae6ea">
							{@html response.choices[0].message.content}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
