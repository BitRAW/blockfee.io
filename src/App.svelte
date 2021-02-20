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
</script>

<div class="h-full">
  <Header />
  <div class="pt-24 flex min-h-full bg-gray-800 pb-14">
    <Router {routes} />
  </div>
  <Footer />
</div>
