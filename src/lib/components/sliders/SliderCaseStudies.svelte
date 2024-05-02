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

    function onInit(event: { detail: EmblaCarouselType }) {
        emblaApi = event.detail;
        console.log(emblaApi.slideNodes()); // Access API
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
    
</div>

<style>

    .slide_carousel_container {
        max-width: 1440px;
        width: 100%;
        position: relative;
    }

    .slide_container {
        padding: 0 4rem;
    }

    .embla {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: 0 auto 2rem auto;
    }

    .arrows {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
        padding: 20px 0;
        margin: 0 auto;
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

    .slide_image {

    }

    @media (max-width: 750px) {

        .embla {
            margin: 0 0 1rem 0;
        }

        .embla__slide {
            width: 100%;
        }
    }

</style>