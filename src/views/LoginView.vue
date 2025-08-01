<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { setInfo } from '@/composables/useLogin';
import PopUps from '@/components/PopUps.vue';

const api = import.meta.env.VITE_API;

const registerTab = ref(false);
const forgotPassword = ref(false);
const newUser = ref({
    name: '',
    password: '',
    inviteCode: '',
    eye: false,
    promoCode: '',
});
const loginCredentials = ref({ name: '', password: '' });
const loginError = ref<string | null>(null);

const registerUser = async () => {
    try {
        // Registering user with axios
        const response = await axios.post(
            `${api}/user/register`,
            newUser.value,
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response) setInfo(response.data.user, response.data.key);
    } catch (error: unknown) {
        loginError.value = axios.isAxiosError(error)
            ? error.response?.data?.message || 'Registration failed.'
            : error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
    }
};

const loginUser = async () => {
    try {
        const response = await axios.post(
            `${api}/user/login`,
            loginCredentials.value
        );
        if (response) setInfo(response.data.user, response.data.key);
    } catch (error: unknown) {
        loginError.value = axios.isAxiosError(error)
            ? error.response?.data?.message || 'Login failed.'
            : error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
    }
};

const swapTab = () => {
    registerTab.value = !registerTab.value;
    loginCredentials.value = { name: '', password: '' };
    newUser.value = {
        name: '',
        password: '',
        inviteCode: '',
        eye: false,
        promoCode: '',
    };
    loginError.value = null;
    forgotPassword.value = false;
};

const booleanToKey = (bool: boolean) => (bool ? 0 : 1);
</script>

<template>
    <div class="login">
        <PopUps class="popups" :key="booleanToKey(registerTab)" />
        <template v-if="registerTab">
            <h1>Become a big bean bettor</h1>
            <form @submit.prevent="registerUser">
                <input
                    v-model="newUser.name"
                    maxlength="15"
                    placeholder="Username"
                    required
                />
                <p>
                    NOTE: Due to a controversial new law promoting
                    family-friendly gambling, inappropriate language in
                    usernames is prohibited. Staff may change how your username
                    is displayed if it violates this rule.
                </p>
                <input
                    type="password"
                    v-model="newUser.password"
                    placeholder="Password"
                    required
                />
                <p>TIP: Use a password that's easy to remember like '123456'</p>
                <div class="eyeCheckbox">
                    <input type="checkbox" v-model="newUser.eye" /><label
                        @click="newUser.eye = !newUser.eye"
                        >Begin With Joey's Left Eye</label
                    >
                </div>
                <p v-if="newUser.eye">
                    WARNING: Joey's Left Eye is a cursed artifact that brings
                    all the art on the website to life resulting in a more
                    organic but more haunting experience. If the weight of
                    Joey's Left Eye for you becomes too heavy feel free to sell
                    it from your inventory.
                </p>
                <input
                    name="promoCode"
                    placeholder="Promo Code (optional)"
                    v-model="newUser.promoCode"
                    @input="newUser.promoCode = newUser.promoCode.toUpperCase()"
                />
                <p style="margin-top: 1em; margin-bottom: 0em">Invite Code:</p>
                <input
                    placeholder="----"
                    class="invite"
                    :class="{ full: newUser.inviteCode.length === 4 }"
                    v-model="newUser.inviteCode"
                    required
                    maxlength="4"
                    @input="
                        newUser.inviteCode = newUser.inviteCode.toUpperCase()
                    "
                />
                <button type="submit">REGISTER!! WIN BIG!</button>
            </form>

            <div v-if="loginError" class="error">
                <p>{{ loginError }}</p>
            </div>
        </template>

        <template v-else>
            <h1>RESUME Your Betting Journey</h1>
            <form @submit.prevent="loginUser">
                <input
                    v-model="loginCredentials.name"
                    placeholder="Name"
                    required
                />
                <input
                    type="password"
                    v-model="loginCredentials.password"
                    placeholder="Password"
                    required
                />
                <button type="submit">LOGIN TO WIN!</button>
                <div
                    class="forgot"
                    v-if="!forgotPassword"
                    @click="forgotPassword = true"
                >
                    Forgot Password?
                </div>
                <div class="tooBad" v-else>TOO BAD STUPID!</div>
            </form>

            <div v-if="loginError" class="error">
                <p>{{ loginError }}</p>
            </div>
        </template>
        <div class="swap" @click="swapTab">
            {{
                registerTab
                    ? 'Log in to an Existing Account'
                    : 'Create a New Account'
            }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: inherit;
    width: fit-content;
    margin: 0 auto;
    width: 400px;
    max-width: 100%;
    flex: 1;
    .popups {
        margin: 1em 0;
    }
    p {
        font-size: 0.8em;
        text-align: left;
        margin-bottom: 1em;
    }
    img {
        width: 90%;
        max-width: 100%;
        aspect-ratio: 1;
        margin-bottom: 1em;
        border-radius: 10px;
    }
    input {
        display: block;
        &.invite {
            margin: 0 0 1rem 0;
            outline: none;
            background-color: transparent;
            border: 0;
            padding: 0;
            padding-left: 7px;
            --fontSize: 50px;
            --spacingSize: 40px;
            letter-spacing: 32px;

            color: var(--themeColor);
            font-size: var(--fontSize);
            font-family: monospace;
            background-image: linear-gradient(
                to right,
                var(--themeColor) calc(var(--spacingSize) * 0),
                var(--themeColor) calc(var(--spacingSize) * 1),
                transparent calc(var(--spacingSize) * 1),
                transparent calc(var(--spacingSize) * 1.5),
                var(--themeColor) calc(var(--spacingSize) * 1.5),
                var(--themeColor) calc(var(--spacingSize) * 2.5),
                transparent calc(var(--spacingSize) * 2.5),
                transparent calc(var(--spacingSize) * 3),
                var(--themeColor) calc(var(--spacingSize) * 3),
                var(--themeColor) calc(var(--spacingSize) * 4),
                transparent calc(var(--spacingSize) * 4),
                transparent calc(var(--spacingSize) * 4.5),
                var(--themeColor) calc(var(--spacingSize) * 4.5),
                var(--themeColor) calc(var(--spacingSize) * 5.5),
                transparent calc(var(--spacingSize) * 5.5)
            );
            background-position: bottom left;
            background-size: calc(var(--fontSize) * 6) 1px;
            background-repeat: no-repeat;
            background-position-x: 0;
            &.full{
                caret-color: transparent;
            }
        }
    }
    .forgot {
        font-size: 0.75em;
        text-align: center;
        margin: 0.5em 0 0.75em;
        cursor: pointer;
    }
    .tooBad {
        @extend .forgot;
        pointer-events: none;
        animation: fadeOut 1s forwards;
        animation-delay: 2000ms;
    }
    form {
        width: 100%;
        input,
        button {
            margin-bottom: 0.5em;
            width: 100%;
            box-sizing: border-box;
        }
        button {
            outline: 0;
            border: 0;
            padding: 0.5em;
            background-color: var(--themeColor);
            cursor: pointer;
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
    .swap {
        cursor: pointer;
        color: var(--themeColor);
        user-select: none;
    }
    .eyeCheckbox {
        margin-bottom: 0.75em;
        display: flex;
        & * {
            cursor: pointer;
            display: inline-block;
        }
        input {
            width: fit-content;
            margin: 0;
            margin-right: 0.5em;
        }
        label {
            font-size: 0.9em;
        }
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@media (max-width: 700px) {
    .login p {
        font-size: 0.7em;
    }
}
</style>
