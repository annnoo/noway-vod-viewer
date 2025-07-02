<script lang="ts">
	import { twitchEventBus } from "./store";

    let { timestamp, offset }: { timestamp: string, offset: string } = $props();
    // Convert offset to a human-readable format hh:mm:ss
    const formatOffset = (offset: string): string => {
        const parts = offset.split(':').map(Number);
        if (parts.length === 3) {
            return `${parts[0].toString().padStart(2, '0')}:${

                parts[1].toString().padStart(2, '0')}:${parts[2].toString().padStart(2, '0')}`;
        } else if (parts.length === 2) {
            return `00:${parts[0].toString().padStart(2, '0'
            )}:${parts[1].toString().padStart(2, '0')}`;
        } else {
            return `00:00:${parts[0].toString().padStart(2,
            '0')}`;
        }
    };
    timestamp = formatOffset(timestamp);
    if (offset) {
        timestamp += ` (+${formatOffset(offset)})`;
    }
    function jumpToTimestamp() {
        twitchEventBus.emit(+timestamp);
    }

</script>
<span class="italic hover:underline" onclick={jumpToTimestamp}>{offset}</span>