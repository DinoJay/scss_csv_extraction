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
</div>
