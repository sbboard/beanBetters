import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user: Ref<User | null> = ref(null);
    const showLogin: Ref<boolean> = ref(false);

    function resetUser() {
        showLogin.value = true;
        user.value = null;
    }

    function updateBeanCount(count: number) {
        if (!user.value) return;
        user.value.beans = count;
    }

    return { user, showLogin, resetUser, updateBeanCount };
});
