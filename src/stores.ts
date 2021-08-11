import {writable} from 'svelte/store';
import type {BlockInfo} from './objects/BlockInfo';

type BlockCache = { [key: string]: Array<BlockInfo> };

export const defaultTimeframe = '4h';

const blockCache = writable<BlockCache>({});

const highest75percVal = writable(0);

export {blockCache, highest75percVal};
