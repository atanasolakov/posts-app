import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl: string) => {
  const [data, setData] = useState<any[]>([]);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
        const ids = response.data.map((post: any) => post.userId);
        const uniqueIds = ids.filter(
          (id: never, index: Number, array: []) => array.indexOf(id) === index
        );
          setUserIds(uniqueIds);
          setFetchError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
          setUserIds([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, userIds, fetchError, isLoading };
};

export default useAxiosFetch;

