<script lang="ts">
    import type { CalenderEntry } from "../types";

    let weekCalender: Date[] = [];
    let today = new Date();
    let currentDate = new Date();
    let calenderEntries: CalenderEntry[] = [];
    let restart = {}

    function getWeekCalender(startDate: Date) {
        const startOfWeek = new Date(startDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        weekCalender = [];

        for (let i = 1; i < 8; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            weekCalender.push(date);
        }

        // load calender entries from localStorage
        if (localStorage.getItem("calenderEntries")) {
            calenderEntries = JSON.parse(localStorage.getItem("calenderEntries") || "[]");
            calenderEntries.forEach(entry => {
                entry.date = new Date(entry.date);
            });
        } else {
            calenderEntries = [];
        }
    }

    function previousWeek() {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() - 7);
        getWeekCalender(currentDate);
    }

    function nextWeek() {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        getWeekCalender(currentDate);
    }

    function addCalenderEntry(entrydate: Date) {
        const newEntry = {
            date: entrydate,
            content: "New entry",
            time: ""
        };
        calenderEntries.push(newEntry);
        restart = {}

        localStorage.setItem("calenderEntries", JSON.stringify(calenderEntries));
    }

    getWeekCalender(currentDate);

    $: {
        localStorage.setItem("calenderEntries", JSON.stringify(calenderEntries));
    }
</script>

<div class="w-full h-full">
    <!-- Calender -->
    <div class="flex flex-col p-4 h-full">
        <div class="flex items-center gap-x-4 mx-auto select-none">
            <button on:click={previousWeek} class="cursor-pointer hover:opacity-75 transition-all" aria-label="previous_week">
                <svg xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
            </button>
            <h1 class="text-white">
                {weekCalender[0].toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit' }).slice(0, -1)} - {weekCalender[6].toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit' }).slice(0, -1)}
            </h1>
            <button on:click={nextWeek} class="cursor-pointer hover:opacity-75 transition-all" aria-label="next_week">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
            </button>
            <h1 class="text-white ml-6 text-xl font-bold">
                {currentDate.toLocaleDateString('de-DE', { month: "long" })}
            </h1>
        </div>
        <div class="w-full h-full flex-col">
            <div class="h-full">
                <div class="grid grid-cols-7 mt-4">
                    {#each weekCalender as date, index}
                        <div class="h-[calc(100vh-16rem)]">
                            <div class="flex flex-col items-center justify-center h-16 w-full {index !== 0 && index !== 6 ? "border-x" : "" } {index === 0 ? "rounded-tl-lg border-r" : ""} {index === 6 ? "rounded-tr-lg border-l" : ""} {date.toLocaleDateString() === today.toLocaleDateString() ? "bg-indigo-600 border-indigo-600" : "bg-neutral-700 border-neutral-700"} text-white">
                                <span class="text-lg font-semibold">
                                    {date.getDate()}
                                </span>
                                <span class="text-sm">
                                    {date.toLocaleDateString('de-DE', { weekday: 'short' })}
                                </span>
                            </div> 
                            <div class="h-full w-full py-4 group border-b-2 {index === 6 ? "border-l border-r-2 rounded-br-lg" : ""} {index === 0 ? "border-r border-l-2 rounded-bl-lg" : ""} {index !== 0 && index !== 6 ? "border-x" : "" } border-neutral-700">
                                {#key restart}
                                    {#each calenderEntries as entry}
                                        {#if entry.date.toLocaleDateString() === date.toLocaleDateString()}
                                            <div class="w-[94%] h-auto flex flex-col group mx-auto mb-2 p-2 bg-blue-900 rounded text-white">
                                                <input spellcheck="false" class="outline-none h-8 truncate" bind:value={entry.content}>
                                                <div class="flex justify-between mt-2">
                                                    <input bind:value={entry.time} type="time" class="w-24 rounded-full h-6 px-2 bg-indigo-600 outline-none">
                                                    <button on:click={() => calenderEntries = calenderEntries.filter(e => e !== entry)} aria-label="delete_entry" class="text-red-500 ml-auto cursor-pointer hover:text-red-700 transition-all">
                                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="red"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        {/if}
                                    {/each}
                                {/key}
                                <button on:click={() => addCalenderEntry(date)} class="hidden text-white w-[94%] mx-auto rounded h-10 hover:opacity-85 cursor-pointer bg-indigo-600 transition-all group-hover:flex gap-x-2 items-center justify-center">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                                    Add entry
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>