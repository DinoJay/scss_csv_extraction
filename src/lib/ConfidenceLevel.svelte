<script>
	import { onMount } from 'svelte';
	import fetchChatGPT from './fetchChatGPT';

	export let baseQuestion;
	export let paragraph;

	let confidence = null;
	onMount(() => {
		// console.log('key', key);
		// console.log('value', value);
		const pr = `How sure are you at answering "${baseQuestion}" by using and refering to thefollowing paragraph "${paragraph}"?. Provide the level of confidence in percentage (0%-100%) for the response. Respond always with an integer value from 0 to 100!"`;
		fetchChatGPT([paragraph, baseQuestion, pr]).then((resp) => {
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
