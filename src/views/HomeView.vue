<script setup lang="ts">
const random = Math.floor(Math.random() * 10) + 1 + 'px';
const flipped = `-${random}`;
</script>

<template>
    <div class="home">
        <img src="/assets/home.gif" />
        <hr />
        <div>
            <div class="left">
                <img class="bean" src="/assets/bean.png" />
                <img src="/assets/bg.jpg" />
            </div>
            <div>
                <RouterLink to="/bets"
                    ><img src="/assets/bets.gif"
                /></RouterLink>
                <RouterLink to="/leaderboards"
                    ><img src="/assets/leader.gif"
                /></RouterLink>
                <RouterLink to="/notes"
                    ><img src="/assets/patch.gif"
                /></RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    img {
        filter: sepia(1) hue-rotate(29deg) contrast(2);
    }
    & > img {
        max-width: 100%;
    }
    hr {
        width: 100%;
        margin: 25px 0 50px 0;
    }
    & > div {
        display: flex;
        justify-content: space-between;
        & > img,
        & > div {
            max-width: 50vmin;
            display: inline-flex;
            flex-direction: column;
            vertical-align: text-top;
            align-items: flex-end;
            border-radius: 10px;
            & > a {
                min-width: 100%;
                display: block;
                & > img {
                    max-width: 100%;
                }
            }
        }
        .left {
            position: relative;
            img {
                max-width: 100%;
                filter: none;
            }
            .bean {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                animation: mover 1ms infinite alternate linear;
            }
        }
    }
}

@keyframes mover {
    0% {
        transform: translateX(v-bind(random));
    }
    100% {
        transform: translateX(v-bind(flipped));
    }
}
</style>
