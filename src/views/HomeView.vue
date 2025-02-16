<template>
    <div class="home">
        <div class="wrap">
            <img src="/assets/home.gif" />
            <hr />
            <div>
                <img src="/assets/logo.jpg" />
                <div>
                    <RouterLink to="/bets"
                        ><img src="/assets/bets.gif"
                    /></RouterLink>
                    <!-- <RouterLink to="/leaderboards"
                        ><img src="/assets/charts.gif"
                    /></RouterLink> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    background-image: url('/assets/casino.jpg');
    min-height: 100%;
    width: 100%;
    position: absolute;
    inset: 0;
    background-size: cover;
    z-index: 0;
    .wrap {
        display: flex;
        max-width: 1000px;
        margin: 0 auto;
        box-sizing: border-box;
        flex-direction: column;
        padding: 20px;
        height: 100%;
        backdrop-filter: brightness(0.5) blur(8px);
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
        }
    }
}
</style>
