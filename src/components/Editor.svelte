<script>
    import { converter } from './showdown.js';
    import Viewer from './Viewer.svelte';
    let text = '';
    let mdConverter = converter();

    $: htmlStr = mdConverter.makeHtml(text);

    let blocks = [];
    let blockId = 0;

    function addBlock(text){
        let newBlock = {id: blockId++, html: mdConverter.makeHtml(text), text: text};
        blocks = [...blocks, newBlock];
    }

    function pressEnter(key) {
        if (key.key === "Enter"){
            addBlock(text);
            text = '';
        }
    }

</script>

<div class="container">
    {#each blocks as block, index (block.id)}
        <div class="block" contenteditable>
            {@html block.html}
        </div>
    {/each}
    <!-- <textarea bind:value={text} placeholder="type some text..." cols=50 rows=1 on:keypress={pressEnter}></textarea> -->
    <input autofocus class="input" type="text" bind:value={text} on:keypress={pressEnter}>
</div>

<style>
    .block {
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 10px;
    }

    .input {
        width: 100%;
        /* color: white; */
        /* background-color: #1f1f1f; */
        background-color: white;
        border: none;
    }

    .block:hover, .input:hover {
        /* background-color: #353535; */
        background-color: rgb(240, 240, 240);
    }

    .block:focus, .input:focus {
        background-color: #dfdfdf;
    }

    .container {
        overflow-y: scroll;
        margin: auto;
        width: 80%;
        max-width: 700px;
        height: 100%;
        max-height: 100%;
        /* background-color: #1f1f1f; */
        background-color: white;
        border-radius: 5px;
    }

    textarea {
        resize: none;
    }

    input:focus, textarea:focus {
        border: none;
        outline: none;
    }

    [contenteditable] {
        /* color: blue; */
        /* color: white; */
        background-color: white;
        outline: none;
    }
</style>