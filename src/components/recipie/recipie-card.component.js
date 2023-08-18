import React from "react";
import { Text } from "react-native";

import { Info, Recipie, RecipieCardCover, RecipieCardTitle } from "./recipie-card.styles";

export const RecipieCard = ({ recipie = {} }) => {
  const {
    name = "Cajun Pasta",
    photos = [
      "https://thecozyapron.com/wp-content/uploads/2018/07/cajun-shrimp-pasta_thecozyapron_1.jpg",
    ],
  } = recipie;

  return (
    <Recipie>
      <RecipieCardTitle>{name}</RecipieCardTitle>
      <RecipieCardCover source={{ uri: photos[0] }}></RecipieCardCover>
      <Info>
        <Text>Recipie Info</Text>
      </Info>
    </Recipie>
  );
};
