declare interface Window {
  api: {
    fetch(url: string, opts): {
      status: string;
      statusText: string;
      headers: Record<string, string>;
      data: string;
    };
  };
}