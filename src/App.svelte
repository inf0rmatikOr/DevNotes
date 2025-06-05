<script lang="ts">
    import FlyIn from "./lib/FlyIn.svelte";
    import Header from "./lib/Header.svelte";
    import LineEditor from "./lib/LineEditor.svelte";
    import { notes, route } from "./lib/stores";
    import type { Note } from "./lib/types";

    function addNote() {
        let newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        notes.set([...$notes, newNote]);
    }

    let currentNote: Note;
    let usernotes = $notes;

    notes.subscribe(value => {
        usernotes = value;
    });

    $: {
        if (currentNote) {
            notes.update(n => n.map(note => note.id === currentNote.id ? currentNote : note));
        }
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet">
</svelte:head>

<div class="h-screen w-full bg-black">
    <Header />
    <div class="flex">
        <!-- Sidebar -->
        <div class="w-56 h-[calc(100vh-4.3rem)] px-4">
            <h1 class="text-white text-xl">{$route}</h1>
            {#if $route === "Notes"}
                <div class="flex flex-col mt-2">
                    <div class="max-h-96 flex flex-col gap-y-4">
                        <input type="search" placeholder="Suche" class="border-b border-neutral-700 placeholder:text-neutral-400 px-2 py-1 outline-none text-white">
                        {#each usernotes as note, i}
                            <FlyIn delay={i * 200} direction="top">
                                <button onclick={() => currentNote = note} class="w-full cursor-pointer hover:bg-neutral-800 transition-all flex flex-col justify-between rounded h-16 bg-neutral-900 p-2">
                                    <h1 class="text-white text-lg text-left">{note.title}</h1>
                                    <p class="text-neutral-500 text-xs text-left">{note.updatedAt.toLocaleDateString()} {note.updatedAt.toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })}</p>
                                </button>
                            </FlyIn>
                        {/each}
                    </div>
                    <button onclick={addNote} class="flex items-center justify-center text-sm text-white rounded w-full mt-4 bg-indigo-600 py-2 cursor-pointer transition-all hover:opacity-85">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                        <span class="ml-1">Add Note</span>
                    </button>   
                </div>
            {/if}
        </div>
        
        <!-- Main Content -->
        <div class="w-[calc(100vw-14rem)] h-[calc(100vh-4.3rem)] ml-2">
            {#if $route === "Notes"}
                {#if currentNote}
                    <div class="flex flex-col">
                        <input class="text-white outline-none text-3xl font-medium" type="text" bind:value={currentNote.title}>
                        <div class="mt-4 h-[calc(100vh-4.3rem-3.5rem)] w-full overflow-hidden">
                            <LineEditor content={currentNote.content}/>
                        </div>
                    </div>  
                {/if}
            {/if}
        </div>
    </div>
</div>