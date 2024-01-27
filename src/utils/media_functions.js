import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const chooseImage = async () => {
    try {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        return result.assets[0].uri;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const takePhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
    });
    if (!result.canceled) {
        return result.assets[0].uri;
    }
    return null;
};

const saveImage = async (imageUri) => {
    if (imageUri) {
        const result = await MediaLibrary.saveToLibraryAsync(imageUri);
        if (!result.canceled) {
            return result.assets[0].uri;
        }
        return null;
    }
};

export { chooseImage, takePhoto, saveImage };