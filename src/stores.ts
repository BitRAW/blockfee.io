import {writable} from 'svelte/store';
import type {BlockInfo} from './objects/BlockInfo';

const blockCache = writable<Array<BlockInfo>>([]);

const highest75percVal = writable(0);

export {blockCache, highest75percVal};
