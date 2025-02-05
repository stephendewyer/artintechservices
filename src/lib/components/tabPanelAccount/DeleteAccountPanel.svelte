<script lang="ts">
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";

    const deleteAccountHandler = () => {

    };

</script>
<section>
    <form 
    on:submit|preventDefault={deleteAccountHandler}
    class="form"
    >
        <h2>delete account</h2>
        <p style="padding: 0; margin: 0;">
            Do you want to permanently delete your account?
        </p>
        <SubmitButton02
            disable={false}
        >
            permanently delete my account
        </SubmitButton02>
    </form>
</section>
<style>
    
</style>