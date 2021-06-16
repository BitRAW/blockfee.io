<script>
  import { location } from "svelte-spa-router";
</script>

<div
  class="z-50 fixed top-0 items-center bg-gray-900 w-full h-20 left-0 shadow-2xl flex justify-between flex-grow"
>
  <div class="flex space-x-5">
    <div class="cursor-pointer">
      <a href="/#/"><img class="h-10 w-24" src="../logo-icon.svg" alt="" /></a>
    </div>
    <div>
      <ul class="flex space-x-5">
        <li class="h-10 w-10">
          <a href="#/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class:text-cyan-500={$location === "/"}
              class=" hover:text-gray-400 stroke-current cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </a>
        </li>
        <li class="h-10 w-10">
          <a href="#/block/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class:text-cyan-500={$location.includes("/block")}
              class="hover:text-gray-400 stroke-current cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="h-full w-20 flex justify-end items-center bg-cyan-500 rounded-l-full pr-3 bg-opacity-10 transition hover:bg-opacity-100">
  <a class='w-full h-full flex justify-end items-center' target="_blank" rel="noopener noreferrer" href="https://github.com/bitRAW/blockfee.io">
        <svg
          viewBox="0 0 16 16"
          class:text-cyan-500={$location === "/settings"}
          class="octicon octicon-mark-github v-align-middle hover:text-gray-400 cursor-pointer h-10 w-10"
          version="1.1"
          aria-hidden="true"
          ><path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          /></svg
        >
      </a>
      </div>
    </div>
