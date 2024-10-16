<script setup lang="ts">
import Nav from './components/Nav.vue';
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
    --themeColor: #8278d0;
    --black: #1a1a1a;
    font-family: 'Nunito', sans-serif;
    color: var(--black);
    font-size: 18px;
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
    background-color: white;
    a {
        margin: auto 0;
        img {
            max-width: calc(100% - 2em);
            height: auto;
            max-height: 45px;
        }
    }
}
main {
    margin-top: 60px;
    padding: 10px;
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
