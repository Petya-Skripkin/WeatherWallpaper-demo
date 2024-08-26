import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import { useContext, useEffect, useState } from "react";
// @ts-ignore
import ManageWallpaper, { TYPE } from "react-native-manage-wallpaper";
import { useGetMainContent } from "@/hooks/useGetMainContent";
import {
  Author,
  BackgroundScrollView,
  CartHead,
  Container,
  Content,
  WallpaperSetBtn,
  WallpaperSetBtnText,
  WallpaperSetErrBtn,
  WallpaperSetErrBtnText,
} from "./styles";
import { ModalBox } from "@/components/modal-box/ModalBox";
import {
  WallpaperSetScreenType,
  finishFnPropsType,
  useSetWallpaper,
} from "@/hooks/useSetWallpaper";
import { resType } from "@/constants/api";

export default function HomeScreen() {
  const [data, setData] = useState<resType[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("Что-то пошло не так!");
  const [imageItem, setImageItem] = useState<resType>();
  const [setImage] = useSetWallpaper();
  const contentPromise = useGetMainContent();

  useEffect(() => {
    async function expandFromPromise() {
      const currentData = await contentPromise;
      if (currentData) {
        console.log(currentData);
        setData(currentData);
      }
    }
    expandFromPromise();
  }, []);

  const finish = (res: finishFnPropsType) => {
    setIsLoading(false);
    setIsFinished(true);
    if (res.status === "error") {
      if (res.msg) {
        setErrText(res.msg);
      }
      setIsError(true);
    }
  };
  function setWallpaper(type: WallpaperSetScreenType) {
    setModalVisible(false);
    setIsLoading(true);
    try {
      if (imageItem) {
        setImage({ imageItem, type, finish });
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  function pressForImage(imageItem: resType) {
    console.log("pressed!");
    setImageItem(imageItem);
    setModalVisible(true);
  }

  return (
    <BackgroundScrollView>
      <ModalBox
        modalVisible={isError}
        setModalVisible={setIsError}
      >
        <WallpaperSetErrBtn isFirst>
          <WallpaperSetErrBtnText>{errText}</WallpaperSetErrBtnText>
        </WallpaperSetErrBtn>
      </ModalBox>
      <ModalBox
        modalVisible={isLoading}
        setModalVisible={setIsLoading}
        hasCloseBtn={false}
      >
        <ActivityIndicator size={36} />
      </ModalBox>
      <ModalBox modalVisible={isFinished} setModalVisible={setIsFinished}>
        <WallpaperSetBtn isFirst={true}>
          <WallpaperSetBtnText>Готово!</WallpaperSetBtnText>
        </WallpaperSetBtn>
      </ModalBox>
      <ModalBox modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <WallpaperSetBtn isFirst={true} onPress={() => setWallpaper(TYPE.BOTH)}>
          <WallpaperSetBtnText>Поставить на оба экрана</WallpaperSetBtnText>
        </WallpaperSetBtn>
        <WallpaperSetBtn onPress={() => setWallpaper(TYPE.HOME)}>
          <WallpaperSetBtnText>Поставить на главный экран</WallpaperSetBtnText>
        </WallpaperSetBtn>
        <WallpaperSetBtn onPress={() => setWallpaper(TYPE.LOCK)}>
          <WallpaperSetBtnText>
            Поставить на экран блокировки
          </WallpaperSetBtnText>
        </WallpaperSetBtn>
      </ModalBox>
      <Container>
        {data &&
          data.map((item) => (
            <Content key={item.id} onPress={() => pressForImage(item)}>
              <Image style={styles.image} src={item.filepath} />
              {/* <CartHead>
                <Author>{item.title}</Author>
              </CartHead> */}
            </Content>
          ))}
      </Container>
    </BackgroundScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
});
