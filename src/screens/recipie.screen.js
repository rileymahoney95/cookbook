import React from "react";
import styled from "styled-components";
import {
  SafeAreaView,
  View,
  StatusBar,
  ScrollView
} from "react-native";
import { Searchbar } from "react-native-paper";
import { RecipieCard } from "../components/recipie/recipie-card.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const RecipieListContainer = styled(ScrollView)`
  flex: 1;
  justify-conent: space-between;
  padding: ${(props) => props.theme.space[3]};
`;

const RecipieCardContainer = styled(View)`
  flexdirection: column;
  justifycontent: space-between;
  alignitems: stretch;
  paddingBottom: ${(props) => props.theme.space[4]};
`;

const recipies = [
  {
    name: "Cajun Pasta",
    photos: [
      "https://thecozyapron.com/wp-content/uploads/2018/07/cajun-shrimp-pasta_thecozyapron_1.jpg",
    ],
  },
  {
    name: "Beef Lasagna",
    photos: [
      "https://wondermomwannabe.com/wp-content/uploads/2021/04/Classic-Lasagna-with-Ground-Beef-4-scaled.jpg"
    ],
  },
  {
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
    <RecipieListContainer bounces={true}>
      {recipies &&
        recipies.map((recipie) => (
          <RecipieCardContainer>
            <RecipieCard recipie={recipie}/>
          </RecipieCardContainer>
        ))}
    </RecipieListContainer>
  </SafeArea>
);
