import moment from 'moment';


const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (!string) return true;
  if (String(string).trim() === '') return true;
  else return false;
};

const isShort = (string, len) => {
  if (!string) return true;
  if (String(string).length < len) return true;
  else return false;
};

function isNotFutureDate(inputDate) {
  console.log(inputDate, 'INPT')
  if (isEmpty(inputDate)) return false;
  // Create a new Date object from the input string
  const dateParts = inputDate.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);
  const inputDateObj = new Date(year, month - 1, day); // Note: Months are zero-based (0 = January)

  // Get the current date
  const currentDate = new Date();

  // Compare inputDate with currentDate
  return inputDateObj <= currentDate;
}

function isTodayOrFutureDate(inputDate) {
  const momentDate = moment(inputDate, 'YYYY-MM-DD');
  const today = moment();

  return momentDate.isSameOrAfter(today, 'day');
}

function isDateBefore(date1, date2) {
  const momentDate1 = moment(date1, 'YYYY-MM-DD');
  const momentDate2 = moment(date2, 'YYYY-MM-DD');

  return momentDate1.isBefore(momentDate2);
}

function isDateAfter(date1, date2) {
  const momentDate1 = moment(date1, 'YYYY-MM-DD');
  const momentDate2 = moment(date2, 'YYYY-MM-DD');

  return momentDate1.isAfter(momentDate2);
}



export const validateLoginData = (data) => {
  let errors = {};
  if (data.loginType === 'admin') {
    if (isShort(data.password, 6)) errors.password = 'Password must be 6 characters!';
    if (isEmpty(data.password)) errors.password = 'Password must not be empty!';

  } else {
    if (isEmpty(data.username)) errors.username = 'Username must not be empty!';
    if (isShort(data.password, 6)) errors.password = 'Password must be 6 characters!';
    if (isEmpty(data.password)) errors.password = 'Password must not be empty!';
  }





  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};


export const validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.username)) errors.username = 'Name must not be empty!';
  if (!isEmpty(data.password) && isShort(data.password, 6)) errors.password = 'Password must be 6 characters!';
  if (isEmpty(data.access)) errors.access = 'User Access must not be empty!';
  if (isEmpty(data.siteid)) errors.siteid = 'Site must not be empty!';
  if (isEmpty(data.post)) errors.post = 'Post must not be empty!';


  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};


export const validateProfileImage = (data) => {
  let errors = {};
  console.log(String(data.mobileNumber).charAt(0) != 9, String(data.mobileNumber).length !== 10)
  if (isEmpty(data.lastName)) errors.lastName = 'Last Name must not be empty!';
  if (isEmpty(data.firstName)) errors.firstName = 'First Name must not be empty!';
  if (isEmpty(data.picture1)) errors.picture1 = 'Picture must not be empty!';
  if (isEmpty(data.picture2)) errors.picture2 = 'Picture must not be empty!';

  if ((data.mobileNumber && String(data.mobileNumber).length !== 10) || String(data.mobileNumber).charAt(0) != 9) errors.mobileNumber = 'Invalid Mobile!';
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};



