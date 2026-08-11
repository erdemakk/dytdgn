<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import KoalaChat from '$lib/components/KoalaChat.svelte';
</script>

<Header />
<slot />
<KoalaChat />