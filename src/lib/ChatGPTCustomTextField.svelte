<script>
	import Extendable from './Extendable.svelte';
	export let defaultQuestion;
	export let onClick;
	let question = defaultQuestion;
</script>

<Extendable title="ChatGPT Prompt">
	<textarea
		on:change={(e) => {
			question = e.target.value;
		}}
		value={question}
		placeholder="ChatGPT question"
		class="h-32 w-full border-2 border-gray p-2 flex-grow"
	/>
	<button
		class="w-full p-2 border-2 mt-2 flex items-center justify-center bg-yellow-200"
		on:click={() => onClick(question)}>Ask Custom Question to ChatGPT</button
	>
</Extendable>
