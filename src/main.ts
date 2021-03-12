import App from './App.svelte';

declare let process: any;

const app = new App({
	target: document.body,
	props: {
	}
});

if (process.env.isProd && 'serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
}

export default app;