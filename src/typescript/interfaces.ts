// These are interfaces used throughout the I Support Jolla Typescript code

var twttr: any; // DefinitelyTyped definition for Twitter is currently outdated (we'll work on it and contribute upstream). Until then, set as any.

interface ConfigOptions extends Object {
	Languages: string;
}