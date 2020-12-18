<script>
    import { converter } from './showdown.js';

    let text = '';
    let mdConverter = converter();
    let blocks = [{html: '', text: '', isFocused: true}];

    function parseKeyPress(key, index) {
        // console.log("key: ", key);
        // console.log("index: ", index);
        if (key.key === "Enter") {
            updateBlock(index);
            addBlock(index);
            text = '';
        }
        else if (key.key === "Backspace") {
            console.log("do something");
            if (blocks[index].text === '') {
                if (blocks.length) {
                    console.log("blocks in parse key press for backspace", blocks);
                    blocks.pop();
                    let previousBlock = blocks[-1];
                    removeFocus()
                    previousBlock.isFocused = true;
                    blocks = blocks;
                    key.preventDefault();
                }
            }
        }
    }

    function updateBlock(index){
        // blocks = blocks.map((obj) => {
        //     obj.isFocused = false;
        //     obj.html = mdConverter.makeHtml(obj.text);
        //     return obj;
        // })
        blocks[index].html = mdConverter.makeHtml(blocks[index].text);
        blocks[index].isFocused = false;
        blocks = blocks;
    }

    function addBlock(index){
        let newBlock = {html: '', text: '', isFocused: true};
        // blocks = [...blocks.slice(0, index + 1), newBlock, ...blocks.slice(index + 1)];
        blocks.splice(index + 1, 0, newBlock);
        blocks = blocks;
        console.log("blocks after adding new block", blocks);
    }

    function removeFocus() {
        blocks = blocks.map((obj) => {
            obj.isFocused = false;
            return obj;
        })
    }

    function blockFocus(index) {
        console.log('focussing block: ' + index);
        removeFocus();
        blocks[index].isFocused = true;
        blocks = blocks;
        // document.getElementById("input_" + index).focus()
        document.getElementById("input_" + index).focus()
        // document.getElementById("input_" + index).click()
    }

    function blockBlur(id) {
        console.log('blurring block: ' + id);
        // let index = blocks.findIndex((obj) => {
        //     return obj.id === id;
        // })
        // blocks[index].isFocused = true;
    }

</script>

<div class="container">
    {#each blocks as block, index}
        <input id={"input_" + index} class="block input" class:hidden={!block.isFocused} type="text" bind:value={block.text} on:keydown={ e => parseKeyPress(e, index)}>
        <div id={"block_" + index} class="block" class:hidden={block.isFocused} on:click={e => blockFocus(index)} on:keydown={ e => parseKeyPress(e, index)}>
            {@html block.html}
        </div>
    {/each}
</div>

<style>
    .block {
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 10px 15px;
        z-index: 9;
        top: 0;
        left: 0;
        /* width: 100%; */
        /* height: 20px; */
    }

    .hidden {
        z-index: -1;
        position: absolute;
    }

    .input {
        width: 100%;
        /* color: white; */
        /* background-color: #1f1f1f; */
        background-color: white;
        border: none;
        padding-left: 15px;
    }

    .block:hover, .input:hover {
        /* background-color: #353535; */
        background-color: rgb(240, 240, 240);
    }

    .block:focus, .input:focus {
        background-color: #dfdfdf;
    }

    .hidden:hover {
        background-color: inherit;
    }

    .container {
        overflow-y: scroll;
        position: relative;
        margin: auto;
        width: 80%;
        max-width: 700px;
        height: 100%;
        max-height: 100%;
        /* background-color: #1f1f1f; */
        background-color: white;
        border-radius: 5px;
        box-shadow: 0px 5px 5px 5px grey;
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