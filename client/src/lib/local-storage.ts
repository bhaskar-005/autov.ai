


export const getLocalStorageItem = (key:string)=>{
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem(key);
    if(data) return JSON.parse(data);

    return null;
}

export const setLocalStorageItem = (key:string, data:any)=>{
    if (typeof window === "undefined") return null;

    localStorage.setItem(key, JSON.stringify(data));
}