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

export const convertNumToDate: (n: number) => string = (num: number) => {
  return new Date(num)
    .toLocaleString(
      'de',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// export const generateBase64FromImage = imageFile => {
//   const reader = new FileReader();
//   const promise = new Promise((resolve, reject) => {
//     reader.onload = e => resolve(e.target.result);
//     reader.onerror = err => reject(err);
//   });

//   reader.readAsDataURL(imageFile);
//   return promise;
// };