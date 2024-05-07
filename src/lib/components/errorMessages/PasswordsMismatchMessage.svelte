<script lang="ts">
    import ErrorIcon from "$lib/components/flashIcons/ErrorIcon.svelte";
    
    </script>
    
    <div class="passwords_mismatch_container">
        <ErrorIcon />
        <slot />
    </div>
    
    <style>
        .passwords_mismatch_container {
            color: #9F1D20;
            font-size: 1.5rem;
            padding: 0 1rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
    
        @media (max-width: 1440px) {
            .passwords_mismatch_container {
                font-size: 1.25rem;
            }
        }
    
        @media (max-width: 720px) {
            .passwords_mismatch_container {
                font-size: 1rem;
            }
        }
    </style>