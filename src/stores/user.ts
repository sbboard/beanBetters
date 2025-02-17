import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const userId: Ref<string | null> = ref(null);
    const username: Ref<string | null> = ref(null);
    const isLoggedIn = computed(() => !!userId.value && !!username.value);

    return { userId, username, isLoggedIn };
});
