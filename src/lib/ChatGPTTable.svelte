<script>
	export let data;
	export let onChange;
	export let refreshable = false;
	export let paragraph;
	export let edit = false;
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import ChatGPTTableCellRefresh from './ChatGPTTableCellRefresh.svelte';
	import ChatGptTableCell from './ChatGPTTableCell.svelte';
	import { paragraphQuery } from './chatGPTparagraphQueries';
	// $: console.log('data TABLE', data);
	export let columns;
	export let endpoints;

	//TODO: I don't know if this is right
	// console.log('flat', flat);
	// console.log('data Table', data);

	$: console.log('endpoints', endpoints);
	$: prompts = edit
		? endpoints.flatMap((e) => e.cols.map((c) => paragraphQuery([c], paragraph, e.name)))
		: null;
</script>

{#if data.length === 0}
	<div class="m-auto text-sm text-gray-500">No Data</div>
{:else}
	<div class="container overflow-scroll">
		<table class="table-fixed">
			<thead>
				<tr>
					{#each (edit ? ['Edit', ...columns] : columns).map((d) => d.replace(/_/g, ' ')) as key}
						<th class="border-2 p-2">{key}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as d, i (i)}
					<tr>
						{#if edit}
							<td class="border-2 p-2"
								><div class="m-auto" style="width:18px;height:18px">
									<button on:click={() => onChange(data.filter((d, j) => j !== i))}>
										<MdClose />
									</button>
								</div></td
							>
						{/if}
						{#each columns as key, i (key)}
							<td class="border-2 p-2">
								<div class="flex flex-wrap items-center gap-1">
									<ChatGptTableCell {key} value={d[key]} />

									{#if refreshable}
										<ChatGPTTableCellRefresh
											{key}
											prompt={prompts ? prompts[i] : null}
											value={d[key]}
											{paragraph}
											onChange={(answer) => {
												onChange(data.map((d, j) => (j === i ? { ...d, [key]: answer } : d)));
											}}
										/>
									{/if}
								</div>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.container::-webkit-scrollbar {
		height: 12px;
	}

	.container::-webkit-scrollbar-track {
		background-color: white;
		border-radius: 12px;
	}

	.container::-webkit-scrollbar-thumb {
		background-color: #7d7d7d;
		border-radius: 12px;
	}
</style>
