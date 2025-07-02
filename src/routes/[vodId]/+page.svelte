<script lang="ts">
	import TwitchChannelEmbed from '$lib/TwitchChannelEmbed.svelte';
	import EventTimeline from '$lib/event-timeline.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	 let { vodData, vodId } = data;
</script>

<svelte:head>
	<title>VOD {vodId} - Event Timeline</title>
</svelte:head>

{#if vodData}
	<div class="container mx-auto p-4">
		<div class="mb-6">
			<h1 class="text-3xl font-bold mb-2">VOD {vodId}</h1>
			<p class="text-gray-600">
				Duration: {Math.floor(vodData.vodDuration / 60)}m {vodData.vodDuration % 60}s 
				| {vodData.totalEvents} events
			</p>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="lg:sticky lg:top-4 lg:h-fit">
				<TwitchChannelEmbed 
					video={vodId} 

					width="100%" 
					height="400px" 
				/>
			</div>
			
			<div class="lg:max-h-screen lg:overflow-y-auto">
				<EventTimeline events={vodData.events} />
			</div>
		</div>
	</div>
{:else}
	<div class="container mx-auto p-4">
		<div class="text-center">
			<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
			<p class="text-lg">Loading VOD data...</p>
		</div>
	</div>
{/if}