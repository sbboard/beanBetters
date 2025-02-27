<script setup lang="ts">
import CharacterPortraits from '@/components/CharacterPortraits.vue';
import { addCommas, MIN_DEBT } from '@/composables/useEconomy';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, ref } from 'vue';
const userStore = useUserStore();

const isEligable = computed(() => {
    return (
        (userStore.user?.beans || 0) < MIN_DEBT &&
        !userStore.user?.inventory?.length
    );
});

const amnt = ref(MIN_DEBT);

const isValid = computed(() => {
    return amnt.value >= MIN_DEBT && amnt.value <= 50000000;
});

const api = 'https://www.gang-fight.com/api/beans';
const applyForLoan = async () => {
    if (!confirm('Are you sure you want to apply for a loan?')) return;
    try {
        const data = {
            userId: userStore.user?._id,
            amount: amnt.value,
        };

        const response = await axios.post(`${api}/store/debt`, data);
        userStore.user = response.data.user;
    } catch (error) {
        console.error('Error applying for loan:', error);
    }
};
</script>

<template>
    <div class="loans">
        <div>
            <div class="left">
                <CharacterPortraits character="crime" />
            </div>
            <div>
                <h1>Loan Eligibility</h1>
                <ol>
                    <li>Bettor must have less than 500k beans in bean bag</li>
                    <li>Bettor must have no assets in inventory</li>
                </ol>
                <h1>Loan Terms & Services</h1>
                <p>
                    By engaging in any transaction, activity, or interaction
                    with the Bean Exchange (hereinafter referred to as "the
                    Exchange"), you, the user (hereinafter referred to as "the
                    Participant"), acknowledge, understand, and agree to abide
                    by all terms, conditions, clauses, and stipulations set
                    forth herein. The Participant further acknowledges that
                    participation in the Exchange is subject to specific
                    financial regulations, restrictions, and obligations,
                    including, but not limited to, those pertaining to
                    outstanding financial liabilities and the accrual of
                    interest on unsettled debts.
                </p>

                <p>
                    The Participant expressly agrees that, in the event that
                    they maintain an outstanding negative balance, obligation,
                    or debt (hereinafter referred to as "Debt") to the Exchange,
                    they shall be strictly prohibited from initiating,
                    attempting, executing, or otherwise completing any form of
                    purchase, acquisition, or procurement of goods, services,
                    digital assets, or any other items (hereinafter referred to
                    as "Items") through the Exchange. The Exchange, at its sole
                    discretion, shall determine whether the Participant
                    maintains an outstanding Debt, and such determination shall
                    be considered final, binding, and non-negotiable. Debt is
                    hereby defined as any negative balance, financial
                    obligation, penalty, charge, or other monetary liability
                    that remains unpaid by the Participant. This restriction
                    shall persist until such time that the total outstanding
                    Debt, including any and all applicable interest, has been
                    fully repaid, settled, or otherwise resolved in accordance
                    with the repayment procedures established by the Exchange.
                </p>

                <p>
                    The Participant further acknowledges and agrees that any
                    outstanding Debt shall be subject to an interest rate of
                    twenty percent (20%) per applicable period, the duration and
                    frequency of which shall be determined at the sole
                    discretion of the Exchange. Interest shall be calculated
                    based on the total outstanding Debt and shall be compounded
                    at regular intervals as dictated by the Exchange’s internal
                    financial policies. Interest shall continue to accrue on any
                    unpaid Debt until such time that the Debt, inclusive of all
                    accumulated interest, has been fully repaid. The Exchange
                    reserves the right to modify, adjust, or amend the rate,
                    method, or frequency of interest accrual at any time, with
                    or without prior notice to the Participant, and the
                    Participant agrees that such modifications shall take effect
                    immediately upon implementation.
                </p>

                <p>
                    The Participant is solely and entirely responsible for
                    ensuring the timely repayment of any outstanding Debt,
                    including accrued interest, in accordance with the repayment
                    mechanisms made available by the Exchange. Failure to remit
                    full payment in a timely manner may result in additional
                    penalties, fees, or restrictions on the Participant’s
                    ability to engage in transactions within the Exchange. The
                    Exchange retains the right to employ any means necessary,
                    within legally permissible boundaries, to recover
                    outstanding Debt from the Participant, including, but not
                    limited to, restricting access to services, withholding
                    funds, or pursuing alternative collection measures.
                </p>

                <p>
                    These Terms and Services constitute the full and complete
                    agreement between the Participant and the Exchange with
                    regard to the matters outlined herein. The Exchange reserves
                    the right to modify, amend, revise, or update these Terms
                    and Services at any time, with or without prior notice. The
                    Participant agrees to review these Terms and Services
                    periodically in order to remain informed of any changes,
                    modifications, or updates that may affect their rights and
                    obligations. Continued use of the Exchange following any
                    modifications shall constitute acceptance of said
                    modifications. The Participant understands and agrees that
                    failure to comply with these Terms and Services may result
                    in the immediate restriction, limitation, or termination of
                    their ability to participate in the Exchange, as determined
                    at the sole discretion of the Exchange.
                </p>
            </div>
        </div>
        <div class="apply" v-if="(userStore.user?.debt || 0) === 0">
            <h1>Apply For Loan</h1>
            <div v-if="!isEligable">
                You are ineligable for a personal loan.
            </div>
            <template v-else>
                <div>
                    You are pre-approved for a personal loan between
                    {{ addCommas(MIN_DEBT) }} and
                    {{ addCommas(50000000) }} beans.
                </div>
                <div class="debtBar">
                    <input
                        type="number"
                        :min="MIN_DEBT"
                        max="50000000"
                        v-model="amnt"
                    /><button @click="applyForLoan()" :disabled="!isValid">
                        APPLY
                    </button>
                </div>
                <p class="helper">Comma Helper: {{ addCommas(amnt) }} BEANS</p>
            </template>
        </div>
        <div class="apply" v-else>
            <h1>Pay Off Loan</h1>
            <div class="info">
                <span>CURRENT DEBT:</span>
                {{ addCommas(userStore.user?.debt || 0) }} beans
            </div>
            <div class="debtBar">
                <input type="number" value="0" /><button>PAY</button>
            </div>
            <p class="helper">Comma Helper: {{ addCommas(amnt) }} BEANS</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loans {
    span {
        display: inline;
    }
    .debtBar {
        margin-top: 1rem;
        flex-direction: row;
        align-items: center;
        & > * {
            display: inline-block;
            font-size: 1.5rem;
            border: 0;
            outline: 0;
        }
        input {
            flex: 1;
            margin-right: 0.5em;
            padding-left: 0.5em;
        }
        button {
            background-color: var(--themeColor);
            font-size: 1.25rem;
            padding: 0.25rem 1rem;
            cursor: pointer;
            &:disabled {
                opacity: 0.5;
            }
        }
    }
    & > img {
        max-width: 100%;
    }
    & > div {
        display: flex;
        justify-content: space-between;
        & > div {
            max-width: 50vmin;
            display: inline-flex;
            flex-direction: column;
            vertical-align: text-top;
            align-items: flex-start;
            border-radius: 10px;
            width: 700px;
            text-align: left;
            ol {
                list-style: upper-roman;
                margin-bottom: 1rem;
            }
            p {
                text-align: left;
                font-size: 0.45em;
            }
        }
        .left {
            position: relative;
            margin-right: 10px;
        }
    }
    .apply {
        margin-top: 1em;
        flex-direction: column;
        align-items: baseline;
        div {
            max-width: none;
            width: 100%;
        }
        .info {
            display: block;
            font-size: 1.25em;
            span {
                color: var(--themeColor);
            }
        }
    }
}

.helper {
    font-size: 0.9em;
}

@media (max-width: 700px) {
    .home > div {
        flex-direction: column;
        align-items: center;
        & div {
            width: 500px;
            max-width: 100%;
            &.left {
                width: 250px;
                max-width: 100%;
                margin-bottom: 1em;
            }
        }
    }
}
</style>
