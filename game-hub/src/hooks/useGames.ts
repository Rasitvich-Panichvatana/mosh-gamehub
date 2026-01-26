import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  platform: string;
  genre: string;
}

interface Props {
  selectedPlatforms?: string[];
  selectedGenres?: string[];
  searchText?: string;
  page?: number;
  sort?: string;
}

const useGames = ({
  selectedPlatforms = [],
  selectedGenres = [],
  searchText,
  page = 1,
  sort,
}: Props) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    // Fix flashy when change page
    setGames([]);

    // Keys must be string and Value can be any (in this case we have string[])
    // Can use type/interface object instead but i want to learn about Record
    // if use type/interface object instead we can manual eg. platform? = string[]; ...
    const params: Record<string, any> = {};
    if (selectedPlatforms.length > 0) params.platform = selectedPlatforms;
    if (selectedGenres.length > 0) params.genre = selectedGenres;
    if (searchText) params.search = searchText;
    if (sort) params.sort = sort;
    params.page = String(page);

    apiClient
      .get("/games", {
        params,
        signal: controller.signal,
        paramsSerializer: {
          indexes: null, // remove [] from request like platform[] -> platform
        },
      })
      .then((res) => {
        setGames(res.data.results);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); // Abort request to prevent race condition
  }, [
    searchText,
    page,
    sort,
    JSON.stringify(selectedPlatforms), // JSON.stringify to turn object to string
    JSON.stringify(selectedGenres),
  ]);

  // !!Debug remove later na!!
  console.log(selectedGenres);
  console.log(selectedPlatforms);

  return { games, error, isLoading, totalPages, total };
};

export default useGames;
