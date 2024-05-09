<script>
	import LightBox from './LightBox.svelte';
	import Spinner from './Spinner.svelte';

	export let loadingResponse;
	export let response;
	export let title;
	export let onSubmit;
	export let onClose;
	export let open;

	import { csvParse } from 'd3-dsv';

	console.log('response', response);
	$: data = response ? csvParse(response) : [];
	$: console.log('csv', data);
	let csvMode = false;
</script>

<LightBox {title} isOpen={open} close={onClose}>
	<div class="w-full flex flex-col overflow-auto min-h-64">
		{#if loadingResponse}
			<div class="h-44 flex flex-1">
				<div class="m-auto" style="width:20px;height:20px"><Spinner></Spinner></div>
			</div>
		{:else if response}
			{#if csvMode}
				<p class="bg mt-2 p-1 overflow-auto" style:background="#cae6ea">
					{@html response}
				</p>
			{:else}
				<div class="overflow-auto">
					<table class="table-auto">
						<thead>
							<tr>
								{#each Object.keys(data[0]) as key}
									<th class="border-2 p-2">{key}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each data as row, i (i)}
								<tr>
									{#each Object.keys(row) as key (key)}
										<td class="border-2 p-2"><div class="line-clamp-3">{row[key]}</div></td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			<!-- <table>
				<tr>
					{#each Object.keys(row) as key}
						<td>{row[key]}</td>
					{/each}
				</tr>
			</table> -->
		{/if}
	</div>

	{#if response}
		<div class="flex mt-3">
			<button class="flex-1 p-2 border-2" on:click={() => onSubmit()}> Re-Submit </button>
			<button class="flex-1 p-2 border-2 ml-1 bg-gray-100" on:click={() => (csvMode = !csvMode)}
				>csv</button
			>
		</div>
	{/if}
</LightBox>
