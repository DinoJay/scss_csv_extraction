<script>
	import reportIds from '$lib/reportIds.js';
</script>

<div class="flex-1 flex flex-col bg-gray-50">
	<div class="m-auto">
		<h1 class="text-4xl mb-3">Welcome to TOXIN</h1>
		<p>try out some example data sets</p>
		<div class="flex gap-1 flex-wrap">
			{#each reportIds.slice(0, 3) as d}
				<a href="/{d}" class="p-1 border-2">{d}</a>
			{/each}
		</div>
	</div>
</div>
