<script>
	import { text } from '@sveltejs/kit';
	import LightBox from './LightBox.svelte';
	export let textPassages = null;
	export let onClose;
	export let paragraph;
	export let title;

	const cleanedP = paragraph.replace(/(\r)/gm, '');
	$: paragraphIndices = textPassages
		? textPassages.split('||').map((p) => [cleanedP.indexOf(p), cleanedP.indexOf(p) + p.length])
		: [];

	$: console.log('textPassages', textPassages);
	$: console.log(
		'paragraphIndices reverse',
		paragraphIndices.map(([start, end]) => cleanedP.substring(start, end))
	);
	$: console.log('paragraph', paragraph);

	$: htmlText = textPassages
		? [...cleanedP]
				.map((p, i) => {
					if (paragraphIndices.some(([start, end]) => i >= start && i < end)) {
						return `<span class="bg-yellow-200">${p}</span>`;
					}
					return p;
				})

				.join('')
		: '';

	// $: console.log('paragraph', paragraph);
</script>

<LightBox {title} isOpen={textPassages !== null} close={onClose}
	><div class="">{@html htmlText}</div></LightBox
>
