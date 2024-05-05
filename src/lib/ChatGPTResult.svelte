<script>
	import LightBox from './LightBox.svelte';
	import Spinner from './Spinner.svelte';

	export let loadingResponse;
	export let response;
	export let title;
	export let onSubmit;
	export let onClose;

	import { csvParse } from 'd3-dsv';

	console.log('response', response);
	$: csv = response ? csvParse(response) : [];
	$: console.log('csv', csv);
</script>

<LightBox {title} isOpen={loadingResponse || response} close={onClose}>
	<div class="w-full flex">
		{#if loadingResponse}
			<div class="h-44 flex flex-1">
				<div class="m-auto" style="width:20px;height:20px"><Spinner></Spinner></div>
			</div>
		{:else if response}
			<p class="bg mt-2 p-1 overflow-auto" style:background="#cae6ea">
				{@html response}
			</p>

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
		<button class="w-full p-2 border-2 mt-3" on:click={() => onSubmit()} type="button">
			Re-Submit
		</button>
	{/if}
</LightBox>
