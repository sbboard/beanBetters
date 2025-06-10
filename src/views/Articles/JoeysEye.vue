<script setup lang="ts">
import BannerAd from '@/components/BannerAd.vue';

const story = [
    {
        title: 'Q: Hey Joey, anything new?',
        text: `A: Really? Seriously? You didn't notice that my left eye is missing? You didn't notice my big stupid eye-patch? I mean, it's just an eye, I guess. It's not like I lost my arm or something.`,
        img: '/assets/meetTheArtist/1.jpg',
    },
    {
        title: `Q: How did you lose your eye?`,
        text: `A: I was just minding my own business, drawing some art for Big Bean Bettors, when all of a sudden I felt this sharp pain in my eye. I thought it was just a scratch or something, but then I realized that my eye was gone. I don't know how it happened, but it did. I guess I'm just really unlucky. My neighbor said that he saw a bird fly into my eye and take it out. I don't know if that's true, but it's the only explanation I can think of.`,
        img: '/assets/meetTheArtist/2.jpg',
    },
    {
        title: `Q: Do you think God is punishing you for assaulting a police officer, or that time you tried to poison your girlfriend, or for the murder you did?`,
        text: `A: Yeah I don't know. Maybe. Probably not. A priest told me I'm in good standing with the big guy and I was circumsized as a teenage so I think I'm good.`,
        img: '/assets/meetTheArtist/2.jpg',
    },
    {
        title: `Q: People who buy your eye in the bean exchange are seeing weird things. There's rumors that how the eye makes people see, that's how you see the world. Is that true?`,
        text: `A: I don't know, is everyone who buys my eye seeing their girlfriends betray them? Is everyone who buys my eye seeing their deepest fears? I have no idea how this thing works, but if it helps people confront their issues, then maybe it's a good thing?`,
    },
    {
        title: `Q: No like, everything looks really scary.`,
        text: `A: That happens to me when I drink too much caffeine but I kind of like it. Internally my life in a horror movie, so it's kind of appropriate when the world I see reflects that.`,
    },
    {
        title: `Q: What's the worst part about only have one eye?`,
        text: `A: The fear that Mr Beast will release a 3D video that I can't experience in its 3D glory. Or maybe he'll release a video where he finds a bunch of people with one eye and gives them all $1,000,000 and I'll show up in the video and barf all over the place because I'm so nervous and Mr Beast will be like "What the hell is wrong with this guy?" and I'll be like "I don't know, I just have one eye!" and then everyone will laugh at me and I'll feel like a loser.`,
    },
];
</script>

<template>
    <img
        src="/assets/meetTheArtist/ad.jpg"
        alt="Joey Papernut"
        style="margin-bottom: 1em"
    />
    <div class="meetArtist">
        <p style="margin-bottom: 1em">
            Note: This is part of our ongoing series of interviews with Joey
            Papernut. Make sure to read the other parts of the series to get the
            full story.
        </p>
        <p style="margin-bottom: 1em">
            A lot has happened since we last spoke with Joey Papernut, the
            artist behind all the iconic art of Big Bean Bettors. Most notably,
            his left eye has appeared on the bean exchange for the low price of
            10,000 beans. In this entry in the artist series, we sit down with
            him to learn about how this came to be, and what it means for the
            future of Big Bean Bettors and the betting community as a whole.
        </p>
        <div
            class="block"
            v-for="(item, index) in story"
            :key="index"
            :class="{ right: index % 2 === 0 }"
        >
            <img :src="item.img" alt="Joey Papernut" />
            <div>
                <h1>{{ item.title }}</h1>
                <p>{{ item.text }}</p>
            </div>
        </div>
        <p></p>
    </div>
    <BannerAd disable-hr="true" />
</template>

<style lang="scss" scoped>
img {
    max-width: 100%;
}
p {
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: left;
}
.meetArtist {
    max-width: 700px;
    margin: 0 auto;
}
.block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
    gap: 1em;
    h1 {
        text-align: left;
    }
    &.right {
        flex-direction: row-reverse;
    }
    img {
        width: 20%;
        max-width: 100%;
        aspect-ratio: 1;
        border-radius: 10px;
    }
}

@media (max-width: 700px) {
    .block {
        flex-direction: column !important;
        img {
            width: 100%;
        }
    }
}
</style>
