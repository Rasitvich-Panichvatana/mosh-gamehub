import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { withDefaultColorScheme } from "@chakra-ui/react";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  platform: string;
  genre: string;
}

interface Props {
  selectedPlatform: string | null;
}

const useGames = ({ selectedPlatform }: Props) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    let platform = "";
    let tags = "";
    let sort = "";
    let url = "/games";

    console.log(selectedPlatform);

    if (selectedPlatform) {
      platform = "?platform=" + selectedPlatform;
    }

    apiClient
      .get<Game[]>(url + tags + platform + sort, { signal: controller.signal })
      .then((res) => {
        setGames(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
