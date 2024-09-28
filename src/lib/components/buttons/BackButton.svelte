<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_left.svg?raw";
</script>

<button 
    class="back_button"
    type="button"
>
    <div class="arrow_container">
        {@html Arrow}
    </div>
    <p class="label">
        <slot />
    </p>
</button>

<style>
    .back_button {
        margin: 0 0 0 0.25rem;
		color: #424635;
		fill: #424635;
		background-color: transparent;
		border: solid 3px #424635;
		padding: 0.5rem 1rem;
		gap: 0.5rem;
		font-size: 1.25rem;
		font-weight: 600;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 3rem;
		cursor: pointer;
		transition: border 0.2s linear, fill 0.2s linear, color 0.2s linear, margin 0.2s linear;
	}

	.back_button:hover {
        margin: 0;
		color: #838B6A;
        border: solid 3px #838B6A;
	}

    .label {
        color: #424635;
        transition: color 0.2s linear;
        margin: 0;
    }

    .back_button:hover > .label {
        color: #838B6A;
    }

    .arrow_container {
        width: 0.6rem;
        margin-right: 0;
        transition: margin-right 0.2s linear, fill 0.2s linear;
    }

    .back_button:hover > .arrow_container {
        margin-right: 0.25rem;
        fill: #838B6A;
    }

</style>