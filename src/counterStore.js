import { defineStore } from "pinia";
import { ref } from "vue";

export const makeCounter = defineStore("counter", () => {
    const counterNum = ref(0);
    // eslint-disable-next-line no-unused-vars
    function increment() {
        counterNum.value++;
    }
    // eslint-disable-next-line no-unused-vars
    function decrement() {
        counterNum.value--;
    }

    return { counterNum, increment, decrement };
});
