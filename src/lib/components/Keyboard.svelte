<script lang="ts">
  export let guesses: { letter: string; status: 'correct' | 'present' | 'absent' | 'empty' }[][] = [];

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
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
</script>

<div class="keyboard">
  {#each keyboardLayout as row}
    <div class="keyboard-row">
      {#each row as key}
        <div class="key {letterStatuses[key] || ''}">{key}</div>
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
  }

  .keyboard-row {
    display: flex;
    margin-bottom: 5px;
  }

  .key {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 50px;
    margin: 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: default;
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

  @media (max-width: 600px) {
    .key {
      width: 30px;
      height: 40px;
      font-size: 0.8rem;
    }
  }
</style>
