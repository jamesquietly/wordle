<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let guesses: { letter: string; status: 'correct' | 'present' | 'absent' | 'empty' }[][] = [];

  const dispatch = createEventDispatcher();

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
  ];

  let letterStatuses: { [key: string]: 'correct' | 'present' | 'absent' } = {};

  $: {
    letterStatuses = {};
    for (const guess of guesses) {
      for (const { letter, status } of guess) {
        if (status !== 'empty') {
          if (!letterStatuses[letter] || status === 'correct') {
            letterStatuses[letter] = status;
          }
        }
      }
    }
  }

  function handleKeyClick(key: string) {
    dispatch('key', key);
  }
</script>

<div class="keyboard">
  {#each keyboardLayout as row}
    <div class="keyboard-row">
      {#each row as key}
        <button class="key {letterStatuses[key] || ''}" on:click={() => handleKeyClick(key)} data-key={key}>
          {#if key === 'Backspace'}
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.12c.36.53.9.88 1.59.88h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path>
            </svg>
          {:else}
            {key}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 5px;
  }

  .key {
    font-family: inherit;
    font-weight: bold;
    border: 0;
    padding: 0;
    margin: 0 6px 0 0;
    height: 58px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    background-color: #d3d6da;
    color: #1a1a1b;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(0,0,0,0.3);
  }
  .key:last-of-type {
    margin: 0;
  }

  .key[data-key='Enter'],
  .key[data-key='Backspace'] {
    flex: 1.5;
  }

  .correct {
    background-color: #6aaa64;
    color: white;
  }

  .present {
    background-color: #c9b458;
    color: white;
  }

  .absent {
    background-color: #787c7e;
    color: white;
  }
</style>