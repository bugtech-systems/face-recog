import moment from 'moment';


export function baseToFormData(base64, filename) {

   return fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], filename);
      return file
    });
    
    }

