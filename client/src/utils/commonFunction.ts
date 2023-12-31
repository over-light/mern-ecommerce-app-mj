import jwt_decode from 'jwt-decode'

export const getErrorMessage = (error: any) => {
    return error?.response?.data?.message;
}

export const setCookie = (name: string, value: string, expiry: any) => {
  const expiryDate = new Date(expiry * 1000)
  document.cookie = `${name}=${value}; max-age=${expiryDate};`
}

export const decodeToken = (token: string) => {
  return jwt_decode(token)
}


export const formatDate=(originalDateString:string)=>{

const originalDate = new Date(originalDateString);

const day = originalDate.getUTCDate();
const month = originalDate.getUTCMonth() + 1;
const year = originalDate.getUTCFullYear() % 100; 


const formattedDay = day.toString().padStart(2, '0');
const formattedMonth = month.toString().padStart(2, '0');


const hours = originalDate.getUTCHours();
const minutes = originalDate.getUTCMinutes();
const seconds = originalDate.getUTCSeconds();


const formattedHours = hours.toString().padStart(2, '0');
const formattedMinutes = minutes.toString().padStart(2, '0');
const formattedSeconds = seconds.toString().padStart(2, '0');


const formattedDateString = `${formattedDay}/${formattedMonth}/${year} - ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

return formattedDateString

}