import {
  CloseBtn,
  CloseIcon,
  CloseText,
  Content,
  ModalContainer,
} from "./styles";
import { Modal } from "react-native";

interface IModal {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  children: React.ReactNode;
  hasCloseBtn?: boolean;
}

export function ModalBox({
  modalVisible,
  setModalVisible,
  children,
  hasCloseBtn = true,
}: IModal) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log("inThis");
        setModalVisible(false);
      }}
    >
      <ModalContainer>
        <Content>
          {children}
          {hasCloseBtn && (
            <CloseBtn onPress={() => setModalVisible(false)}>
              <CloseText>Close</CloseText>
              <CloseIcon>&times;</CloseIcon>
            </CloseBtn>
          )}
        </Content>
      </ModalContainer>
    </Modal>
  );
}
