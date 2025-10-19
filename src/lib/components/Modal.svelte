<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";

  export let message = "";
  export let open = false;

  const dispatch = createEventDispatcher();

  function handleReset() {
    dispatch("reset");
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{message}</Dialog.Title>
    </Dialog.Header>
    <Dialog.Footer>
      <Button on:click={handleReset}>Play Again</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>