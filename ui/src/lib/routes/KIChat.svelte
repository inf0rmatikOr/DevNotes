<script lang="ts">
    import { onMount } from "svelte";
    import Message from "../Message.svelte"
    import { messages } from "../stores";

    export let key = ""
    let prompt = ""
    let isloading = false
    let chat_history: string[] = []
    let current_history_index = 0
    let msgDiv: HTMLDivElement
    let input: HTMLInputElement

    async function google() {
        isloading = true;
        const userprompt = prompt
        messages.set([...$messages, { role: "user", content: userprompt }])
        chat_history.push(userprompt)
        current_history_index = chat_history.length
        prompt = ""
        await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gemini-2.0-flash",
                contents: [
                    {
                        parts: [
                            {
                                text: userprompt
                            }
                        ]
                    }
                ]
            })
        }).then(async (res) => {
            isloading = false;
            const data = await res.json()
            messages.set([...$messages, { role: "assistant", content: data.candidates[0].content.parts[0].text}])
        })

        scrollToBottom();
    }

    const scrollToBottom = () => {
        msgDiv.scroll({ top: msgDiv.scrollHeight, behavior: 'smooth' });
    }; 

    onMount(() => {
        if (!key) return
        scrollToBottom()
    });

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowUp") {
            if (chat_history.length === 0) return

            if (current_history_index === 0) {
                current_history_index = chat_history.length;
            }
            current_history_index--;
            prompt = chat_history[current_history_index];
            setTimeout(() => {
                if (input) {
                    input.focus();
                    input.setSelectionRange(prompt.length, prompt.length);
                }
            });
        } else {
            current_history_index = chat_history.length;
        }
    }
</script>

<div class="w-full h-full">
    <div class="w-full h-[80%] text-white">
        {#if key}
            <div bind:this={msgDiv} class="flex flex-col overflow-x-scroll gap-y-4 w-full h-full items-center max-w-2xl mx-auto">
                {#each $messages as message}
                    <Message role={message.role} content={message.content} />
                {/each}
            </div>
        {:else}
            <div class="flex justify-center items-center h-full">
                <h1 class="text-2xl text-white">Please enter your API key in the settings</h1>
            </div>
        {/if}
    </div>
    <div class="flex flex-col justify-center items-center w-full h-[20%] max-w-3xl mx-auto">
        {#if isloading}
            <div class='flex space-x-2 justify-center items-center bg-white dark:invert'>
                <div class='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div class='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div class='h-2 w-2 bg-black rounded-full animate-bounce'></div>
            </div>
        {/if}
        {#if key}
            <form on:submit|preventDefault={google} class="flex w-full mt-4">
                <input bind:this={input} on:keydown={handleKeyDown} bind:value={prompt} type="text" placeholder="Prompt" class="rounded-lg border resize-none border-neutral-600 px-4 py-2 w-full text-white outline-none">
                <button type="submit" class="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg ml-2 hover:bg-indigo-700 transition-all">Send</button>
            </form>
        {/if}
    </div>
</div>