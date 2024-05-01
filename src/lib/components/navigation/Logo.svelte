<script lang="ts">
    import ArtInTechServicesLogo from "$lib/images/logo/Art_in_Tech_Services_logo.svg?raw";

</script>
<div class="logo">
    {@html ArtInTechServicesLogo}
</div>

<style>
    .logo {
        position: relative;
        min-width: 12rem;
        transition: all 0.15s;
        background-color: #ffff;
        padding: 0.75rem 1rem;
        fill: #838b6a;
        transition: all 0.2s;
    }

    .logo:hover {
        fill: #B2A1A1;
        transition: all 0.2s;
    }

    @media screen and (max-width: 1440px) {
        .logo {
            min-width: 10rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .logo {
            min-width: 8rem;
        }
    }

    @media screen and (max-width: 750px) {
        
        .logo {
            min-width: 8rem;
        }

    }
</style>