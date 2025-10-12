<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let message = '';

  const dispatch = createEventDispatcher();

  function handleReset() {
    dispatch('reset');
  }
</script>

<div class="modal-backdrop">
  <div class="modal">
    <h2>{message}</h2>
    <button on:click={handleReset}>Play Again</button>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
