<script setup lang="ts">
import LoginView from './views/LoginView.vue';
import { useUserStore } from './stores/user';
import SiteFooter from './components/SiteFooter.vue';
import AdRoll from './components/AdRoll.vue';
import { onMounted } from 'vue';
import { readScrambledId } from './composables/useLogin';
import { useLogout } from '@/composables/useLogin';
import { useEconomy } from '@/composables/useEconomy';

const userStore = useUserStore();
const { addCommas } = useEconomy();

onMounted(async () => {
    try {
        const beanId = localStorage.getItem('bean_id');
        if (!beanId) return userStore.resetUser();
        await readScrambledId(beanId);
    } catch (error) {
        userStore.resetUser();
        console.error('Error during login:', error);
    }
});
</script>

<template>
    <div>
        <header>
            <div>
                <RouterLink to="/"><img src="@/assets/words.gif" /></RouterLink>
            </div>
            <AdRoll />
        </header>
        <main>
            <div class="content">
                <div class="welcome" v-if="userStore.user">
                    <div>
                        Happy betting,
                        <strong
                            >{{ userStore.user?.role }}
                            {{ userStore.user?.name }}</strong
                        ><br />
                        Bean Bag:
                        <strong
                            >{{
                                addCommas(userStore.user?.beans || 0)
                            }}
                            Beans</strong
                        >
                    </div>
                    <div @click="useLogout()" class="logout">Logout</div>
                </div>
                <hr class="welcomeHr" v-if="userStore.user" />
                <LoginView v-if="userStore.showLogin" />
                <RouterView v-else-if="userStore.user" />
            </div>
        </main>
        <SiteFooter />
    </div>
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

.welcome {
    display: flex;
    margin-top: 10px;
    flex-direction: row;
    font-size: 1.1em;
    align-items: end;
    justify-content: space-between;
    & > div {
        display: block;
        max-width: unset;
    }
    strong {
        font-weight: bold;
    }
    .logout {
        text-align: right;
        width: fit-content;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}

hr.welcomeHr {
    width: 100%;
    margin-bottom: 20px;
}
</style>
