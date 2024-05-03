<script>
	import WindowClose from 'svelte-icons/md/MdClose.svelte';

	/**
	 * @type {(arg0: any) => void}
	 */
	export let close;
	/**
	 * @type {string|null}
	 */
	export let height = '700px';
	export let width = '450px';
	export let title = '';
	// export let cls = '';
	export let fixedHeight = false;

	export let isFrontSlot = false;
	export let isBackSlot = false;

	export let fixedWidth = false;

	$: flippable = isFrontSlot && isBackSlot;
	let titleExpanded = false;

	$: console.log('width§', width);
</script>

<div
	class="bg-white flex flex-col p-3 m-auto w-auto max-h-full w-full max-w-prose"
	class:h-full={fixedHeight}
	style:max-height={height}
	on:keydown={() => null}
	on:click={(e) => e.stopPropagation()}
>
	<div class=" flex mb-3 items-start">
		<div
			class="text-xl flex {!titleExpanded ? 'crop' : ''} transition cursor-pointer"
			on:click={() => (titleExpanded = !titleExpanded)}
			on:keydown={() => (titleExpanded = !titleExpanded)}
			style="max-width:90%"
		>
			<h1>
				{title}
			</h1>
		</div>
		<button on:click={close} class="ml-auto text-gray-600" style="width:24px;height:24px">
			<WindowClose />
		</button>
	</div>
	<slot />
</div>

<style>
	.width {
		width: 450px;
	}
	@screen sm {
		.width {
			width: auto;
			min-width: 450px;
		}
	}
</style>
