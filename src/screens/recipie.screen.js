import React from "react";
import styled from "styled-components";
import {
  SafeAreaView,
  View,
  StatusBar
} from "react-native";
import { Searchbar } from "react-native-paper";
import { RecipieCard } from "../components/recipie/recipie-card.component";
import { RecipieList } from "../components/recipie/recipie-card.styles";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const recipies = [
  {
    id: 1,
    name: "Cajun Pasta",
    photos: [
      "https://thecozyapron.com/wp-content/uploads/2018/07/cajun-shrimp-pasta_thecozyapron_1.jpg",
    ],
  },
  {
    id: 2,
    name: "Beef Lasagna",
    photos: [
      "https://wondermomwannabe.com/wp-content/uploads/2021/04/Classic-Lasagna-with-Ground-Beef-4-scaled.jpg"
    ],
  },
  {
    id: 3,
    name: "Fried Rice",
    photos: [
      "https://christieathome.com/wp-content/uploads/2021/07/Egg-Fried-Rice-5.jpg"
    ],
  },
];

export const RecipieScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar placeholder="Search" />
    </SearchContainer>
    <RecipieList 
      data={recipies}
      renderItem={(recipie) => (
          <RecipieCard recipie={recipie} />
      )}
      keyExtractor={(recipie) => recipie.id}
    />
  </SafeArea>
);
