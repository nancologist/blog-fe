export const convertToUrl = (str: string) => {
  str = str.toLowerCase()

  str = str.replace(/ä/g, 'ae');
  str = str.replace(/ö/g, 'oe');
  str = str.replace(/ü/g, 'ue');
  str = str.replace(/ß/g, 'ss');
  str = str.replace(/ /g, '-');
  str = str.replace(/\./g, '');
  str = str.replace(/,/g, '');
  str = str.replace(/\(/g, '');
  str = str.replace(/\)/g, '');

  return str
};

// export const generateBase64FromImage = imageFile => {
//   const reader = new FileReader();
//   const promise = new Promise((resolve, reject) => {
//     reader.onload = e => resolve(e.target.result);
//     reader.onerror = err => reject(err);
//   });

//   reader.readAsDataURL(imageFile);
//   return promise;
// };