import App from './App.svelte';

declare let process: any;

const app = new App({
	target: document.body,
	props: {
	}
});

if (process.env.isProd && 'serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(
		function (registration) {
			// Registration was successful
			console.log(
				"ServiceWorker registration successful with scope: ",
				registration.scope
			);
		},
		function (err) {
			// registration failed :(
			console.log("ServiceWorker registration failed: ", err);
		}
	);
}

export default app;