<script>
	import { onMount } from 'svelte';
	import fetchChatGPT from './fetchChatGPT';
	import { base } from '$app/paths';

	export let baseQuestion;
	export let paragraph;
	export let value;

	let confidence = null;
	onMount(() => {
		// console.log('key', key);
		// console.log('value', value);
		const pr = `You responded "${value}" to the prompt before namely ${baseQuestion}. How certain was your response? Provide the level of confidence in percentage for the response. Respond always with an integer value between 0 and 100! Nothing else!"`;
		fetchChatGPT([pr]).then((resp) => {
			const answer = resp?.choices?.[0].message?.content;
			confidence = answer;
			console.log('confidence', answer);
		});
		// console.log('paragraph', paragraph);
	});

	const colorClass = (confidence) => {
		if (confidence < 60) {
			return 'bg-red-200';
		} else if (confidence < 95) {
			return 'bg-yellow-200';
		} else {
			return 'bg-green-200';
		}
	};
</script>

{#if confidence !== null}
	<div class:px-1={true} class={colorClass(parseInt(confidence.replace('%', '')))}>
		{confidence}%
	</div>
{/if}
