<script lang="ts">
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import { afterUpdate } from 'svelte';
  
    interface Image {
      index: number;
      url: string;
      alt: string
    }

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
  
    // set up carousel config
    const mainOptions = {
      pagination: true,
      type: "loop",
      gap     : '1rem',
      autoplay: true,
      arrows  : true,
    };

</script>

<div class="main_splide_container">
    <Splide 
        aria-label="quilt images" 
        options={ mainOptions } 
    >
        {#each images as image, ix}
            <SplideSlide>
                <img 
                    class="slide_image"
                    src={image.url} 
                    alt={image.alt}
                />
            </SplideSlide>
        {/each} 
    </Splide> 
</div> 

<style>
    .main_splide_container {
        max-width: 2000px;
        width: 100%;
        height: auto;
        max-height: 1333px;
        overflow: hidden;
        margin: 0 auto 2rem auto;
    }

    .slide_image {
        width: 100%;
        height: 100%;
        max-height: 1333px;
        object-fit: cover;
    }

    .thumbnails_splide_container {
        width: 100%;
        max-width: 2000px;
        margin: 0 auto;
    }

    .thumbnails {
        padding: 0 10rem;
    }

    .quilt_details {
        max-width: 40rem;
        width: 100%;
        padding: 0 1rem;
        margin: 1rem auto;
    }

    .quilt_title {
        width: 100%;
        margin: 4rem auto 1rem auto;
        padding: 0 1rem 0 1rem;
        text-align: center;
        font-size: 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .underline_stitches {
        width: 12rem;
        margin: 1rem auto auto auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .quilt_info {
        text-align: left;
        margin: 2rem auto auto auto;
    }

    ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

    .quilt_info_list_item {
        display: flex;
        flex-direction: row;
        padding: 0.5rem 1rem;
    }

    .list_item_background {
        background-color: rgba(233, 237, 255, 0.5);
    }

    .quilt_info_heading {
        margin: 0;
        padding: 0 0.5rem 0 0;
        width: 40%;
        height: 100%;
        font-size: 1.75rem;
        text-align: left;
        font-weight: bold;
    }

    .quilt_info_paragraphs {
        margin: 0;
        width: 60%;
    }

    .buttons_container {
        width: 100%;
        max-width: 2000px;
        margin: 2rem auto;
        padding: 0 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    @media (max-width: 750px) {

        .main_splide_container {
            margin: 0 0 1rem 0;
        }

        .slide_image {
            width: 100%;
            height: 20rem;
            object-fit: cover;
        }

        .thumbnails {
            padding: 0 1rem;
        }
        
        .quilt_title {
            width: 100%;
            margin: 1.75rem auto 1rem auto;
            padding: 0 1rem 1rem;
            text-align: center;
            font-size: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .underline_stitches {
            width: 8rem;
            margin: 0.5rem auto auto auto;
        }

        .quilt_info {
            margin: 0rem auto auto auto;
        }

        .quilt_info_list_item {
            display: flex;
            flex-direction: column;
        }

        .quilt_info_heading {
            margin: 0;
            padding: 0 0.5rem 0 0;
            width: 100%;
            height: 100%;
            font-size: 1rem;
            text-align: left;
        }

        .quilt_info_paragraphs {
            margin: 0;
            width: 100%;
        }

        .buttons_container {
            width: auto;
            max-width: auto;
            margin: 0;
            padding: 0;
        }
    }

</style>