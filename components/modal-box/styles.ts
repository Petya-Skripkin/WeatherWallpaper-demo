import styled from "styled-components/native";

export const ModalContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #02021b55;
`;

export const Content = styled.View`
  width: 250px;
  height: auto;
  border-radius: 16px;
  background-color: #02021b;
  align-items: center;
`

export const CloseBtn = styled.Pressable`
  width: 100%;
  height: 50px;
  margin-top: auto;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`

export const CloseText = styled.Text`
  color: white;
`

export const CloseIcon = styled.Text`
  font-size: 24px;
  color: white;
`
