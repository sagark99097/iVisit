
import { UserDetail } from '../types/models/Users';
export interface textInputProps {
    value: string;
    onChangeText: Function;
    placeholder: string;
    textInputStyle?: Object;
    keyboardType?: any;
    editable?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}
export interface buttonProps {
    buttonName: string;
    onPress: Function;
    extraStyle?: Object;
    textExtraStyle?: Object;
}
export interface renderVisitorProps {
    item: UserDetail;
    index: number;
    onPressVisitDetails: Function;
}
export interface LoaderProps {
    showLoader: boolean;
}