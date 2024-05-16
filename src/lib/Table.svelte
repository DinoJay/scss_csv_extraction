<script>
	export let data;
	export let onChange;
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	$: console.log('data', data);
</script>

{#if data.length === 0}
	<div class="m-auto text-sm text-gray-500">No Data</div>
{:else}
	<div class="overflow-auto">
		<table class="table-auto">
			<thead>
				<tr>
					{#each ['Edit', ...Object.keys(data[0])] as key}
						<th class="border-2 p-2">{key}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as row, i (i)}
					<tr>
						<td class="border-2 p-2"
							><div class="m-auto" style="width:18px;height:18px">
								<button on:click={() => onChange(data.filter((d, j) => j !== i))}>
									<MdClose />
								</button>
							</div></td
						>
						{#each Object.keys(row) as key (key)}
							<td class="border-2 p-2"><div class="line-clamp-3">{row[key]}</div></td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
