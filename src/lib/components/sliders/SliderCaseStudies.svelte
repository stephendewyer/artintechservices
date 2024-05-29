<script lang="ts">
    import EmblaCarouselSvelte from "embla-carousel-svelte";
    import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
    import Autoplay from "embla-carousel-autoplay";
    import ArrowLeft from "$lib/images/arrows/arrow_left.svg?raw";
    import ArrowRight from "$lib/images/arrows/arrow_right.svg?raw";
    import { onDestroy } from 'svelte';
    
    interface Image {
      index: number;
      url: string;
      alt: string
    };

    const imageModules = import.meta.glob("$lib/images/case_studies/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}", {
        eager: true
    });

    const imageUrls = Object.values(imageModules).map((module: any) => {
        return module.default;
    });

    interface Image {
        index: number;
        url: string;
        alt: string;
    };

    let images: Image[] = [];

    imageUrls.map((imageUrl: string, i: number) => {
            images = [...images, {
            index: i,
            url: imageUrl,
            alt: `case study ${++i}`
            }
        ]
    });

    let emblaApi: EmblaCarouselType;

    let options: EmblaOptionsType = { loop: true };

    let plugins = [Autoplay({
        stopOnInteraction: false, 
        delay: 3000
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
            {@html ArrowLeft}
        </button>
        <button
            on:click={() => scrollNextClickHandler()} 
            on:keyup={() => scrollNextClickHandler()} 
            disabled={!nextBtnEnabled} 
            class="arrow_button"
        >
            {@html ArrowRight}
        </button>
    </div>
    <div class="slide_container">
        <div 
            use:EmblaCarouselSvelte="{{ options, plugins }}"
            on:emblaInit="{onInit}"
            class="embla"
            role="group"
        >   <div class="embla__container">
                    {#each images as image, ix}
                        <div class="embla__slide">
                            <img 
                                class="slide_image"
                                src={image.url} 
                                alt={image.alt}
                            />
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

    .slide_carousel_container {
        max-width: 1440px;
        width: 100%;
        position: relative;
        height: relative;
    }

    .slide_container {
        padding: 0 4rem;
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
        width: 2.5rem;
        padding: 0;
        background: none;
        color: #838b6a;
        fill: #838b6a;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        transition: color 0.3s linear, fill 0.3s linear;
    }

    .arrow_button:hover {
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
        box-shadow: inset 0 0 0 0.2rem #F4FEF2;
        background-color: #F4FEF2; 
        transition: box-shadow 0.3s linear, background-color 0.3s linear;
    }

    .embla__dot--selected:hover::after {
        box-shadow: inset 0 0 0 0.2rem #F4FEF2;
        background-color: #F4FEF2; 
    }

    @media screen and (max-width: 1080px) {
        .arrow_button {
            width: 1.75rem;
        }
    }

    @media (max-width: 750px) {

        .slide_carousel_container {
            display: flex;
            flex-direction: column-reverse
        }

        .slide_container {
            padding: 0;
        }

        .arrows {
            position: relative;
            width: 100%;
            padding: 1rem;
        }

        .arrow_button {
            width: 1.5rem;
        }

        .embla__dots {
            position: absolute;
            bottom: 0.5rem;
            margin: 0 4rem 0 4rem;
            left: 0;
            right: 0;
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