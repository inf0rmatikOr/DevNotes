<script lang="ts">
    import { onMount } from "svelte";
    import type { Settings } from "../types";
    import { settings } from "../stores";
    import { fade } from "svelte/transition";

    let key = ""
    let textcolor = "#ffffff";
    let backgroundcolor = "#000000";
    let showNumbers = true;
    let rounded = false;
    let showSuccess = false;

    onMount(() => {
        const savedSettings = localStorage.getItem("settings");
        if (savedSettings) {
            const settings: Settings = JSON.parse(savedSettings);
            key = settings.apiKey || "";
            textcolor = settings.textColor || "#ffffff";
            backgroundcolor = settings.backgroundColor || "#000000";
            showNumbers = settings.showNumbers !== undefined ? settings.showNumbers : true;
            rounded = settings.rounded !== undefined ? settings.rounded : false;
        }
    });

    function saveSettings() {
        const savesettings: Settings = {
            apiKey: key,
            textColor: textcolor,
            backgroundColor: backgroundcolor,
            showNumbers: showNumbers,
            rounded: rounded
        };
        settings.set(savesettings);
        localStorage.setItem("settings", JSON.stringify(savesettings));
        showSuccess = true;
        setTimeout(() => {
            showSuccess = false;
        }, 2000);
    }
</script>

<div class="w-full h-full flex justify-center items-center">
    <div class="w-[60%] mt-14 h-full">
        <h1 class="text-2xl text-white font-semibold mb-4">AI Chat</h1>
        <p class="text-sm text-neutral-500">Documentation: <span class="text-cyan-600">https://ai.google.dev/gemini-api/docs/api-key</span></p>
        <input bind:value={key} type="password" class="w-full mt-4 h-10 px-4 border border-neutral-800 text-white rounded outline-none" placeholder="API Key" />
        <h1 class="text-2xl text-white font-semibold mb-4 mt-4">Editor</h1>
        <div class="flex items-center">
            <div class="inline-flex items-center">
                <label class="flex items-center cursor-pointer relative">
                    <input bind:checked={showNumbers} type="checkbox" class="peer h-5 w-5 cursor-pointer bg-neutral-900 transition-all appearance-none rounded shadow hover:shadow-md border border-neutral-600 checked:bg-indigo-600 checked:border-slate-800" id="check" />
                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    </span>
                </label>
            </div> 
            <p class="text-white ml-2">Enable line numbers</p>
        </div>
        <div class="flex items-center mt-4">
            <div class="inline-flex items-center">
                <label class="flex items-center cursor-pointer relative">
                    <input bind:checked={rounded} type="checkbox" class="peer h-5 w-5 cursor-pointer bg-neutral-900 transition-all appearance-none rounded shadow hover:shadow-md border border-neutral-600 checked:bg-indigo-600 checked:border-slate-800" id="check" />
                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
            </div> 
            <p class="text-white ml-2">Rounded</p>
        </div>
        <div class="flex items-center mt-4">
            <input bind:value={backgroundcolor} type="color" class="w-8 h-9">
            <p class="text-white ml-2">Background color</p>
        </div>
        <div class="flex items-center mt-4">
            <input bind:value={textcolor} type="color" class="w-8 h-9">
            <p class="text-white ml-2">Text color</p>
        </div>
        <button on:click={saveSettings} class="bg-indigo-600 text-white w-full mt-4 py-1 rounded hover:opacity-85 cursor-pointer">Save</button>
        {#if showSuccess}
            <p transition:fade class="text-green-500 mt-6 text-center">Settings saved successfully!</p>
        {/if}
    </div>
</div>