<template>
    <div class="home">
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
</template>

<style lang="scss" scoped>
.home {
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
</style>
