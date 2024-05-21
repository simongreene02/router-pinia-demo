/* eslint-disable no-unused-vars */
// https://vike.dev/guard
export { guard };

import { redirect } from "vike/abort";

async function guard(pageContext) {
    // console.log(pageContext);
    // console.log(pageContext.authInfo);
    // if (!pageContext.authInfo.isAuthenticated()) {
    //     console.log("Failed");
    //     throw redirect("/login");
    // } else {
    //     console.log("Passed");
    // }
}
