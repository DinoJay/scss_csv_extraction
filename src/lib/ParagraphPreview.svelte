<script lang="ts">
	import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';
	export let selected;
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
	class=" mb-3"
>
	<div
		role="button"
		tabindex="0"
		on:keydown={(e) => {
			// if (e.key === 'Enter') {
			// 	onClick();
			// 	// e.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
			// }
		}}
		on:click={(e) => {
			e.stopPropagation();

			// onClick();
			// e.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
		}}
	>
		<div class="flex items-center mb-2">
			<h2 class="text-lg flex-1">{title}</h2>
			<a
				href={`${reportId}?pid=${pid}&scraped=${scraped}`}
				class="text-gray-600"
				style="width:24px;height:24px"
			>
				<MdExpandMore></MdExpandMore>
			</a>
		</div>
		<p
			class="p-2 whitespace-pre-wrap border-2 h-56 overflow-hidden"
			class:border-fuchsia-200={selected}
			class:border-fuchsia-100={!selected}
		>
			{text}
		</p>
	</div>
</div>
