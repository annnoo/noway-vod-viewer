import { writable } from 'svelte/store';

function createEventBus() {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    emit: (event: number) => set(event),
  };
}

export const twitchEventBus = createEventBus();
