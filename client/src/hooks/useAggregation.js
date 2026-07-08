import { useEffect, useRef, useState } from 'react';

/**
 * Calls `fetchFn(params)` whenever the (shallow) contents of `params`
 * change, and exposes { data, loading, error }. Guards against race
 * conditions when filters change quickly in succession.
 */
export function useAggregation(fetchFn, params, initial = []) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    fetchFn(params)
      .then((res) => {
        if (id === requestId.current) setData(res);
      })
      .catch((err) => {
        if (id === requestId.current) setError(err?.response?.data?.message || 'Failed to load data');
      })
      .finally(() => {
        if (id === requestId.current) setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}
