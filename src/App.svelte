<script lang="ts">
    import { onMount } from "svelte";
    import FlyIn from "./lib/FlyIn.svelte";
    import Header from "./lib/Header.svelte";
    import LineEditor from "./lib/LineEditor.svelte";
    import { notes, route } from "./lib/stores";
    import type { Note } from "./lib/types";
    import KiChat from "./lib/routes/KIChat.svelte";

    let currentNote: Note = { id: "", title: "", content: "", createdAt: new Date(), updatedAt: new Date() };
    let usernotes = $notes;
    let searchValue = "";
    let isLoading = false;

    function addNote() {
        let newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        notes.set([...$notes, newNote]);
        currentNote = newNote;
        localStorage.setItem("notes", JSON.stringify($notes));
    }

    function removeNote() {
        if (currentNote) {
            notes.update(n => n.filter(note => note.id !== currentNote?.id));
            currentNote = { id: "", title: "", content: "", createdAt: new Date(), updatedAt: new Date() };
            localStorage.setItem("notes", JSON.stringify($notes));
        }
    }

    notes.subscribe(value => {
        usernotes = value;
    });

    onMount(() => {
        if (localStorage.getItem("notes")) {
            const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
            // cast to Note[]
            if (Array.isArray(savedNotes) && savedNotes.every(note => note.id && note.title && note.content)) {
                savedNotes.forEach(note => {
                    note.createdAt = new Date(note.createdAt);
                    note.updatedAt = new Date(note.updatedAt);
                });
            } else {
                console.error("Invalid notes format in localStorage");
                return;
            }
            notes.set(savedNotes);
        }
    })

    function updateNote() {
        notes.update(n => n.map(note => note.id === currentNote.id ? currentNote : note));
        localStorage.setItem("notes", JSON.stringify($notes));
    }

    function filterNotes() {
        if (searchValue.trim() === "") {
            usernotes = $notes;
        } else {
            usernotes = $notes.filter(note => note.title.toLowerCase().includes(searchValue.toLowerCase()));
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
        {#if $route !== "KI Chat"}
            <div class="w-56 h-[calc(100vh-4.3rem)] px-4">
                <h1 class="text-white text-xl">{$route}</h1>
                {#if $route === "Notes"}
                    <div class="flex flex-col mt-2">
                        <input onkeyup={filterNotes} bind:value={searchValue} type="search" placeholder="Suche" class="border-b border-neutral-700 placeholder:text-neutral-400 px-2 py-1 outline-none text-white">
                        <div class="max-h-[40rem] flex flex-col gap-y-4 mt-4 overflow-hidden">
                            {#each usernotes as note, i}
                                <FlyIn delay={i * 200} direction="top">
                                    <button onclick={() => currentNote = note} class="w-full cursor-pointer hover:bg-neutral-800 transition-all flex flex-col justify-between rounded h-16 bg-neutral-900 p-2">
                                        <h1 class="text-white text-lg text-left">{note.title}</h1>
                                        <p class="text-neutral-500 text-xs text-left">{note.updatedAt.toLocaleDateString()} {note.updatedAt.toLocaleTimeString(
                                            "de-DE",
                                            { hour: '2-digit', minute: '2-digit' }
                                        )}</p>
                                    </button>
                                </FlyIn>
                            {/each}
                        </div>
                        <button onclick={addNote} class="flex items-center justify-center text-sm text-white rounded w-full mt-4 bg-indigo-600 py-2 cursor-pointer transition-all hover:opacity-85">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                            <span class="ml-1">Add Note</span>
                        </button>   
                        <button onclick={removeNote} class="flex items-center justify-center text-sm text-white rounded w-full mt-4 bg-red-600 py-2 cursor-pointer transition-all hover:opacity-85">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                            <span class="ml-1">Remove Note</span>
                        </button> 
                    </div>
                {/if}
            </div>
        {/if}
        
        <!-- Main Content -->
        <div class="{$route !== "KI Chat" ? "w-[calc(100vw-14rem)] ml-2" : "w-full" } h-[calc(100vh-4.3rem)]">
            {#if $route === "Notes"}
                {#if currentNote.id !== ""}
                    <div class="flex flex-col">
                        <input onchange={updateNote} class="text-white outline-none text-3xl font-medium" type="text" bind:value={currentNote.title}>
                        <div class="mt-4 h-[calc(100vh-4.3rem-3.5rem)] w-full overflow-hidden">
                            <LineEditor on:change={updateNote} bind:content={currentNote.content}/>
                        </div>
                    </div>  
                {/if}
            {:else if $route === "KI Chat"}
                <KiChat />
            {/if}
        </div>
    </div>
</div>