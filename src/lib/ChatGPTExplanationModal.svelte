<script>
	import { text } from '@sveltejs/kit';
	import LightBox from './LightBox.svelte';
	export let quote = null;
	export let onClose;
	export let paragraph;
	export let title;

	const cleanedP = paragraph.replace(/(\r)/gm, '');
	$: start = quote ? cleanedP.indexOf(quote) : 0;
	$: end = quote !== null ? cleanedP.indexOf(quote) + quote.length : 0;

	$: console.log('quote', quote);

	// $: console.log('textPassages', textPassages);
	// $: console.log(
	// 	'paragraphIndices reverse',
	// 	paragraphIndices.map(([start, end]) => cleanedP.substring(start, end))
	// );
	// $: console.log('paragraph', paragraph);

	$: htmlText = quote
		? [...cleanedP]
				.map((p, i) => {
					if (i >= start && i < end) {
						return `<span class="bg-yellow-200">${p}</span>`;
					}
					return p;
				})
				.join('')
		: '';

	// $: console.log('paragraph', paragraph);
</script>

<LightBox {title} isOpen={quote !== null} close={onClose}
	><div class="overflow-auto">{@html htmlText}</div></LightBox
>
