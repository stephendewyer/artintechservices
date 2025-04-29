<script lang="ts">
    import Meatballs from "$lib/images/icons/meaballs.svg?raw";
    import { ConvertTimeToStandard } from "$lib/util/convertTimeToStandard";
    import ConsultationIcon from "$lib/images/icons/consultation_icon.svg?raw"
    import Clouds from "$lib/images/consultation/white-fluffy-clouds.jpg";

    export let consultation: Consultation;

    const topicArray = consultation.consultation_topic.split(" ");
    const topicShortened = topicArray.slice(0, 5).join(" ");

    let includeDotDotDot: boolean = false;

    if (topicArray.length > topicArray.slice(0, 5).length) {
        includeDotDotDot = true;
    };

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
    <div class="consultation_card_content">
        <div class="consultation_icon">
            {@html ConsultationIcon}
        </div>
        <div class="consultation_info">
            <div class="meatballs_container">
                <div 
                    class="meatballs"
                    style={cardHovered ? "fill: #d79679;": "fill: #36261E;"}
                >
                    {@html Meatballs}
                </div>
            </div>
            <h4 style="margin: 0;" class="date">{new Date(consultation.consultation_date).toUTCString().slice(0, 16)}</h4>
            <h5 style="margin: 0;" class="time">{ConvertTimeToStandard(consultation.consultation_time)} {consultation.time_zone}</h5>
            <p style="margin: 0;">{topicShortened}{#if includeDotDotDot}...{/if}</p>
        </div>
    </div>
</a>
<style>
    .consultation_card_container {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        width: 100%;
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
        position: relative;
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
        gap: 1rem;
        width: 100%;
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
        min-width: 4rem;
        fill: #3D3832;
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
            min-width: 3.5rem;
        }

    }

    @media screen and (max-width: 1080px) {

        .consultation_icon {
            min-width: 3rem;
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

        .date {
            font-size: 1.125rem;
        }

        .time {
            font-size: 1rem;
        }
    }
</style>