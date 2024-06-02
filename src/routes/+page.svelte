<script>
	import { textIds } from '$lib/reportIds.js';
</script>

<div class="flex-1 flex flex-col">
	<div class="m-auto p-6">
		<h1 class="text-4xl mb-3">Welcome to TOXIN Report Analyzer</h1>
		<p class="mb-6 text-lg">
			Welcome to Toxin Report Analyzer, your one-stop solution for extracting, analyzing, and data
			from SCSS reports. Our application is designed to streamline your workflow by transforming
			complex data into easy-to-understand tables, helping you focus on what matters most—your
			research and clinical analysis.
		</p>
		<p class="mb-3 text-lg">Try out some example data sets:</p>
		<ul class="text-lg flex gap-2">
			{#each textIds.slice(0, 3) as d}
				<li class="mb-3">
					<a href="/{d}" class="p-1 border-2">{d}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
