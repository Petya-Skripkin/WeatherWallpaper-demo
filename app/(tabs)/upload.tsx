import { Alert, Button, Image, Platform, Text, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { base_url } from "@/constants/api";

export default function TabTwoScreen() {
  const [image, setImage] = useState<string>();
  const [imageName, setImageName] = useState<string>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    const [img] = result.assets || [];
    console.log(img);

    if (!result.canceled && img) {
      setImage(img.uri);
      setImageName(img.fileName || `${Date.now()}`)
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    let uriParts = image.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("image", {
      uri: Platform.OS === "android" ? image : image.replace("file://", ""),
      name: imageName,
      type: `image/${fileType}`,
    } as any);

    try {
      let response = await fetch(base_url + "/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJson = await response.json();
      Alert.alert("Успешно загруженно!");
    } catch (error) {
      Alert.alert("Непредвиденная ошибка");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
