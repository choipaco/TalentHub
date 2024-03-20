export const tokenBearer = (token:string) => {
    const cleanedToken = token.replace(/^Bearer\s/, '');
    console.log(cleanedToken)
    return cleanedToken;
}