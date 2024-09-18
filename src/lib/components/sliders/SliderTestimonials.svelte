<script lang="ts">
    import EmblaCarouselSvelte from "embla-carousel-svelte";
    import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
    import Autoplay from "embla-carousel-autoplay";
    import ArrowLeft from "$lib/images/arrows/arrow_left.svg?raw";
    import ArrowRight from "$lib/images/arrows/arrow_right.svg?raw";
    import SuzanneContiProfile from "$lib/images/testimonials/Suzanne_Conti.jpg";
    import HollieGreeneRottmanProfile from "$lib/images/testimonials/Hollie_Greene_Rottman.jpg";
    import { onDestroy } from 'svelte';
    
    interface Slide {
      index: number;
      imageSrc: string;
      alt: string;
      name: string;
      company: string;
      paragraph: string;
      date: string;
    };

    let testimonials: Slide[] = [
        {
            index: 1,
            imageSrc: SuzanneContiProfile,
            alt: "Suzanne Conti profile",
            name: "Suzanne Conti",
            company: "Suzanne Conti Quilts",
            paragraph: "Art in Tech Services was extremely professional and generous in working to create my website to my expectations. Art in Tech Services had tremendous ideas and understood what I was trying to achieve with my website. Art in Tech Services exceeded my expectations for the functions of the website. I love the art and design. The sorting and filters were exceptional. I also like how Art in Tech Services created a special section for ancestral quilts. Art in Tech Services's leadership is outstanding, customer focused and determined to please. Great value. You cannot go wrong hiring Art in Tech Services.",
            date: "6 May 2024"
        },
        {
            index: 2,
            imageSrc: HollieGreeneRottmanProfile,
            alt: "Hollie Greene Rottman profile",
            name: "Chef Hollie Greene Rottman",
            company: "Joyfoodly",
            paragraph: "Art in Tech Services [made] our daunting project of closing our business and two sites so easy and stress free. The legacy site Art in Tech Services created was exactly what we wanted. We appreciated Art in Tech Services's proactive way of working with us, never finding a challenge too much to handle. Art in Tech Services is a joy to work with!",
            date: "12 February 2022"
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
                {#each testimonials as testimonial, i}
                    <div class="embla__slide">
                        <div class="slide_inner">
                            <div class="profile">
                                <img 
                                    class="slide_image"
                                    src={testimonial.imageSrc} 
                                    alt={testimonial.alt}
                                />
                                <h4 class="name">{testimonial.name}</h4>
                                <h5 class="company">{testimonial.company}</h5>
                            </div>
                            <p class="paragraphs">
                                <span class="review">{testimonial.paragraph}</span>
                                <span class="date">{testimonial.date}</span>
                            </p>    
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

    .profile {
        width: 100%;
        max-width: 12rem;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        float: left;
        padding: 0 0.5rem 0.2rem 0;
    }

    .review {
        padding: 0;
        margin: 0;
        display: block;
    }

    .date {
        padding: 0.5rem 0 0 0;
        margin: 0;
        font-style: italic;
        display: block;
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
        transition: color 0.3s linear, fill 0.3s linear;
    }

    .arrow_container {
        width: 1rem;
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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

    @media screen and (max-width: 1080px) {
    }

    @media (max-width: 750px) {

        .profile {
            max-width: 8rem;
        }

        .slide_container {
            padding: 0 3rem;
        }

        .arrows {
            padding: 0.5rem;
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