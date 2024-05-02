<script>
	import LightBoxContent from './LightBoxContent.svelte';
	import Modal from './Modal.svelte';
	// import { v4 as uuidv4 } from 'uuid';

	export let isOpen = false;
	export let isMandatory = false;
</script>

<Modal {...$$props}>
	<LightBoxContent {...$$props}>
		<slot />
	</LightBoxContent>
</Modal>

<style>
	.modal {
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}
	.cont {
		background: rgba(240, 248, 255, 0.86);
		will-change: transform;
	}
</style>
