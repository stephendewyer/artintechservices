<script lang="ts">
    import Meatballs from "$lib/images/icons/meaballs.svg?raw";
    import { ConvertTimeToStandard } from "$lib/util/convertTimeToStandard";
    export let consultation: Consultation;

    const reasonArray = consultation.consultation_reason.split(" ");
    const reasonShortened = reasonArray.slice(0, 5).join(" ");

    let cardHovered: boolean = false;

    const cardHoveredHandler = () => {
        cardHovered = true;
    };

    const cardExitedHandler = () => {
        cardHovered = false;
    };

</script>
<a 
    class="consultation"
    on:mouseover={cardHoveredHandler}
    on:mouseenter={cardHoveredHandler}
    on:focus={cardHoveredHandler}
    on:mouseout={cardExitedHandler}
    on:mouseleave={cardExitedHandler}
    on:blur={cardExitedHandler}
    href={`/authenticated-client/client/consultation?id=${consultation.request_ID}`}
>
    <div class="meatballs_container">
        <div 
            class="meatballs"
            style={cardHovered ? "fill: #d79679;": "fill: #36261E;"}
        >
            {@html Meatballs}
        </div>
    </div>
    <h4 style="margin: 0;">{new Date(consultation.consultation_date).toUTCString().slice(0, 16)}</h4>
    <h5 style="margin: 0;">{ConvertTimeToStandard(consultation.consultation_time)} {consultation.time_zone}</h5>
    <p style="margin: 0;">{reasonShortened}...</p>
</a>
<style>
    .consultation {
        width: 32%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        cursor: pointer;
        border-radius: 1rem;
        transition: box-shadow 0.2s linear;
    }

    .meatballs_container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .meatballs {
        width: 1.5rem;
        transition: fill 0.2s linear;
    }

    .consultation:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }
    @media screen and (max-width: 1440px) {

    }

    @media screen and (max-width: 1080px) {
        .consultation {
            width: 48%;
        }
    }

    @media screen and (max-width: 720px) {
        .consultation {
            width: 100%;
        }
    }
</style>