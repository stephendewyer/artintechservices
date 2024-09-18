<script lang="ts">
    import EmblaCarouselSvelte from "embla-carousel-svelte";
    import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
    import Autoplay from "embla-carousel-autoplay";
    import ArrowLeft from "$lib/images/arrows/arrow_left.svg?raw";
    import ArrowRight from "$lib/images/arrows/arrow_right.svg?raw";
    import Terravision from "$lib/images/context/context_02.jpg";
    import LeVoyageDansLaLune from "$lib/images/context/context_01.jpg";

    import { onDestroy } from 'svelte';
    
    interface Slide {
      index: number;
      imageSrc: string;
      alt: string;
      paragraph: string;
    };

    let contextExamples: Slide[] = [
        {
            index: 1,
            imageSrc: LeVoyageDansLaLune,
            alt: "still from Le voyage dans la lune (A Trip to the Moon), 1902, written, directed and produced by Georges Méliès",
            paragraph: "Still from Le voyage dans la lune (A Trip to the Moon), 1902, written, directed and produced by Georges Méliès."
        },
        {
            index: 2,
            imageSrc: Terravision,
            alt: "Terravision, a 3D mapping software developed in 1993 by the German company ART+COM in Berlin",
            paragraph: "Terravision, a 3D mapping software developed in 1993 by the German company ART+COM in Berlin.  Terravision was a prequel to Google Earth."
        }
    ];

    let emblaApi: EmblaCarouselType;

    let options: EmblaOptionsType = { loop: true };

    let plugins = [Autoplay({
        stopOnInteraction: false, 
        delay: 6000
    })];

    let selectedIndex: number = 0;

    const onSelect = (emblaApi: EmblaCarouselType): void => {
        if (!emblaApi) {
            return;
        };
        selectedIndex = emblaApi.selectedScrollSnap();
    };

    let prevBtnEnabled: boolean = false;
    let nextBtnEnabled: boolean = false;

    let scrollSnaps: number[] = [];

    function onInit(event: { detail: EmblaCarouselType }) {
        emblaApi = event.detail;
        // console.log(emblaApi.slideNodes()); // Access API
        emblaApi.on("select", onSelect);
        if (emblaApi.canScrollNext()) {
            nextBtnEnabled = true;
        } else {
            nextBtnEnabled = false;
        };
        if (emblaApi.canScrollPrev()) {
            prevBtnEnabled = true;
        } else {
            prevBtnEnabled = false;
        };
        scrollSnaps = emblaApi.scrollSnapList();
        
    };

    onDestroy(() => {
        emblaApi?.destroy();
    });

    const onNavButtonClick = (emblaApi: EmblaCarouselType) => {
        const autoplay: any = emblaApi?.plugins()?.autoplay;
        autoplay.reset();
    };

    const scrollPreviousClickHandler = () => {
        emblaApi.scrollPrev();
        onNavButtonClick(emblaApi);
    };

    const scrollNextClickHandler = () => {
        emblaApi.scrollNext();
        onNavButtonClick(emblaApi);
    };

    const scrollTo = (index: number) => {
        emblaApi.scrollTo(index);
        const autoplay: any = emblaApi?.plugins()?.autoplay;
        autoplay.reset();
    };

</script>
<div class="slide_carousel_container">
    <div class="arrows">
        <button
            on:click={() => scrollPreviousClickHandler()} 
            on:keyup={() => scrollPreviousClickHandler()} 
            disabled={!prevBtnEnabled} 
            class="arrow_button"
        >
            <div class="arrow_container">
                {@html ArrowLeft}
            </div>
        </button>
        <button
            on:click={() => scrollNextClickHandler()} 
            on:keyup={() => scrollNextClickHandler()} 
            disabled={!nextBtnEnabled} 
            class="arrow_button"
        >
            <div class="arrow_container">
                {@html ArrowRight}
            </div>
        </button>
    </div>
    <div class="slide_container">
        <div 
            use:EmblaCarouselSvelte="{{ options, plugins }}"
            on:emblaInit="{onInit}"
            class="embla"
            role="group"
        >   <div class="embla__container">
                {#each contextExamples as contextExample, i}
                    <div class="embla__slide">
                        <div class="slide_inner">
                            <div class="context_example">
                                <img 
                                    class="slide_image"
                                    src={contextExample.imageSrc} 
                                    alt={contextExample.alt}
                                />
                                <p class="paragraphs">
                                    {contextExample.paragraph}
                                </p>   
                            </div>
                        </div>
                    </div>
                {/each} 
            </div>
        </div>
    </div>
    <div class="embla__dots">
        {#each scrollSnaps as _, index}
            <button
              on:click={() => scrollTo(index)}
              class={`embla__dot ${(index === selectedIndex) ? "embla__dot--selected" : ""}`}
            >
            </button>
        {/each}
    </div>
</div>

<style>

    .slide_image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .slide_carousel_container {
        max-width: 60rem;
        width: 100%;
        position: relative;
        height: relative;
        margin: 0 auto;
    }

    .slide_container {
        padding: 0 4rem;
    }

    .slide_inner {
        display: block;
    }

    .context_example {
        position: relative;
        width: 100%;
        height: 32rem;
    }

    .paragraphs {
        position: absolute;
        background-color: rgb(244,254,242, 0.75);
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        padding: 0.5rem 1rem;
    }

    .embla {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: 0 auto 0 auto;
    }

    .arrows {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        margin: 0 auto;
        background: transparent;
    }

    .arrow_button {
        position: relative;
        padding: 1rem;
        background: none;
        color: #838b6a;
        fill: #838b6a;
        background-color: rgb(244,254,242, 1);
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
    }

    .arrow_container {
        width: 1rem;
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: color 0.3s linear, fill 0.3s linear;
    }

    .arrow_button:hover > .arrow_container {
        color: #d79679;
        fill: #d79679;
    }

    .embla__container {
        display: flex;
    }

    .embla__slide {
        flex: 0 0 100%;
        width: 100%;
        height: 100%;
        max-height: 1333px;
    }

    .embla__dots {
        position: relative;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .embla__dot {
        -webkit-tap-highlight-color: rgba(49, 49, 49, 0.5);
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        touch-action: manipulation;
        display: inline-flex;
        text-decoration: none;
        cursor: pointer;
        border: 0;
        padding: 0;
        margin: 0;
        width: 2.6rem;
        height: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .embla__dot::after {
        box-shadow: inset 0 0 0 0.2rem #838b6a;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        content: '';
        transition: box-shadow 0.3s linear, background-color 0.3s linear;
    }

    .embla__dot:hover::after {
        box-shadow: inset 0 0 0 0.2rem #d79679;
    }

    .embla__dot--selected::after {
        box-shadow: inset 0 0 0 0.2rem #838b6a;
        background-color: #F4FEF2; 
        transition: box-shadow 0.3s linear, background-color 0.3s linear;
    }

    .embla__dot--selected:hover::after {
        box-shadow: inset 0 0 0 0.2rem #838b6a;
        background-color: #F4FEF2; 
    }

    @media screen and (max-width: 1440px) {
        .context_example {
            height: 26rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .context_example {
            height: 20rem;
        }
    }

    @media (max-width: 750px) {

        .context_example {
            height: 16rem;
        }

        .slide_container {
            padding: 0 3rem;
        }

        .arrows {
            padding: 0rem;
        }

        .arrow_button {
            padding: 0.75rem;
        }

        .arrow_container {
            min-width: 0.75rem;
        }

        .embla__dots {
            position: relative;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
        }

        .embla {
            margin: 0;
        }

        .embla__slide {
            width: 100%;
        }
    }

</style>