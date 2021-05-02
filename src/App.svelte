<script lang="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { writable } from "svelte/store";
  import { fetchData, fetchBlocks } from "./API/BitrawAPI";
  import Index from "./Index.svelte";
  import Footer from "./main-comp/Footer.svelte";
  import Header from "./main-comp/Header.svelte";
  import NotFound from "./NotFound.svelte";
  import { blockCache } from "./stores";

  const routes = {
    "/": Index,
    "/block/:id?": wrap({
      asyncComponent: () => import("./pages/Block.svelte"),
    }),
    "*": NotFound,
  };
  // fetchBlockData();
  async function fetchBlockData() {
    let data = await fetchBlocks(1500);
    console.log(data);
    $blockCache = data.dataset;
  }
</script>

<div class="">
  <Header />
  <div class="pt-24 flex bg-gray-800 pb-14">
    <Router {routes} />
  </div>
  <Footer />
</div>
