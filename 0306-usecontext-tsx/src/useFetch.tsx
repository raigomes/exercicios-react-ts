import React from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(
  url: RequestInfo | URL,
  options?: RequestInit | undefined,
): FetchState<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setData(null);

      try {
        const response = await fetch(url, {
          signal,
          ...options,
        });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const data = await response.json();
        if (!signal.aborted) setData(data);
      } catch (e) {
        if (!signal.aborted && e instanceof Error) setError(e.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  return { data, loading, error };
}

export default useFetch;
