const setCookie = (cookieName: string, cookieValue: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    const cookieString = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
};

const clearCookie = (cookieName: string) => 
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

export {
    setCookie, clearCookie
}
