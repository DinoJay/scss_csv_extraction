<script>
	import { fly, fade } from 'svelte/transition';
	export let refresh = '';
	export let style = '';
	const duration = 200;
</script>

{#key refresh}
	<div
		class="flex-grow flex flex-col"
		{style}
		in:fade={{ x: 0, duration, delay: duration }}
		out:fade={{ x: 0, duration }}
	>
		<slot />
	</div>
{/key}
