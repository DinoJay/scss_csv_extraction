<script>
	import OpenAI from 'openai';
	export let data;
	export let onChange;
	export let context;
	export let refreshable = false;
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import ChatGPTTableCellRefresh from './ChatGPTTableCellRefresh.svelte';
	import { isRunnableFunctionWithParse } from 'openai/lib/RunnableFunction.mjs';
	$: console.log('data', data);
	export let exclude = ['id', 'paragraph'];

	//TODO: I don't know if this is right
	$: columns = [...new Set(data.flatMap((d) => Object.keys(d)))].filter(
		(d) => !exclude.includes(d)
	);
	console.log('data', data);
</script>

{#if data.length === 0}
	<div class="m-auto text-sm text-gray-500">No Data</div>
{:else}
	<div class="overflow-auto">
		<table class="table-auto">
			<thead>
				<tr>
					{#each ['Edit', ...columns] as key}
						<th class="border-2 p-2">{key}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as d, i (i)}
					<tr>
						<td class="border-2 p-2"
							><div class="m-auto" style="width:18px;height:18px">
								<button on:click={() => onChange(data.filter((d, j) => j !== i))}>
									<MdClose />
								</button>
							</div></td
						>
						{#each Object.keys(d).filter((d) => !exclude.includes(d)) as key (key)}
							<td class="border-2 p-2">
								<div class="flex flex-wrap items-center gap-1">
									<div class="" class:line-clamp-3={key === 'paragraph'}>{d[key]}</div>
									{#if refreshable}
										<ChatGPTTableCellRefresh
											{key}
											{context}
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
