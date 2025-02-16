<script setup lang="ts">
import Nav from './components/HeaderNav.vue';
import LoginView from './views/LoginView.vue';
import { useUserStore } from './stores/user';
</script>

<template>
    <header>
        <RouterLink to="/"><img src="@/assets/words.gif" /></RouterLink>
        <Nav v-if="useUserStore().isLoggedIn" />
    </header>
    <main>
        <LoginView v-if="!useUserStore().isLoggedIn" />
        <RouterView v-else />
    </main>
    <footer>
        &copy; {{ new Date().getFullYear() + 15 }} The United Nations of
        Gamblers
    </footer>
</template>

<style lang="scss">
html {
    --themeColor: #30ff8c;
    --black: #141414;
    font-family: 'Nunito', sans-serif;
    color: white;
    font-size: 18px;
    min-height: 100vh;
}

body {
    height: 100%;
    background: linear-gradient(180deg, var(--black) 0%, black 100%);
}
header {
    height: 40px;
    max-width: calc(1000px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    z-index: 5000;
    background-color: var(--black);
    a {
        margin: auto 0;
        img {
            max-width: calc(100% - 2em);
            height: auto;
            max-height: 45px;
            filter: hue-rotate(260deg) saturate(2.5);
        }
    }
}

footer {
    height: 15px;
    text-align: right;
    color: var(--themeColor);
    font-size: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 10px;
    max-width: calc(1000px);
    margin: 0 auto;
}

main {
    height: calc(100vh - 81px);
    position: relative;
    overflow: auto;
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
