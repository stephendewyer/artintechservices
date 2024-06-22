<script lang="ts">
    import Meatballs from "$lib/images/icons/meaballs.svg?raw";
    import { ConvertTimeToStandard } from "$lib/util/convertTimeToStandard";
    import ConsultationIcon from "$lib/images/icons/process/process_01.svg?raw";
    import Clouds from "$lib/images/consultation/white-fluffy-clouds.jpg";
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
    on:mouseover={cardHoveredHandler}
    on:mouseenter={cardHoveredHandler}
    on:focus={cardHoveredHandler}
    on:mouseout={cardExitedHandler}
    on:mouseleave={cardExitedHandler}
    on:blur={cardExitedHandler}
    href={`/authenticated-client/client/consultation?id=${consultation.request_ID}`}
    class="consultation_card_container"
>
    <div class="background_image_container">
        <img src={Clouds} alt="fluffly clouds" class="background_image"/>
    </div>
    <div class="meatballs_container">
        <div 
            class="meatballs"
            style={cardHovered ? "fill: #d79679;": "fill: #36261E;"}
        >
            {@html Meatballs}
        </div>
    </div>
    <div class="consultation_card_content">
        <div class="consultation_icon">
            {@html ConsultationIcon}
        </div>
        <div class="consultation_info">
            <h4 style="margin: 0;" class="date">{new Date(consultation.consultation_date).toUTCString().slice(0, 16)}</h4>
            <h5 style="margin: 0;" class="time">{ConvertTimeToStandard(consultation.consultation_time)} {consultation.time_zone}</h5>
            <p style="margin: 0;">{reasonShortened}...</p>
        </div>
    </div>
</a>
<style>
    .consultation_card_container {
        width: 32%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        cursor: pointer;
        border-radius: 1rem;
        transition: box-shadow 0.2s linear;
        position: relative;
    }

    .background_image_container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .background_image {
        position: relative;
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .meatballs_container {
        position: absolute;
        right: 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .meatballs {
        width: 1.5rem;
        transition: fill 0.2s linear;
    }

    .consultation_card_content {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .consultation_info {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .consultation_icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 16rem;
    }

    .consultation_card_container:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }
    @media screen and (max-width: 1440px) {
        .consultation_icon {
            height: 16rem;
        }

    }

    @media screen and (max-width: 1080px) {
        .consultation_card_container {
            width: 48%;
        }
        .consultation_card_content {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
        }

        .consultation_info {
            width: 50%;
        }

        .consultation_icon {
            height: 15rem;
            width: 50%;
        }

        .date {
            font-size: 1.5rem;
        }

        .time {
            font-size: 1.25rem;
        }
    }

    @media screen and (max-width: 720px) {
        .consultation_card_container {
            width: 100%;
        }

        .consultation_icon {
            height: auto;
        }

        .date {
            font-size: 1.125rem;
        }

        .time {
            font-size: 1rem;
        }
    }
</style>