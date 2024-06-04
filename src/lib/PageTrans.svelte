<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
	export let style = '';
</script>

{#key refresh}
	<div
		class="flex-grow flex flex-col"
		{style}
		in:fly={{ x: -5, duration: 500, delay: 500 }}
		out:fly={{ x: 5, duration: 500 }}
	>
		<slot />
	</div>
{/key}
