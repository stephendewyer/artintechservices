<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";

</script>

<button 
    type="button"
    class="box_button"
>
    <slot />
    <div class="arrow">
        {@html Arrow}
    </div>
</button>

<style>
    .box_button {
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 0.16rem solid #424635;
    margin-right: 0.5rem;
    box-sizing: border-box;
    text-decoration: none;
    color: #424635;
    background-color: #EFD5C9;
    text-align: center;
    cursor: pointer;
    outline: none;
    transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, margin-right 0.2s ease-in-out;
    will-change: color border-color background-color margin-right;
}

.box_button:hover {
    color:#838B6A;
    border-color:#838B6A;
    background-color: #EFD5C9;
    margin-right: 0;
}

.box_button:hover > .arrow {
    margin-left: 0.5rem;
    fill: #838B6A;
}

.box_button:active {
    color:#D89679;
    border-color:#D89679;
}

.arrow {
    width: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    fill: #424635;
    margin-left: 0;
    will-change: margin-left, fill;
    transition: margin-left 0.2s ease-in-out, fill 0.2s ease-in-out;
}

@media all and (max-width:751px){

    .box_button {

    }

}

</style>