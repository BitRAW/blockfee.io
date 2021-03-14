<script lang="ts">
  import "../node_modules/chartist/dist/chartist.min.css";
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import Index from "./Index.svelte";
  import Footer from "./main-comp/Footer.svelte";
  import Header from "./main-comp/Header.svelte";
  import NotFound from "./NotFound.svelte";

  const routes = {
    "/": Index,
    "/tv": wrap({
      asyncComponent: () => import("./pages/TV.svelte"),
    }),
    "/settings": wrap({
      asyncComponent: () => import("./pages/Settings.svelte"),
    }),
    "*": NotFound,
  };

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
</script>

<div class="">
  <Header />
  <div class="pt-24 flex bg-gray-800 pb-14">
    <Router {routes} />
  </div>
  <Footer />
</div>
