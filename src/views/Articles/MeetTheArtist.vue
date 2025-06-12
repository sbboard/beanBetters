<script setup lang="ts">
import BannerAd from '@/components/BannerAd.vue';
import { computed } from 'vue';
const hasEye = computed(() => true);

const story = [
    {
        title: 'Q: How did you get into art?',
        text: `A: When I joined Big Bean Bettors there was no art on the site. It was all words and numbers. Like the Matrix but cooler. I said to the people running the site - "Hey lets get some JPEGs in here." They said "No, we don't want any JPEGs." I said "What if I made the JPEGs?" They said "Okay, but only if you make them really good." I had never drawn before but it's actually really easy. It's so easy a dog could do it. And not like a smart dog. Like a really dumb dog. So yeah, I started drawing and now I'm the best artist in the world. I don't know how it happened, but it did. I guess I'm just really good at drawing.`,
        img: '/assets/meetTheArtist/1.jpg',
    },
    {
        title: `Q: What's your art process like?`,
        text: `A: I wake up in the morning and I drink a cup of soda. Then I go crazy and start drawing. The Big Bean Bettors House and the Soda Enjoyer Seed Fund tells me what to draw. I draw it. I send it to them. They pay me. I go to the store and buy a bunch of soda. I drink the soda. I get high off the caffeine. I draw some more. I send it to them. They pay me again. I go to the store and buy more soda. I drink the soda. I get high off the caffeine. I draw some more. I send it to them. They pay me again. What more is there to say?`,
        img: '/assets/meetTheArtist/2.jpg',
    },
    {
        title: `Q: What inspired your unique art style that has become so iconic to the betting community?`,
        text: `A: Mr Beast. I love his videos and the way he makes me feel. I want to be like him. Have you seen the video where he pays a woman $85,000,000 to poison her husband? It's so funny. He rocks.`,
        img: '/assets/meetTheArtist/3.jpg',
    },
    {
        title: `Q: Where do you feel art and gambling intersect?`,
        text: `A: I think that art and gambling are two sides of the same coin. Anyways - in the video the woman doesn't want to poison her husband at first but then Mr Beast says "Okay well if you don't then I'm going to give the money to someone else." And then she does it it's crazy. I showed the video to my girlfriend and I asked her if she would poison me for $85,000,000. She said "No way." I said "What if I gave you $85,000,001?" She said "Okay maybe." So we broke up for like 2 weeks but then I got her back. I think she was just mad that I didn't give her the money.`,
        img: '/assets/meetTheArtist/4.jpg',
    },
    {
        title: `Q: In 2013 you were arrested for assaulting a police officer. How did that affect your career?`,
        text: `A: I was in jail for 3 years. I learned a lot about myself and the world around me. I also learned how to make a shiv out of a toothbrush. I used that shiv to stab a guy in the neck. He was a good guy, but he died. Once I got out of jail I found something to keep me busy: gambling. It's been really good for me.`,
        img: '/assets/meetTheArtist/5.jpg',
    },
    {
        title: `Q: What is the solution to the rising threat of fascism in the world?`,
        text: `A: Gambling, probably. I may just be a simple ex-con artist, but I think that gambling is the answer to all of our problems. If we all just gambled a little bit more, we would be a lot happier. I mean, look at me. I'm a happy guy. I have a great job, a gorgeous girlfriend, and a lot of money. I owe it all to gambling. My only real problem is that I only sleep about 2 hours a night.`,
        img: '/assets/meetTheArtist/6.jpg',
    },
];

const story_nojoe = [
    {
        title: 'Q: How did you get into art?',
        text: `A: When I joined Big Bean Bettors there was no art on the site. I said to the people running the site - "Hey lets get some JPEGs in here." They said "No, we don't want any JPEGs." I said "What if I made the JPEGs?" They said "Okay, but only if you make them really good." I had never drawn before but it's actually really easy. So yeah, I started drawing and now I'm the best artist in the world. It was a great experience up until I lost my eye in a freak accident involving a can of soda and a sharpie. Now my life is a horrible. It was already pretty bad before, but now it's just unbearable.`,
        img: '/assets/meetTheArtist/nojoe/1.jpg',
    },
    {
        title: `Q: What's your art process like?`,
        text: `A: I haven't really been able to draw since I lost my eye. I mean, I can still draw, but I've been spending all my time trying to get my eye back. When it first fell out I was keeping it in a jar of soda, but then I lost the jar. I think my girlfriend threw it away. I hope no one found it and sold it on the black market or something.`,
        img: '/assets/meetTheArtist/nojoe/2.jpg',
    },
    {
        title: `Q: What inspired your unique art style that has become so iconic to the betting community?`,
        text: `A: Have you seen my eye? Please help me find it.`,
        img: '/assets/meetTheArtist/nojoe/3.jpg',
    },
    {
        title: `Q: Where do you feel art and gambling intersect?`,
        text: `A: I don't know. I'm not really thinking about art or gambling right now. I'm just trying to find my eye. I mean, I guess art and gambling are both about taking risks, but right now I'm just trying to get my eye back. It's been really hard without it. I can't even draw anymore. I just sit around all day and think about how much I miss my eye.`,
        img: '/assets/meetTheArtist/nojoe/4.jpg',
    },
    {
        title: `Q: In 2013 you were arrested for assaulting a police officer. How did that affect your career?`,
        text: `A: Maybe it's the reason God is punshing me. I used to think I was saved by the grace of God because I was circumsized as a teenager and a minister told me I was a good guy. But now I think maybe God is punishing me for my former crimes.`,
        img: '/assets/meetTheArtist/nojoe/5.jpg',
    },
    {
        title: `Q: What is the solution to the rising threat of fascism in the world?`,
        text: `A: I'll tell you what if you find my eye I'll solve the rising threat of fascism in the world. I'll do anything to get my eye back. If someone got a hold of it... it would be a disaster. I have an extremely twisted mind, and if someone was able to see what I see... it would be like living in hell. I wouldn't wish that on anyone - not even the police officer I assaulted.`,
        img: '/assets/meetTheArtist/nojoe/6.jpg',
    },
];

const storyToUse = computed(() => (hasEye.value ? story_nojoe : story));
</script>

<template>
    <img
        :src="`/assets/banners/artist${hasEye ? '_nojoe' : ''}.jpg`"
        alt="Joey Papernut"
        style="margin-bottom: 1em"
    />
    <div class="meetArtist">
        <p style="margin-bottom: 1em">
            Big Bean Bettors is famous for it's addictive gambling and betting
            for families. But what about the people behind the scenes? Meet Joey
            Papernut, the artist behind all the iconic art of Big Bean Bettors.
            In this exclusive interview, we sit down with Joey to learn more
            about his life, career, and what makes him tick.
        </p>
        <div
            class="block"
            v-for="(item, index) in storyToUse"
            :key="index"
            :class="{ right: index % 2 === 0 }"
        >
            <img :src="item.img" alt="Joey Papernut" />
            <div>
                <h1>{{ item.title }}</h1>
                <p>{{ item.text }}</p>
            </div>
        </div>
        <p>
            After our interview with Joey he went missing for 19 days, but he's
            now at home safe with his girlfriend. He says he was just "taking a
            break" and that he "didn't want to talk to anyone." We hope that
            Joey is doing well and that he continues to create amazing art for
            Big Bean Bettors. Thank you for reading this exclusive interview
            with Joey Papernut, the artist behind Big Bean Bettors. We hope you
            enjoyed it! Happy betting!
        </p>
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
