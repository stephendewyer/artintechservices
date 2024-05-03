<script lang="ts">
    import EmblaCarouselSvelte from "embla-carousel-svelte";
    import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
    import Autoplay from "embla-carousel-autoplay";
    import ArrowLeft from "$lib/images/arrows/arrow_left.svg?raw";
    import ArrowRight from "$lib/images/arrows/arrow_right.svg?raw";
    
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

    let prevBtnEnabled: boolean = false;
    let nextBtnEnabled: boolean = false;

    let scrollSnaps: number[] = [];

    function onInit(event: { detail: EmblaCarouselType }) {
        emblaApi = event.detail;
        // console.log(emblaApi.slideNodes()); // Access API

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

    let selectedIndex: number;

    const scrollTo = (index: number) => {
        selectedIndex = emblaApi.selectedScrollSnap();
        emblaApi.scrollTo(index);
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
              class={`embla__dot ${(index === selectedIndex) ? "" : ""}`}
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
        width: 3rem;
        background: none;
        color: #D79679;
        fill: #D79679;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        transition: color 0.3s linear, fill 0.3s linear;
    }

    .arrow_button:hover {
        color: #81D0D9;
        fill: #81D0D9;
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
    .embla__dot:after {
        box-shadow: inset 0 0 0 0.2rem rgb(234, 234, 234);;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        content: '';
    }
    .embla__dot--selected:after {
        box-shadow: inset 0 0 0 0.2rem rgb(54, 49, 61);
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
            padding:1rem;
        }

        .arrow_button {
            width: 2rem;
            z-index: 2;
        }

        .embla__dots {
            position: absolute;
            bottom: 0.5rem;
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