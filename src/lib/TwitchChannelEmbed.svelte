<script lang="ts">
	import { twitchEventBus } from './store';
	let {
		channel,
		width = '100%',
		height = '100%',
		autoplay,
		muted,
		id,
		video
	}: {
		channel: string;
		width?: string | number;
		height?: string | number;
		autoplay?: boolean;
		muted?: boolean;
		id: string;
		video?: string;
	} = $props();

	let player: Twitch.Player;

	$effect(() => {
		player = new Twitch.Player(`twitch-embed-${id}`, {
			video,
			width,

			height,
			autoplay,
			muted,

			parent: []
		});
	});
	twitchEventBus.subscribe((event) => {
		if (event && player) {
			(player as any).seek(event);
		}
	});
</script>

<div id={`twitch-embed-${id}`} class="twitch-embed"></div>

<style>
	.twitch-embed {
		width: 500px;
		aspect-ratio: 16/9;
		position: relative;
	}

	.live-marker {
		position: absolute;
		top: 0;
		right: 0.5rem;
		z-index: 1;
	}
</style>
