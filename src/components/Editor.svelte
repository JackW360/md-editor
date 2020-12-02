<script>
    import { converter } from './showdown.js';
    let text = '';
    let mdConverter = converter();

</script>

<div>
    <textarea bind:value={text} class="inline-div" placeholder="type some text..." cols=50 rows=10></textarea>
    <div class="inline-div">Output:
        <br>
        <br>
        {@html mdConverter.makeHtml(text)}
    </div>
</div>

<style>
    .inline-div {
        /* display: inline-block; */
        float: left;
    }
    textarea {
        resize: none;
    }
</style>