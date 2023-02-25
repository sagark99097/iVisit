import { CommonActions } from '@react-navigation/native';
let _container: any;

function setContainer(container: Object) {
    _container = container;
}

function navigate(routeName: string, params?: Object) {
    _container.navigate(routeName, params);
}

function reset(routeName: string, params?: Object) {
    _container.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name: routeName, params: params }],
        }),
    );
}

function goBack() {
    _container.goBack();
}

export default {
    setContainer,
    navigate,
    reset,
    goBack,
};
