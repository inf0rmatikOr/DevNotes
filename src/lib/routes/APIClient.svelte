<script lang="ts">
    import TextEditor from "../TextEditor.svelte";

    let method = "GET";
    let url = "";
    let status = "";
    let statustext = "";
    let size = 0;
    let time = 0;
    let response = "";
    let inBytes = true;

    async function sendRequest() {
        const timeNow = new Date().getTime();
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            response = "Please enter a valid URL starting with http:// or https://";
            status = "ERROR";
            statustext = "Invalid URL";
            time = 0;
            size = 0;
            return;
        }

        await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((data) => {
            time = new Date().getTime() - timeNow;
            status = data.status.toString();
            statustext = data.statusText;
            data.text().then((text: any) => {
                size = new TextEncoder().encode(text).length;
                if (size > 1024) {
                    inBytes = false;
                    size = parseFloat((size / 1024).toFixed(2));
                }
                try {
                    response = JSON.stringify(JSON.parse(text), null, 2);
                } catch (e) {
                    response = text;
                    return;
                }
            });

        }).catch((error) => {
            status = "ERROR";
            statustext = error.message;
            time = 0
            size = 0;
        })

    }
</script>

<div class="w-full h-full">
    <div class="flex w-full h-full gap-x-4 p-4">
        <div class="flex w-1/2 h-12">
            <select class="border-l border-y border-neutral-500 rounded-l outline-none px-2 py-1 text-white" bind:value={method}>
                <option class="bg-black" value="GET">GET</option>
                <option class="bg-black" value="POST">POST</option>
                <option class="bg-black" value="PUT">PUT</option>
                <option class="bg-black" value="DELETE">DELETE</option>
                <option class="bg-black" value="PATCH">PATCH</option>
            </select>
            <input type="text" class="border-l border-neutral-500 border-y outline-none px-2 py-1 flex-grow text-white" bind:value={url} placeholder="Enter URL">
            <button on:click={sendRequest} class="px-4 py-2 bg-indigo-600 outline-none rounded-r text-white transition-all hover:opacity-75 cursor-pointer">Send</button>
        </div>
        <div class="border-l border-neutral-700 h-full px-4 w-1/2 overflow-auto">
            <div class="flex gap-x-4 fixed bg-black">
                <h2 class="text-white text-lg">Status: <span class="{status.startsWith("3") ? "text-yellow-500" : ""} {status.startsWith("2") ? "text-lime-500" : ""} {status.startsWith("4") ? "text-red-500" : ""} {status.startsWith("ERROR") ? "text-red-500" : ""} font-medium">{status}</span>
                {#if statustext}
                    <span class="{status.startsWith("3") ? "text-yellow-500" : ""} {status.startsWith("2") ? "text-lime-500" : ""} {status.startsWith("4") ? "text-red-500" : ""} {status.startsWith("ERROR") ? "text-red-500" : ""} font-medium">{statustext}</span>
                {/if}
                </h2>
                <h2 class="text-white text-lg">Size:
                    {#if status}
                        {#if inBytes}
                            <span class="{size !== 0 ? "text-lime-500": "text-red-500"} font-medium">{size} Bytes</span>
                        {:else}
                            <span class="{size !== 0 ? "text-lime-500": "text-red-500"} font-medium">{size} KB</span>
                        {/if}
                    {/if}
                </h2>
                <h2 class="text-white text-lg">Time:
                    {#if status}
                        <span class="{time !== 0 ? "text-lime-500": "text-red-500"} font-medium">{time} ms</span>
                    {/if}
                </h2>
            </div>
            <div class="w-full h-full mt-6">
                {#if status != ""}
                    <TextEditor content={response}/>
                {/if}
            </div>
        </div>
    </div>
</div>