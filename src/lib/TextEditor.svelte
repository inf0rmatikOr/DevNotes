<script lang="ts">
    import { onMount } from "svelte";

    export let content = "";
    export let showNumbers = true;
    export let textcolor = "#ffffff";
    export let backgroundcolor = "#000000";
    export let rounded = true;
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
  
<div style="background-color: {backgroundcolor};" class="h-full w-full overflow-hidden {rounded ? 'rounded-lg' : ''} py-2">
    <div class="flex h-full">
        {#if showNumbers}
            <div class="w-10 h-full overflow-hidden" bind:this={numberDiv}>
                {#each Array(lines) as _, i}
                    <div class="text-neutral-500 text-center">
                        {i + 1}
                    </div>
                {/each}
            </div>
        {/if}
        <textarea style="color: {textcolor};" on:change on:keydown={syncNumberScroll} spellcheck="false" class="overflow-hidden resize-none w-full outline-none pl-2" bind:value={content} bind:this={textarea}></textarea>
    </div>
</div>