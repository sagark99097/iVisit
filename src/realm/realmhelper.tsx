const Realm = require('realm');

export const USERS_SCHEMA = 'Users';

//database schema
const Users = {
    name: USERS_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'int', default: 0 },
        email: 'string',
        firstName: 'string',
        userId: 'string',
        lastName: 'string',
        picture: 'string',
        title: 'string',
        isFavorite: { type: 'int', default: 0 },
    },
};

const databaseOptions = {
    path: 'Users.realm',
    schema: [Users],
    deleteRealmIfMigrationNeeded: true,
    schemaVersion: 1,
};

const realm = new Realm(databaseOptions);

//create database and insert userdata
export const addToFavoriteList = data => {
    let ID =
        realm.objects(USERS_SCHEMA).sorted('id', true).length > 0
            ? realm.objects(USERS_SCHEMA).sorted('id', true)[0].id + 1
            : 1;
    data['id'] = ID;

    realm.write(() => {
        realm.create(USERS_SCHEMA, data, Realm.UpdateMode.All);
    });
};

//get all favorite list
export const getFavoriteList = () => {
    let objects = realm.objects(USERS_SCHEMA);
    let items = objects.filtered(`isFavorite = "${1}"`);
    return items;
};

//update favorite data (isFavorite) value
export const updateFavoriteList = (id: number, value: number) => {
    let objects = realm.objects(USERS_SCHEMA);
    realm.write(() => {
        value
        objects[id].isFavorite = value;
    });
};

//find particuler user favoritelist in added or not
export const findAlreadyFavorite = (userID: string) => {
    let List = realm.objects(USERS_SCHEMA);
    let items = List.filtered(`userId = "${userID}"`);
    return (item = items[0]);
};