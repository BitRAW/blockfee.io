<script>
  import { dict, locale, t } from "svelte-i18n-light";
  import translations from "../translations";

  $: languages = Object.keys(translations);
  $: dict.set(translations);

  if ($locale === undefined) {
    $locale = "en";
  }

  let show = false;
  function selectLang(e) {
    let langElem = e.target;
    $locale = langElem.innerHTML;
    handleMenuOpen();
  }
  function handleMenuOpen() {
    show = !show;
  }
</script>

<div class="h-full w-full flex justify-center">
  <div class="lg:w-1/2 w-full flex flex-col gap-2">
    <div>
      <p class="font-bold text-lg">
        {$t("settings")}
      </p>
    </div>
    <div class="w-full h-1 border-t-2 border-gray-600" />
    <div class="flex justify-between items-center">
      <div><p>{$t("language")}</p></div>
      <div class="relative inline-block text-left">
        <div>
          <button
            on:click={handleMenuOpen}
            on:blur={() => {
              setTimeout(() => {
                show = false;
              }, 150);
            }}
            type="button"
            class="inline-flex justify-center w-full bg-gray-200 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {$locale}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          class:hidden={!show}
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 bg-gray-200"
        >
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {#each languages as lang}
              <div
                on:click={selectLang}
                class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                class:font-bold={$locale === lang}
              >
                {lang}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-1 border-t-2 border-gray-600" />
  </div>
</div>
