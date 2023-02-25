import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
    SESSION: 'session',
};

export async function setItem(Key: string, item: any) {
    await AsyncStorage.setItem(Key, JSON.stringify(item));
}

export async function getItem(
    Key: string,
    onSuccess: Function,
    onFailure: Function,
) {
    await AsyncStorage.getItem(Key).then(
        (res) => {
            if (res != '' && res != null && res != undefined) {
                onSuccess(JSON.parse(res));
            } else {
                onFailure('Failed to get storage item');
            }
        },
        (err) => {
            onFailure(err);
        },
    );
}

export async function removeItem(
    Key: string,
    onSuccess: Function,
    onFailure: Function,
) {
    await AsyncStorage.removeItem(Key).then(
        (success) => onSuccess(success),
        (err) => onFailure(err),
    );
}