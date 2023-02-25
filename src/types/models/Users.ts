export interface UserDetail {
    id: string,
    lastName: string,
    firstName: string,
    email: string,
    title: string,
    picture: string
}

export interface Users {
    data: UserDetail,
    limit: number,
    offset: number,
    page: number,
    total: number,
}