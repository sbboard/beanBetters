<script setup lang="ts">
import LoginView from './views/LoginView.vue';
import { useUserStore } from './stores/user';
import SiteFooter from './components/SiteFooter.vue';
import AdRoll from './components/AdRoll.vue';
import { onMounted, ref } from 'vue';
import { checkBeanId } from './composables/useLogin';
import HeaderPanel from './components/HeaderPanel.vue';
import { useApiStore } from './stores/api';

const userStore = useUserStore();
const apiStore = useApiStore();
const loaded = ref(false);
const showFBI = ref(false);
const showHack = ref(false);

function hackSystem() {
    showHack.value = true;
    setTimeout(() => {
        showFBI.value = false;
    }, 750);
}

onMounted(async () => {
    try {
        await apiStore.fetchPolls('open');
        if (!apiStore.polls.open.data.length) showFBI.value = true;

        //autologin
        const beanId = localStorage.getItem('bean_id');
        const beanKey = localStorage.getItem('bean_key');
        if (!beanId || !beanKey) {
            loaded.value = true;
            return userStore.resetUser();
        }
        await checkBeanId(beanId, beanKey);
        loaded.value = true;
    } catch (error) {
        userStore.resetUser();
        console.error('Error during login:', error);
    }
});
</script>

<template>
    <div>
        <template v-if="loaded">
            <div class="fbi" v-if="showFBI">
                <div>
                    <span @click="hackSystem" v-for="n in 2" :key="n"></span>
                    <img
                        v-if="showHack"
                        src="/assets/def.gif"
                        class="loadgif"
                    />
                    <img src="/assets/fed.png" />
                </div>
            </div>
            <template v-else>
                <header>
                    <div>
                        <RouterLink to="/"
                            ><img src="@/assets/words.gif"
                        /></RouterLink>
                    </div>
                    <AdRoll />
                </header>
                <main>
                    <div class="content">
                        <HeaderPanel v-if="userStore.user" />
                        <hr class="welcomeHr" v-if="userStore.user" />
                        <LoginView v-if="userStore.showLogin" />
                        <RouterView v-else-if="userStore.user" />
                    </div>
                </main>
                <SiteFooter />
            </template>
        </template>
    </div>
</template>

<style lang="scss">
html {
    --themeColor: #daff3c;
    --themeColorOpaque: #daff3c50;
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
    height: 50px;
    z-index: 5000;
    background-color: black;
    position: relative;
    overflow: hidden;
    background: url('/assets/bg.png');
    & > div {
        max-width: 1000px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        position: relative;
        z-index: 1;
        height: 100%;
        backdrop-filter: brightness(0.75) blur(5px);
        flex-direction: row;
        align-items: center;
        a {
            line-height: 0;
            width: fit-content;
            margin: 0 auto;
            img {
                height: auto;
                max-height: 45px;
                filter: sepia(1) hue-rotate(33deg) saturate(3.5) contrast(1.5);
                max-width: calc(100vw - 20px);
            }
        }
    }
}

main {
    position: relative;
    overflow: auto;
    background-image: url('/assets/casino.jpg');
    background-attachment: fixed;
    min-height: calc(100vh - 100px);
    width: 100%;
    inset: 0;
    background-size: cover;
    z-index: 0;
    .content {
        display: flex;
        max-width: 1000px;
        margin: 0 auto;
        box-sizing: border-box;
        flex-direction: column;
        padding: 20px;
        backdrop-filter: brightness(0.5) blur(8px);
        height: auto;
        min-height: inherit;
    }
}

a {
    color: var(--themeColor);
    text-decoration: none;
    &:active {
        background-color: white;
    }
    &:hover {
        text-decoration: underline;
    }
}

strong {
    font-weight: bold;
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

h1 {
    margin-bottom: 1rem;
    font-size: 1.3em;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: var(--themeColor);
}

h2 {
    @extend h1;
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 1rem;
}
h3 {
    @extend h2;
    color: white;
    margin-bottom: 0;
    text-align: center;
}
h4 {
    @extend h2;
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    text-align: left;
}
p {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    text-align: center;
}

table {
    width: 100%;
    tbody,
    tr,
    th,
    td {
        border: 1px solid var(--themeColor);
    }
    th {
        background-color: var(--themeColor);
        color: black;
        font-weight: bold;
    }
    td,
    th {
        padding: 0.25em;
    }
}

.option {
    margin-bottom: 10px;
    display: flex;
    cursor: pointer;
    align-items: center;
    .selector {
        height: 20px;
        width: 20px;
        border: 1px solid var(--themeColor);
        box-sizing: border-box;
        user-select: none;
        position: relative;
        overflow: visible;
        &.selected {
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 0;
            position: relative;
            overflow: visible;
            span {
                position: absolute;
                top: 50%;
                bottom: 0;
            }
        }
    }
}

hr.welcomeHr {
    width: 100%;
    margin-bottom: 20px;
}

.fbi {
    width: 100vw;
    position: absolute;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        position: absolute;
        img {
            width: auto;
            max-width: 100vw;
            max-height: 100vh;
            &.loadgif {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        span {
            cursor: pointer;
            position: absolute;
            bottom: 2%;
            height: 5%;
            &:nth-of-type(1) {
                right: 6%;
                width: 11%;
            }
            &:nth-of-type(2) {
                left: 28%;
                width: 14%;
            }
        }
    }
}
</style>
