<script lang="ts">
  import Lottie from 'lottie-web';

  import {onMount} from 'svelte';

  import Router from 'svelte-spa-router';
  import {wrap} from 'svelte-spa-router/wrap';
  import {fetchBlocks} from './API/BitrawAPI';
  import Footer from './main-comp/Footer.svelte';
  import Header from './main-comp/Header.svelte';
  import Index from './pages/Index.svelte';
  import NotFound from './pages/NotFound.svelte';
  import {BlockInfo} from './objects/BlockInfo';
  import Alerts from './pages/helper-comp/Alerts.svelte';
  import {blockCache, defaultTimeframe, highest75percVal} from './stores';
  import {MessageType} from './objects/Message';
  import type {Message} from './objects/Message';
  import {subscribe} from './API/WebSocketAPI';

  const routes = {
    '/': Index,
    '/block/:id?': wrap({
      asyncComponent: () => import('./pages/Block.svelte'),
    }),
    '/feematrix': wrap({
      asyncComponent: () => import('./pages/FeeMatrix.svelte'),
    }),
    '*': NotFound,
  };

  async function fetchBlockData() {
    const data = await fetchBlocks(4);

    blockCache.update((cache) => ({
      ...cache,
      [defaultTimeframe]: data.map((datapoint) => new BlockInfo(datapoint)),
    }));

    $blockCache[defaultTimeframe].forEach((item) => {
      $highest75percVal =
        $highest75percVal < item.perc_75 ? item.perc_75 : $highest75percVal;
    });
  }

  const onNewBlock = (msg: Message) => {
    if (msg.type === MessageType.new_block) {
      blockCache.update((cache) => {
        return Object.keys(cache).reduce((acc, timeframe) => {
          acc[timeframe] = [new BlockInfo(msg.payload), ...acc[timeframe]];
          return acc;
        }, {});
      });
    }
  };

  onMount(() => {
    fetchBlockData();
    subscribe(onNewBlock, MessageType.new_block);
    Lottie.loadAnimation({
      container: document.getElementById('bitraw-loading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../img/bitraw-glare.json',
    });
  });
</script>
<div class="">
  <Header />
  <div class="pt-24 flex bg-gray-800 pb-14">
    {#if $blockCache[defaultTimeframe]}
      <Router {routes} />
    {:else}
      <div class="z-5 w-full opacity-30 flex items-center justify-center">
        <div class="w-24 h-24" id="bitraw-loading" />
      </div>
    {/if}
  </div>
  <Footer />
  <Alerts />
</div>
