import jwt_decode from 'jwt-decode';

export const decodeAuth = (auth: string): string => {
    return Object.values(jwt_decode(auth) as Object)[0]
}
