// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

declare global {
  interface ExtendableEvent extends Event {
    waitUntil(fn: Promise<unknown>): void;
  }

  interface FetchEvent extends Event {
    readonly request: Request;
    respondWith(response: Promise<Response> | Response): Promise<Response>;
  }

  interface ServiceWorkerGlobalScope {
    __WB_MANIFEST: string[];
    skipWaiting(): Promise<void>;
    addEventListener(
      type: 'install',
      listener: (event: ExtendableEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: 'fetch',
      listener: (event: FetchEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: 'message',
      listener: (event: MessageEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
  }

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
