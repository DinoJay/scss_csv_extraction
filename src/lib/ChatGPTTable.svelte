<script>
	export let data;
	export let onChange;
	export let context = [];
	export let refreshable = false;
	export let paragraph;
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import ChatGPTTableCellRefresh from './ChatGPTTableCellRefresh.svelte';
	// $: console.log('data TABLE', data);
	export let exclude = ['id', 'paragraph'];

	//TODO: I don't know if this is right
	const flat = data.flatMap((d) => Object.keys(d));
	// console.log('flat', flat);
	$: columns = [...new Set(flat)].filter((d) => !exclude.includes(d));
	// console.log('data Table', data);

	function prettyPrintJson(obj, indent = 4) {
		let result = '';
		const padding = ' '.repeat(indent);

		if (obj === null) {
			return '-';
		}

		if (typeof obj !== 'object') {
			return `${obj}`;
		}

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (Array.isArray(obj[key])) {
					result += `${padding}${key}:\n`;
					obj[key].forEach((item) => {
						if (typeof item === 'object' && item !== null) {
							const itemString = prettyPrintJson(item, indent + 2).trim();
							const itemLines = itemString
								.split('\n')
								.map((line) => `${padding}  - ${line}`)
								.join('\n');
							result += `${itemLines}\n`;
						} else {
							result += `${padding}  - ${item}\n`;
						}
					});
				} else if (typeof obj[key] === 'object' && obj[key] !== null) {
					result += `${padding}${key}:\n${prettyPrintJson(obj[key], indent + 2)}`;
				} else {
					const value = obj[key] === null ? '-' : obj[key];
					result += `${padding}${key}: ${value}\n`;
				}
			}
		}

		return result;
	}

	// console.log('data', data);
	const myPrettyPrint = (obj) => {
		// if (Array.isArray(obj)) return obj.join(', ');
		// if (typeof obj === 'object') return JSON.stringify(obj, null, 2);
		// return obj;
		return prettyPrintJson(obj);
	};
</script>

{#if data.length === 0}
	<div class="m-auto text-sm text-gray-500">No Data</div>
{:else}
	<div class="overflow-auto">
		<table class="table-fixed">
			<thead>
				<tr>
					{#each ['Edit', ...columns.map((d) => d.replace(/_/g, ' '))] as key}
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
						{#each columns.filter((d) => !exclude.includes(d)) as key (key)}
							<td class="border-2 p-2">
								<div class="flex flex-wrap items-center gap-1">
									<div class="whitespace-pre-line break-keep" class:w-72={key === 'description'}>
										{myPrettyPrint(d[key])}
									</div>
									{#if refreshable}
										<ChatGPTTableCellRefresh
											{key}
											value={d[key]}
											{context}
											{paragraph}
											onChange={(answer) => {
												onChange(
													data.map((d, j) => (j === i ? { ...d, ...JSON.parse(answer) } : d))
												);
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
