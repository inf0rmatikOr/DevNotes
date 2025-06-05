<script lang="ts">
    import { onMount } from 'svelte';
  
    export let delay = 0;

    let isVisible = false;
    let element: any;
  
    onMount(() => {
        setTimeout(() => {
            isVisible = true;
        }, delay);
    });

    export let direction: "top" | "down" = "top";
    export let customClass = "";
</script>
  
<style>
    .fly-in-top {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .fly-in-down {
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .visible {
        opacity: 1;
        transform: translateX(0);
    }
</style>
  
<div bind:this={element} class="{direction === "top" ? "fly-in-top" : "fly-in-down"} w-full {customClass} {isVisible ? 'visible' : ''}">
    <slot></slot>
</div>