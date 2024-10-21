<script lang="ts">
    import SettingsIcon from "$lib/images/icons/settings_icon.svg?raw";
</script>

<section class="account_page">
    <div class="account_heading">
        <h1>account</h1>
        <div class="settings_icon">
            {@html SettingsIcon}
        </div>
    </div>

</section>

<style>
    .account_page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .account_heading {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .settings_icon {
        width: 12rem;
    }
</style>