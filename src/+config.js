import vikeVue from "vike-vue/config";
import vikePinia from "vike-pinia";
import FontLink from "./FontLink.vue";

export default {
    title: "Font Displayer",
    extends: [vikeVue, vikePinia],
    Head: FontLink,
};
