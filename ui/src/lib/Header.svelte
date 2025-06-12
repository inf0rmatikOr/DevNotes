<script>
    import { route } from "./stores";


</script>

<div class="flex justify-between items-center p-4 w-full">
    <h1 class="text-purple-600 text-3xl font-semibold">DevNotes</h1>
    <div class="flex gap-x-8 items-center justify-center w-full">
        <button onclick={() => route.set("Notes")} class="h-7 outline-none cursor-pointer transition-all {$route === "Notes" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">Notes</button>
        <button onclick={() => route.set("Calender")} class="h-7 outline-none  cursor-pointer transition-all {$route === "Calender" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">Calender</button>
        <button onclick={() => route.set("API Client")} class="h-7 outline-none  cursor-pointer transition-all text-nowrap {$route === "API Client" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">API Client</button>
        <button onclick={() => route.set("AI Chat")} class="h-7 outline-none cursor-pointer transition-all text-nowrap {$route === "AI Chat" ? "px-4 rounded-full bg-white" : "text-neutral-400"}">AI Chat</button>
    </div>
    <div class="flex justify-end items-center h-full ">
        <button onclick={() => route.set("Settings")} class="text-neutral-400 cursor-pointer hover:text-neutral-300 transition-all" aria-label="settings">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
        </button>
    </div>
</div>

<style>
    h1 {
        font-family: 'Caveat', cursive;
    }
</style>