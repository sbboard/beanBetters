<script setup lang="ts">
import Nav from './components/HeaderNav.vue';
import LoginView from './views/LoginView.vue';
import { useUserStore } from './stores/user';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
    <header>
        <RouterLink to="/"><img src="@/assets/words.gif" /></RouterLink>
        <Nav v-if="useUserStore().isLoggedIn" />
    </header>
    <main>
        <div class="content">
            <LoginView v-if="!useUserStore().isLoggedIn" />
            <RouterView v-else />
        </div>
    </main>
    <SiteFooter />
</template>

<style lang="scss">
html {
    --themeColor: #daff3c;
    font-family: 'Nunito', sans-serif;
    color: white;
    font-size: 18px;
    min-height: 100vh;
}

body {
    height: 100%;
    background-color: black;
}
header {
    height: 40px;
    max-width: calc(1000px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    z-index: 5000;
    background-color: black;
    a {
        margin: auto 0;
        img {
            max-width: calc(100% - 2em);
            height: auto;
            max-height: 45px;
            filter: sepia(1) hue-rotate(29deg) contrast(2);
        }
    }
}

main {
    height: calc(100vh - 110px);
    position: relative;
    overflow: auto;
    background-image: url('/assets/casino.jpg');
    min-height: 100%;
    width: 100%;
    inset: 0;
    background-size: cover;
    z-index: 0;
    scrollbar-color: var(--themeColor) black;
    scrollbar-width: thin;
    .content {
        display: flex;
        max-width: 1000px;
        margin: 0 auto;
        box-sizing: border-box;
        flex-direction: column;
        padding: 20px;
        backdrop-filter: brightness(0.5) blur(8px);
        height: auto;
        min-height: 100%;
    }
}

a {
    color: var(--themeColor);
    text-decoration: none;
    &:active {
        background-color: white;
    }
}

figure {
    padding: 10px;
    border: 1px solid var(--themeColor);
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    & > * {
        display: inline-block;
    }
    img {
        width: 100px;
    }
    figcaption {
        margin-left: 10px;
        blockquote {
            font-size: 1em;
            text-align: left;
            p {
                font-style: italic;
            }
            cite {
                text-align: right;
                display: block;
                margin-top: 0.5em;
            }
        }
    }
}
</style>
