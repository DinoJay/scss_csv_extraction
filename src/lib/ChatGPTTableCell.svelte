<script>
	export let key;
	export let value;

	function prettyPrintJson(obj, indent = 0) {
		let result = '';
		const padding = ' '.repeat(indent);

		if (obj === null) {
			return '-';
		}

		if (typeof obj !== 'object') {
			return `${obj}`;
		}

		for (let key in obj) {
			if (Array.isArray(obj[key])) {
				result += `${padding}${key}:\n`;
				obj[key].forEach((item) => {
					if (typeof item === 'object') {
						const itemString = prettyPrintJson(item, indent + 2).trim();
						const itemLines = itemString
							.split('\n')
							.map((line) => `${padding}  - ${line}`)
							.join('\n');
						result += `${itemLines}\n\n`;
					} else {
						result += `${padding}  - ${item}\n\n`;
					}
				});
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				result += `${padding}${key}:\n${prettyPrintJson(obj[key], indent + 2)}`;
			} else {
				const value = obj[key] === null ? '-' : obj[key];
				result += `${padding}${key}: ${value}\n`;
			}
		}

		return result;
	}
	const limit = 150;
	let expanded = false;
</script>

<div class="whitespace-pre-line min-w-32" class:w-72={key === 'description'}>
	{prettyPrintJson(value.length > limit && !expanded ? value.slice(0, limit) : value)}
	{#if value.length > limit && !expanded}
		<button class="text-blue-800 text-xl font-bold" on:click={() => (expanded = true)}>...</button>
	{/if}
	{#if value.length > limit && expanded}
		<button class="text-blue-800 text-xl font-bold" on:click={() => (expanded = false)}>_</button>
	{/if}
</div>
