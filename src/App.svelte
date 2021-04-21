<script lang="ts">
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
    "/block/:id?": wrap({
      asyncComponent: () => import("./pages/Block.svelte"),
    }),
    "*": NotFound,
  };
</script>

<div class="">
  <Header />
  <div class="pt-24 flex bg-gray-800 pb-14">
    <Router {routes} />
  </div>
  <Footer />
</div>
