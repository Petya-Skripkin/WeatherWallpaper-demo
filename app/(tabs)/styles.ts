import styled, { css } from "styled-components/native";

export const BackgroundScrollView = styled.ScrollView`
  background-color: #1f1f1f;
`

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: "space-between";
  align-items: "center";
`;

export const Content = styled.Pressable`
  width: 50%;
  flex-direction: "column";
  justify-content: "space-between";
  border: 1px solid #1f1f1f;
`

export const CartHead = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: 8px;
  padding-bottom: 4px;
  background-color: #1f1f1fa5;
`;

export const Author = styled.Text`
  width: 100%;
  text-align: right;
  color: #f0f0f0;
`;

export const WallpaperSetBtn = styled.Pressable<{ isFirst?: boolean }>`
  width: 100%;
  height: 50px;
  justify-content: center;
  background-color: #13432e;
  margin-bottom: 5px;

  ${({isFirst}) => isFirst && css`
    border-radius: 16px 16px 0 0;
  `}
`

export const WallpaperSetBtnText = styled.Text`
  color: white;
  text-align: center;
`

export const WallpaperSetErrBtn = styled.Pressable<{ isFirst?: boolean }>`
  width: 100%;
  height: 50px;
  justify-content: center;
  background-color: #ac0908;
  margin-bottom: 5px;

  ${({isFirst}) => isFirst && css`
    border-radius: 16px 16px 0 0;
  `}
`

export const WallpaperSetErrBtnText = styled.Text`
  color: #f7d715;
  text-align: center;
`
