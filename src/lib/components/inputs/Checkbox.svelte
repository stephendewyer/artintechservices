<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';

    export let checked: boolean = false;
    export let value: string;
    
    let checkboxID = uuidv4();
    
</script>

<div class="service_input_and_label">
    <input 
        type="checkbox" 
        id={checkboxID}
        bind:value={value}
        bind:checked={checked}
        class="cbx"
        style="display: none;"
    />
    <label 
        for={checkboxID} 
        class="check"
    >
        <svg 
            width="48px" 
            height="48px" 
            viewBox="0 0 18 18"
        >
            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
            <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
    </label>
    <div class="service_label">
        <slot />
    </div>
</div>

<style>

    .service_input_and_label {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }

    .service_label {
        font-weight: bold;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        font-size: 18px;
        padding: 0px 10px;
    }

    /* begin checkbox */

    .check {
        cursor: pointer;
        position: relative;
        width: 48px;
        height: 48px;
        -webkit-tap-highlight-color: transparent;
        transform: translate3d(0, 0, 0);
        display: inline-flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
    }
    .check svg {
        position: relative;
        z-index: 1;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: #5B7BA2;
        stroke-width: 1.5;
        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
    }
    .check svg path {
        stroke-dasharray: 60;
        stroke-dashoffset: 0;
    }
    .check svg polyline {
        stroke-dasharray: 22;
        stroke-dashoffset: 66;
    }
    .check:hover:before {
        opacity: 1;
    }
    .check:hover svg {
        stroke: #363E47;
    }
    .cbx:checked + .check svg {
        stroke: #363E47;
    }
    .cbx:checked + .check svg path {
        stroke-dashoffset: 60;
        transition: all 0.3s linear;
    }
    .cbx:checked + .check svg polyline {
        stroke-dashoffset: 42;
        transition: all 0.2s linear;
        transition-delay: 0.15s;
    }

    /* end checkbox   */
</style>