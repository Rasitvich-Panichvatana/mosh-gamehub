import React from "react";
import { Game } from "../hooks/useGames";
import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <Image src={game.thumbnail} />
      <CardBody>
        <Heading fontSize="2xl">{game.title}</Heading>
        <PlatformIconList platforms={game.platform} />
      </CardBody>
    </Card>
  );
};

export default GameCard;
