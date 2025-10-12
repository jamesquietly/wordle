<script lang="ts">
  import { onMount } from "svelte";
  import { generate } from "random-words";
  import Keyboard from "./Keyboard.svelte";
  import Modal from "./Modal.svelte";

  let targetWord: string;
  type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';
  type GuessLetter = { letter: string; status: LetterStatus };
  let guesses: GuessLetter[][] = [];
  let currentGuess = '';
  let activeRow = 0;
  let gameState: 'playing' | 'won' | 'lost' = 'playing';
  let gameOverMessage = '';
  let score = 0;

  function newGame() {
    targetWord = generate({ exactly: 1, minLength: 5, maxLength: 5 })[0];
    guesses = Array(6).fill(null).map(() => Array(5).fill({ letter: '', status: 'empty' }));
    currentGuess = '';
    activeRow = 0;
    gameState = 'playing';
    gameOverMessage = '';
  }

  onMount(() => {
    const savedScore = localStorage.getItem('wordle-score');
    if (savedScore) {
      score = JSON.parse(savedScore);
    }
    newGame();
  });

  function handleKeydown(event: KeyboardEvent) {
    if (gameState !== 'playing') return;

    if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
      currentGuess += event.key.toLowerCase();
    } else if (event.key === 'Backspace' && currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
    } else if (event.key === 'Enter' && currentGuess.length === 5) {
      const newGuesses = [...guesses];
      const guess = currentGuess.split('');
      const newRow: GuessLetter[] = guess.map((letter, i) => {
        if (letter === targetWord[i]) {
          return { letter, status: 'correct' as const };
        } else if (targetWord.includes(letter)) {
          return { letter, status: 'present' as const };
        } else {
          return { letter, status: 'absent' as const };
        }
      });
      newGuesses[activeRow] = newRow;
      guesses = newGuesses;

      if (currentGuess === targetWord) {
        gameState = 'won';
        gameOverMessage = 'You won!';
      } else if (activeRow === 5) {
        gameState = 'lost';
        gameOverMessage = `You lost! The word was ${targetWord}`;
      }

      activeRow++;
      currentGuess = '';
    }

    const newGuesses = [...guesses];
    const currentRow = [...newGuesses[activeRow]];
    for (let i = 0; i < 5; i++) {
      currentRow[i] = { letter: currentGuess[i] || '', status: 'empty' };
    }
    newGuesses[activeRow] = currentRow;
    guesses = newGuesses;
  }

  function resetGame() {
    if (gameState === 'won') {
      score++;
      localStorage.setItem('wordle-score', JSON.stringify(score));
    }
    newGame();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if gameState !== 'playing'}
  <Modal message={gameOverMessage} on:reset={resetGame} />
{/if}

<div class="game">
  <h1>Wordle</h1>
  <h2>Score: {score}</h2>
  <div class="grid">
    {#each guesses as row}
      {#each row as cell}
        <div class="cell {cell.status}">{cell.letter}</div>
      {/each}
    {/each}
  </div>
  <Keyboard {guesses} />
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
  }

  h1, h2 {
    margin-top: 5px;
    margin-bottom: 5px;
    padding-top:3px;
    padding-bottom:3px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
    width: 300px;
    grid-auto-rows: 60px;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 2px solid #ccc;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 60px;
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
    .grid {
      width: 90%;
      grid-auto-rows: 50px;
    }

    .cell {
      font-size: 1.5rem;
      line-height: 50px;
    }
  }
</style>
