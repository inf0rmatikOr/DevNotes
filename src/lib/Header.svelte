<script>
    import { route } from "./stores";


</script>

<div class="flex justify-between p-4">
    <h1 class="text-white text-3xl font-semibold">DevNotes</h1>
    <div class="flex gap-x-8 items-center">
        <button onclick={() => route.set("Notes")} class="h-7 outline-none cursor-pointer transition-all {$route === "Notes" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">Notes</button>
        <button onclick={() => route.set("Calender")} class="h-7 outline-none  cursor-pointer transition-all {$route === "Calender" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">Calender</button>
        <button onclick={() => route.set("API Client")} class="h-7 outline-none  cursor-pointer transition-all {$route === "API Client" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">API Client</button>
    </div>
    <div></div>
</div>

<style>
    h1 {
        font-family: 'Caveat', cursive;
    }
</style>