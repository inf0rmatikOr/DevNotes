declare interface Window {
  api: {
    fetch(url: string, opts) : Promise<Response>;
  };
}