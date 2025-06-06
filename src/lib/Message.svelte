<script>
    import { marked } from "marked";

    export let content = "";
    export let role = "";
</script>

<div class="w-full { role === "user" ? "text-right bg-neutral-800" : "" } rounded-lg p-4 prose-code:rounded-lg prose-code:text-xs prose-sm prose-headings:text-white prose-headings:m-0 prose-headings:font-medium prose-li:list-disc">
    {@html marked(content)}
</div>