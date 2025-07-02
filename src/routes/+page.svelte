<script lang="ts">
	import { twitchEventBus } from '$lib/store';
	import TwitchChannelEmbed from '$lib/TwitchChannelEmbed.svelte';

	// number that gets increased by 600 each time button cliked
	let count = 0;
	function increment() {
		count += 600;
		twitchEventBus.emit(count);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<TwitchChannelEmbed video="2481364998" width="100%" height="500px" />
<button on:click={increment}>Seek 10 minutes</button>
