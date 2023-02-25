export interface UserDetails {
    id: string,
    registerDate: Date,
    title: string,
    firstName: string,
    phone: string,
    lastName: string,
    email: string,
    picture: string,
    dateOfBirth: Date,
    gender: string,
    location: {
        street: string,
        state: string,
        country: string,
        timezone: string,
        city: string,
    }
}