<script lang="ts">
	import MdLink from 'svelte-icons/md/MdLink.svelte';
	export let title;
	export let text;
	export let pid;
	export let reportId;
	export let scraped;

	// export let type;
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
>
	<div class="flex items-center mb-2">
		<h2 class="text-lg flex-1">{title}</h2>
		<a
			href={`/${reportId}/${pid}?&scraped=${scraped}`}
			class="text-gray-600"
			style="width:24px;height:24px"
		>
			<MdLink />
		</a>
	</div>

	<a href={`/${reportId}/${pid}?&scraped=${scraped}`}>
		<p class="p-2 whitespace-pre-wrap border-2 h-56 overflow-hidden">
			{text}
		</p>
	</a>
</div>
