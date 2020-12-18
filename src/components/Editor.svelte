<script>
    import { converter } from "./showdown.js";

    let mdConverter = converter();
    let blocks = [{ html: "", text: "", isFocused: true }];

    function parseKeyPress(key, index) {
        console.log("key: ", key);
        console.log("index: ", index);
        if (key.key === "Enter") {
            // need to make sure that the cursor is at the end of the text input, otherwise should act differently
            // probably need to act differently for shift + enter
            if (!key.shiftKey) {
                updateBlock(index);
                addBlock(index);
            }
        } else if (key.key === "Backspace") {
            console.log("do something");
            if (blocks[index].text === "") {
                if (index > 0) {
                    let previousBlock = blocks[index - 1];
                    blocks.splice(index);
                    blocks = blocks;
                    key.preventDefault();
                    blockFocus(index - 1);
                }
            }
        } else if (key.key === "ArrowUp") {
            // need to find a way of checking the position of the cursor
            if (index > 0) {
                blockFocus(index - 1);
            }
        } else if (key.key === "ArrowDown") {
            // need to find a way of checking the position of the cursor
            if (index < blocks.length - 1) {
                blockFocus(index + 1);
            }
        } else if (key.key === "Shift") {
            shiftHeld = true;
        }
    }

    function updateBlock(index) {
        blocks[index].html = mdConverter.makeHtml(blocks[index].text);
        blocks[index].isFocused = false;
        blocks = blocks;
    }

    function addBlock(index) {
        removeFocus();
        let newBlock = { html: "", text: "", isFocused: true };
        blocks.splice(index + 1, 0, newBlock);
        blocks = blocks;
        // blockFocus(index + 1);
    }

    function removeFocus() {
        blocks = blocks.map((obj) => {
            obj.isFocused = false;
            return obj;
        });
    }

    function blockFocus(index) {
        console.log("focussing block: " + index);
        removeFocus();
        blocks[index].isFocused = true;
        blocks = blocks;
        document.getElementById("input_" + index).focus();
    }

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
</script>

<style>
    .block {
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 5px 15px;
        z-index: 9;
        top: 0;
        left: 0;
        min-height: 21px;
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

    .block:hover,
    .input:hover {
        /* background-color: #353535; */
        background-color: rgb(240, 240, 240);
    }

    .block:focus,
    .input:focus {
        background-color: #dfdfdf;
    }

    .hidden:hover {
        background-color: inherit;
    }

    .container {
        overflow-y: scroll;
        /* overflow-y: visible; */
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
        /* height: 30px; */
    }

    input:focus,
    textarea:focus {
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

<div class="container">
    {#each blocks as block, index}
        <!-- <input
            autofocus
            id={'input_' + index}
            class="block input"
            class:hidden={!block.isFocused}
            type="text"
            bind:value={block.text}
            on:keydown={(e) => parseKeyPress(e, index)}
             /> -->
        <textarea
            autofocus
            id={'input_' + index}
            class="block input"
            class:hidden={!block.isFocused}
            type="text"
            bind:value={block.text}
            on:input={autoResize}
            on:keydown={(e) => parseKeyPress(e, index)}/>
        <div
            id={'block_' + index}
            class="block"
            class:hidden={block.isFocused}
            on:click={(e) => blockFocus(index)}
            on:keydown={(e) => parseKeyPress(e, index)}>
            {@html block.html}
        </div>
    {/each}
</div>
