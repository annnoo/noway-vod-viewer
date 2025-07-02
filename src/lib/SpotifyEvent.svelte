
<script lang="ts">
    import {Spotify} from 'sveltekit-embed'
	import TimestampText from './TimestampText.svelte';

    let {timestamp, spotifyLink}: {
    timestamp: string;
    spotifyLink: string;
    } = $props();
</script>
<div>
<TimestampText offset={timestamp} timestamp={timestamp} />

<Spotify 
spotifyLink={spotifyLink} />

</div>