<script>
import {fetchBlock} from '../API/BitrawAPI';
import {BlockInfo} from '../objects/BlockInfo';

import BlockBig from './comp/BlockBig.svelte';
import Loader from './helper-comp/Loader.svelte';

export let params = {};

const block = fetchBlock(params.id);

</script>

<div class="w-full h-full m-4 flex-col flex items-center">
{#await block}
  <Loader></Loader>
  {:then block}
  <BlockBig block={new BlockInfo(block)}></BlockBig>
  <a href="#/" class="mt-4 bg-cyan-500 rounded-md transition-all hover:bg-cyan-600 focus:bg-cyan-700 py-2 px-4 font-bold">Back to Charts</a>
  {/await}
</div>  
