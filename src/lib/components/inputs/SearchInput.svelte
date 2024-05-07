<script lang="ts">
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let searchInputValue: string;  
    export let searchInputValueChange: any;
    export let options: string[] = [];
    export let optionSelected: boolean = false;
</script>

<div class="input_and_label_container">
    {#if inputLabel !== false}
        <div class="input_label">
            <label for={inputID} >
                <slot />
            </label>
        </div>
    {/if}
    <div class="searchbar">
        <input 
            placeholder={placeholder}
            id={inputID}
            name={inputName}
            type="search"
            bind:value={searchInputValue}
            on:input={searchInputValueChange}
            on:keyup={searchInputValueChange}
            autocomplete="off"
        />
        {#if (options.length >= 1)}
            <ul class="searchbar_dropdown_menu">
                {#each options as option, i}
                    <button
                        class="searchbar_dropdown_menu_item"
                        on:click={() => {
                            searchInputValue = option;
                            optionSelected = true;
                        }}
                        on:keyup={() => {
                            searchInputValue = option;
                            optionSelected = true;
                        }}
                    >
                        {option}
                    </button>
                {/each}
            </ul>
        {/if}
    </div>
</div>
  
<style>

    @font-face {
        font-family: "IBM_Plex_Sans";
        src: url($lib/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf);
    }

    .input_and_label_container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    label {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1C2226;
    }

    .input_label {
        padding: 0 0 0.5rem 0;
    }

    .searchbar {
        background-color: #EFF9F2;
        border-radius: 1.5rem;
        color: #484B47;
        border-width: 2px;
        border-color: #AEA89D;
        border-style: solid;
        transition: border-color 0.2s linear;
    }

    input {
        padding: 0.5rem 1rem 0.5rem 3rem;
        background-color: transparent;
        border: none;
        font-size: 1.4rem;
        outline: none;
        width: 100%;
        background-image: url('$lib/images/icons/magnifying_glass.svg');
        background-size: 1.8rem;
        background-repeat: no-repeat;
        background-position: 10px center;        
    }

    div:has(input:hover) {
        border-color: #CB6D44;
        transition: border-color 0.2s linear;
    }

    div:has(input:focus) {
        border-color: #1C2226;
        transition: border-color 0.2s linear;
    }

    ::placeholder {
        color: #484B47;
        opacity: 50%; /* Firefox */
    }

    input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        cursor: pointer;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 10px;
        background:
            linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%,#000 45%,#000 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%),
            linear-gradient(135deg, transparent 0%,transparent 43%,#000 45%,#000 55%,transparent 57%,transparent 100%);
    }

    ul {
        list-style: none;
        padding: 0;
        width: 100%;
        margin: 0;
    }

    .searchbar_dropdown_menu {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0 0 1rem 0;
    }

    .searchbar_dropdown_menu_item {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #484B47;
        font-size: 1.4rem;
        font-family: "IBM_Plex_Sans";
        padding: 0 0 0 3rem;
        transition: background-color 0.2s linear;
    }

    .searchbar_dropdown_menu_item:hover {
        background-color: #E3CDB2;
    }

    @media (max-width: 1440px) {

        input {
            font-size: 1.2rem;
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            background-size: 1.5rem;       
        }

        .searchbar_dropdown_menu_item {
            font-size: 1.2rem;
            padding: 0 0 0 2.5rem;
        }

        label {
            font-size: 1.2rem;
        }

        .input_label {
            padding: 0 0 0.4rem 0;
        }
    }

    @media (max-width: 720px) {
        input {
            font-size: 1rem;
        }

        .searchbar_dropdown_menu_item {
            font-size: 1rem;
        }

        label {
            font-size: 1rem;
        }

        .input_label {
            padding: 0 0 0.3rem 0;
        }
    }

</style>