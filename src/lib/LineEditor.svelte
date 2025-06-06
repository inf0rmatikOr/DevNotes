<script lang="ts">
    import { onMount } from "svelte";

    export let content = "";
    let lines = 0;
  
    $: lines = content.split('\n').length;

    let textarea: HTMLTextAreaElement;
    let numberDiv: HTMLDivElement;

    function syncNumberScroll() {
        if (textarea && numberDiv) {
            numberDiv.scrollTop = textarea.scrollTop;
        }
    }

    onMount(() => syncNumberScroll);
</script>
  
<div class="h-full w-full bg-black overflow-hidden">
    <div class="flex h-full">
        <div class="w-10 h-full overflow-hidden" bind:this={numberDiv}>
            {#each Array(lines) as _, i}
                <div class="text-neutral-500 text-center">
                    {i + 1}
                </div>
            {/each}
        </div>
        <textarea on:change on:keydown={syncNumberScroll} spellcheck="false" class="overflow-hidden resize-none w-full outline-none text-white pl-2" bind:value={content} bind:this={textarea}></textarea>
    </div>
</div>