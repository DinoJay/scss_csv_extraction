<script lang="ts">
	import { paragraphQuery } from './chatGPTparagraphQueries';
	import fetchChatGPT from './fetchChatGPT';
	import endpoints from '$lib/endpoints';
	import EndpointNav from './EndpointNav.svelte';

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

	let selEndpointNames = [endpoints[0].name];

	$: selEndpoints = selEndpointNames.map((n) => endpoints.find((d) => d.name === n));

	$: question = paragraphQuery(selEndpoints.flatMap((e) => e?.cols).join(', '), paragraphText);

	$: prompts = selEndpoints.flatMap((e) =>
		e.cols.map((c) => paragraphQuery([c], paragraphText, e.name))
	);

	$: cols = selEndpoints.flatMap((e) => e?.cols);

	$: console.log('prompts', prompts);

	$: console.log('selEndpoints', selEndpoints);
	// console.log('page', $page.state);
	// $: console.log('paragraphText', paragraphText);

	let completionCount = 0;
	const submitChatGPTQuery = (prompts) => {
		responses = null;
		Promise.all(
			prompts.map((p) =>
				fetchChatGPT([p]).then((d) => {
					completionCount = completionCount + 1;
					return d?.choices[0].message.content;
				})
			)
		)
			.then((res) => {
				completionCount = 0;
				responses = res;
			})
			.catch((e) => {
				completionCount = 0;
				chatGPTerror = e;
			});
	};
</script>

<div class="flex items-center mb-3">
	<a href={`/${reportId}?scraped=${scraped}`} style="width:20px;height:20px">
		<MdArrowBack></MdArrowBack>
	</a>n
	<h1 class="text-xl ml-2">{reportId}/{pid.replace(`${reportId}-`, '')}</h1>
</div>
<p class="p-2 mb-3 whitespace-pre-line border-2 overflow-auto text-gray-700 h-40 2xl:max-h-96">
	{paragraphText.replace(/\r/g, '\n')}
</p>
<div class="mb-auto">
	<Extendable title="Select Endpoints" preClosed={true}>
		<EndpointNav
			endpoints={endpoints.sort((a, b) => (a.path.length > b.path.length ? 1 : -1))}
			selEndpoints={selEndpointNames}
			onClick={(e) => {
				if (selEndpointNames.includes(e.name)) {
					if (selEndpoints.length > 1)
						selEndpointNames = selEndpointNames.filter((s) => s !== e.name);
				} else {
					selEndpointNames = [...selEndpointNames, e.name];
				}
			}}
		></EndpointNav>
	</Extendable>
</div>
<EndpointList
	endpoints={selEndpointNames}
	cls="mt-3"
	onClick={(e) => {
		if (selEndpointNames.length > 1) selEndpointNames = selEndpointNames.filter((s) => s !== e);
	}}
></EndpointList>

<div class="  mt-2 text-gray-700">
	{#key question}
		<ChatGptCustomTextField
			defaultQuestion={question}
			onClick={(q) => {
				pushState('', { showModalCustom: true });
				customResponse = null;
				fetchChatGPT([paragraphText, q]).then((d) => {
					customResponse = d?.choices[0].message.content;
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
		endpoints={selEndpoints}
		{prompts}
		{cols}
		title="ChatGPT Custom Result"
		onClose={() => {
			completionCount = 0;
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
		endpoints={selEndpoints}
		completionPerc={Math.round((completionCount / prompts.length) * 100)}
		{prompts}
		{cols}
		title="ChatGPT Result - {selEndpointNames.join(', ')}"
		onClose={() => pushState('', { showModal: false })}
		open={$page.state.showModal}
		onSubmit={() => {
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
