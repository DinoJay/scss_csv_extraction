<script>
	export let disabled;
	export let data;
	export let fileName;
	import FileSaver from 'file-saver';
</script>

<button
	class=" ml-auto border-2 px-1 bg-gray-200"
	{disabled}
	class:opacity-50={disabled}
	on:click={() => {
		var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
		FileSaver.saveAs(blob, fileName);
	}}
>
	Export CSV
</button>
