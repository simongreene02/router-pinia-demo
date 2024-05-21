<script setup>
import LinkButton from "./LinkButton.vue";
// import moduleAuth0 from "@auth0/auth0-vue";
import { ref } from "vue";
import { makeCounter } from "./counterStore";
import { storeToRefs } from "pinia";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    identifier: String,
    styleName: String,
    sourceUrl: String,
});

const pageData = [
    { name: "Danfo", location: "/danfo" },
    { name: "Jersey 25 Charted", location: "/jersey-25-charted" },
    { name: "Open Sans", location: "/open-sans" },
    { name: "Oswald", location: "/oswald" },
    { name: "Playfair Display", location: "/playfair-display" },
    { name: "Poetsen One", location: "/poetsen-one" },
    { name: "Raleway", location: "/raleway" },
];

// const { useAuth0 } = moduleAuth0;
// const auth0 = useAuth0();

// function logout() {
//     auth0.logout({ logoutParams: { returnTo: window.location.origin } });
// }

const drawer = ref(false);

const counter = makeCounter();
const { counterNum } = storeToRefs(counter);
</script>

<template>
    <v-app>
        <v-layout>
            <v-app-bar>
                <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                ></v-app-bar-nav-icon>
                <v-app-bar-title>Font Viewer</v-app-bar-title>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer">
                <LinkButton
                    v-for="page in pageData"
                    :parent-identifier="identifier"
                    :key="page"
                    :name="page.name"
                    :location="page.location"
                />
            </v-navigation-drawer>
            <v-main>
                <v-container>
                    <h1 :class="'text-h1 ' + styleName">{{ identifier }}</h1>
                    <h2 :class="'text-h2 ' + styleName">Number:</h2>
                    <v-row>
                        <v-col cols="1"
                            ><v-btn
                                variant="outlined"
                                @click="counter.decrement"
                                :class="styleName"
                                >-</v-btn
                            ></v-col
                        >
                        <v-col cols="1" align="center"
                            ><span :class="'text-h5 ' + styleName">{{
                                counterNum
                            }}</span></v-col
                        >
                        <v-col cols="1"
                            ><v-btn
                                variant="outlined"
                                @click="counter.increment"
                                :class="styleName"
                                >+</v-btn
                            ></v-col
                        >
                        <v-spacer />
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
