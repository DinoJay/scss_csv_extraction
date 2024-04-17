<script lang="ts">
	import OpenAI from 'openai';
	import endpoints from '$lib/endpoints';

	export let selected;
	export let onClick;
	export let title;
	export let text;

	let loadingResponse = false;

	let question = '';
	let response = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,
		dangerouslyAllowBrowser: true
	});

	let variables = [];
	let selectedEndpoint = endpoints[0].name;

	$: cols = endpoints.find((d) => d.name === selectedEndpoint)?.cols.join(',');
	$: colsText = `create a table with html table element and no other text with the following columns and extract the information from the text: ${cols}`;

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
			});
	};
</script>

<div
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			onClick();
		}
	}}
	on:click={() => {
		onClick();
		response = null;
	}}
	tabindex="0"
	role="button"
	class=" mb-3"
>
	<div>
		<h2 class="text-lg mb-2">{title}</h2>

		<p
			class="p-2 whitespace-pre-wrap border-2"
			class:border-fuchsia-300={selected}
			class:border-fuchsia-200={!selected}
		>
			{text}
		</p>
	</div>
	{#if selected}
		<div class="flex flex-col">
			<div class="mt-3">
				<div class="flex gap-2">
					{#each endpoints as e}
						<button class="p-2 border-2 flex-1">{e.name}</button>
					{/each}
				</div>

				<div class=" flex my-2">
					<input
						on:change={(e) => {
							question = e.target.value;
						}}
						placeholder="ChatGPT question"
						type="text"
						class="border-2 border-gray p-2 flex-grow"
					/>
				</div>
				<button
					class="w-full p-2 border-2"
					on:click={() => setChatGPTContext([text, colsText])}
					type="button"
				>
					Submit
				</button>
			</div>
			{#if loadingResponse}
				<div class="w-full flex min-h-44">
					<div class="m-auto">Loading...</div>
				</div>
			{:else if response}
				<div class="w-full flex min-h-44 overflow-auto">
					<p class="bg mt-2 p-1" style:background="#cae6ea">
						{@html response.choices[0].message.content}
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
