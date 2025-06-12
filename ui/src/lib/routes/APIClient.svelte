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

    let tab = "Headers"
    let bodyContent = ""
    let headerKeys: string[] = [
        "Accept",
        "Content-Type",
    ];
    let headerValues: string[] = [
        "*/*",
        "application/json"
    ];
    let restart = {}

    let newHeaderKey = "";
    let newHeaderValue = "";

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

        // const res = await window.api.fetch(url, {
        //     method: method,
        //     headers: Object.fromEntries(headerKeys.map((key, index) => [key, headerValues[index]])),
        //     body: method === "GET" ? undefined : bodyContent ? JSON.stringify(JSON.parse(bodyContent)) : undefined
        // });
        // console.log(res)

        await fetch(url, {
            method: method,
            headers: {
                ...Object.fromEntries(headerKeys.map((key, index) => [key, headerValues[index]]))
            },
            body: method === "GET" ? undefined : bodyContent ? JSON.stringify(JSON.parse(bodyContent)) : undefined
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

    function addHeader() {
        headerKeys.push(newHeaderKey.trim());
        headerValues.push(newHeaderValue.trim());
        newHeaderKey = "";
        newHeaderValue = "";

        restart = {};
    }

    function removeHeader(index: number) {
        headerKeys.splice(index, 1);
        headerValues.splice(index, 1);
        restart = {};
    }
</script>

<div class="w-full h-full">
    <div class="flex w-full h-full gap-x-4 p-4">
        <div class="flex flex-col w-1/2 h-full">
            <div class="flex h-12">
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
            <div class="p-2 flex gap-x-4 mt-1">
                <button on:click={() => tab = "Headers"} class="text-white cursor-pointer {tab === "Headers" ? "border-b-2 border-indigo-600" : ""}">Headers</button>
                <button on:click={() => tab = "Body"} class="text-white cursor-pointer {tab === "Body" ? "border-b-2 border-indigo-600" : ""}">Body</button>
            </div>
            <div class="h-[calc(100vh-14.8rem)] w-full">
                {#if tab === "Body"}
                    <h1 class="text-xl text-white mt-2 mb-2 font-light">JSON Content</h1>
                    <TextEditor rounded={true} customClass="border border-neutral-800" bind:content={bodyContent}/>
                {:else if tab === "Headers"}
                    <h1 class="text-xl text-white mt-2 font-light">HTTP Headers</h1>
                    <div class="h-full">
                        {#key restart}
                            {#each headerKeys as header, i}
                                <div class="flex w-full gap-4 my-2 group hover:bg-neutral-800 px-2">
                                    <input spellcheck="false" class="border-b w-1/2 border-neutral-700 text-sm text-white outline-none py-1" type="text" bind:value={header}>
                                    <input spellcheck="false" class="border-b w-1/2 border-neutral-700 text-sm text-white outline-none py-1" type="text" bind:value={headerValues[i]}>
                                    <div class="w-6 h-6 block group-hover:hidden"></div>
                                    <button on:click={() => removeHeader(i)} class="border hidden group-hover:flex cursor-pointer border-neutral-500 w-6 h-6 m-auto text-white items-center justify-center">X</button>
                                </div>
                            {/each}
                        {/key}
                        <div class="flex w-full gap-4 px-2">
                            <input bind:value={newHeaderKey} class="border-b w-1/2 border-neutral-700 text-sm text-white outline-none py-1" type="text" placeholder="header">
                            <input bind:value={newHeaderValue} class="border-b w-1/2 border-neutral-700 text-sm text-white outline-none py-1" type="text" placeholder="value">
                            <button on:click={addHeader} class="w-6 h-6 bg-indigo-600 text-white rounded cursor-pointer hover:opacity-75 transition-all">+</button>
                        </div>
                    </div>
                {/if}
            </div>
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
                    <TextEditor isDisabled={true} content={response}/>
                {/if}
            </div>
        </div>
    </div>
</div>