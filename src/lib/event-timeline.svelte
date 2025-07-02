<script lang="ts">
	import type { VodEvent } from '$lib/types';
	import { VodEventType } from '$lib/types';
	import GameEventComponent from '$lib/game-event.svelte';
	import SongEventComponent from '$lib/song-event.svelte';
	import ChampionKillEventComponent from '$lib/champion-kill-event.svelte';
	import ChampionDeathEventComponent from '$lib/champion-death-event.svelte';
	import ChampionAssistEventComponent from '$lib/champion-assist-event.svelte';
	import ChampionSpecialKillEventComponent from '$lib/champion-special-kill-event.svelte';
	import EliteMonsterKillEventComponent from '$lib/elite-monster-kill-event.svelte';
	import BuildingKillEventComponent from '$lib/building-kill-event.svelte';
	import GameEndEventComponent from '$lib/game-end-event.svelte';

	let { events }: { events: VodEvent[] } = $props();

	// Sort events by timestamp
	let sortedEvents = events.sort((a, b) => a.offsetSeconds - b.offsetSeconds);

	function formatTimestamp(offsetSeconds: number): string {
		const hours = Math.floor(offsetSeconds / 3600);
		const minutes = Math.floor((offsetSeconds % 3600) / 60);
		const seconds = Math.floor(offsetSeconds % 60);
		
		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		}
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}
</script>

<div class="space-y-4">
	<h2 class="text-2xl font-bold mb-4">Event Timeline</h2>
	
	{#if sortedEvents.length === 0}
		<div class="text-center py-8">
			<p class="text-gray-500">No events found for this VOD.</p>
		</div>
	{:else}
		{#each sortedEvents as event (event.id)}
			<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
				<div class="flex items-start justify-between mb-2">
					<span class="text-sm font-medium text-blue-600">
						{formatTimestamp(event.offsetSeconds)}
					</span>
					<span class="text-xs text-gray-500 capitalize">
						{event.type.replace('_', ' ').toLowerCase()}
					</span>
				</div>
				
				{#if event.type === VodEventType.GAME}
					<GameEventComponent {event} />
				{:else if event.type === VodEventType.SONG}
					<SongEventComponent {event} />
				{:else if event.type === VodEventType.CHAMPION_KILL}
					<ChampionKillEventComponent {event} />
				{:else if event.type === VodEventType.CHAMPION_DEATH}
					<ChampionDeathEventComponent {event} />
				{:else if event.type === VodEventType.CHAMPION_ASSIST}
					<ChampionAssistEventComponent {event} />
				{:else if event.type === VodEventType.CHAMPION_SPECIAL_KILL}
					<ChampionSpecialKillEventComponent {event} />
				{:else if event.type === VodEventType.ELITE_MONSTER_KILL}
					<EliteMonsterKillEventComponent {event} />
				{:else if event.type === VodEventType.BUILDING_KILL}
					<BuildingKillEventComponent {event} />
				{:else if event.type === VodEventType.GAME_END}
					<GameEndEventComponent {event} />
				{:else}
					<div class="text-sm">
						<h3 class="font-semibold">{event}</h3>
			
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>