<script setup lang="ts">
import Nav from './components/HeaderNav.vue';
</script>

<template>
    <div>
        <header>
            <a href="/"><img src="@/assets/words.gif" /></a>
            <Nav />
        </header>
        <main>
            <RouterView />
        </main>
    </div>
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
    position: fixed;
    inset: 0;
    height: 40px;
    max-width: calc(100vw - 20px);
    display: flex;
    justify-content: space-between;
    border-bottom: var(--themeColor) 1px solid;
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
main {
    margin: 70px auto 0;
    max-width: 500px;
    width: 100%;
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
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
