<script>
	export let cls = '';
	export let height = '66px';
	export let width = '66px';
</script>

<div class="loading border-gray-700 border-4 {cls}" style:height style:width></div>

<style>
	.loading {
		display: inline-block;
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
		-webkit-animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
