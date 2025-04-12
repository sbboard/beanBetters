import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user: Ref<User | null> = ref(null);
    const showLogin: Ref<boolean> = ref(false);
    const key: Ref<string | null> = ref(null);

    function resetUser() {
        showLogin.value = true;
        user.value = null;
        key.value = null;
    }

    function checkItem(item: string) {
        if (!user.value) return false;
        return user.value.inventory?.some(invItem => invItem.name === item);
    }

    return { user, showLogin, key, resetUser, checkItem };
});
