// @ts-ignore
import ManageWallpaper, { TYPE } from "react-native-manage-wallpaper";
import { resType } from "@/constants/api";
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

export function useSetWallpaper() {
  function setImage({ imageItem, type, finish }: ISetImage) {
    ManageWallpaper.setWallpaper(
      // {
      //   uri: `${base_url}/images/${imageItem.id}?width=${screenWidth}&height=${screenHeight}`,
      // },
      {
        uri: imageItem.filepath
      },
      finish,
      type
    );
  }

  return [setImage]
}

export type WallpaperSetScreenType = {
  HOME: "home";
  LOCK: "lock";
  BOTH: "both";
};

export type finishFnPropsType = { status: "error" | "success", msg: string, url: string }

interface ISetImage {
  imageItem: resType,
  type: WallpaperSetScreenType,
  finish: (props: finishFnPropsType) => void
}
