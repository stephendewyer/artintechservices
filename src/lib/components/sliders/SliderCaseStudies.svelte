<script lang="ts">
    import EmblaCarouselSvelte from "embla-carousel-svelte";
    import Autoplay from "embla-carousel-autoplay";
    
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

    let emblaApi;
    let options = { loop: true };
    let plugins = [Autoplay()]

    function onInit(event: { detail: any; }) {
        emblaApi = event.detail;
        console.log(emblaApi.slideNodes()); // Access API
    };

    const previousClickHandler = () => {
 
    }

</script>

<div 
    use:EmblaCarouselSvelte="{{ options, plugins }}"
    on:emblaInit="{onInit}"
    class="embla"
    role="group"
>
    <div class="embla__container">
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

<style>
    .embla {
        max-width: 2000px;
        width: 100%;
        height: auto;
        max-height: 1333px;
        overflow: hidden;
        margin: 0 auto 2rem auto;
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