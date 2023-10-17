import styled from "styled-components/native";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { FlatList } from "react-native";

export const Recipie = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
  width: 95%;
  align-self: center;
`;

export const RecipieCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const RecipieCardTitle = styled(Text)`
  paddingRight: ${(props) => props.theme.space[3]};
  paddingLeft: ${(props) => props.theme.space[3]};
  paddingTop: ${(props) => props.theme.space[3]};
  font-size:  ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const RecipieList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;