const multer = require('multer');

function getFileExtension(filename) {
  return filename.split('.').pop();
}

function formatMillier(nombre) {
  return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function ucwords(str) {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}

function listContact(contact1, contact2) {
  const contactList = [];
  if (contact1.length >= 1) {
    contactList.push(contact1);
  }
  if (contact2.length >= 1) {
    contactList.push(contact2);
  }
  return contactList;
}

function fileName(req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const extension = getFileExtension(file.originalname);
  cb(null, uniqueSuffix + '.' + extension);
}

function uploadImage(path) {
  return multer({

    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },

      filename: function (req, file, cb) {
        return fileName(req, file, cb);
      }
    }),
    limits: {
      fileSize: 10 * 1024 * 1024 // Limite de taille du fichier (ici, 10 Mo)
    }
  });
}

function formaterNumeroTelephone(numero) {
  let numeroFormatte = "---------------------";
  if (numero.length > 4) {
    const numeroPropre = numero.replace(/\D/g, '');
    const groupe1 = numeroPropre.slice(0, 3);
    const groupe2 = numeroPropre.slice(3, 5);
    const groupe3 = numeroPropre.slice(5, 7);
    const groupe4 = numeroPropre.slice(7, 10);
    const groupe5 = numeroPropre.slice(10);
    numeroFormatte = `+${groupe1} ${groupe2} ${groupe3} ${groupe4} ${groupe5}`;
  }
  return numeroFormatte;
}

function getContact(contactList, index){
  let contact = "";
  if(contactList.length == 2 && index == 1){
    contact = contactList[index];
  }
  else if(contactList.length >= 1 && contactList.length <= 2 && index == 0){
    contact = contactList[0];
  }
  return contact;
}

function supprimerElement(tableau, elementASupprimer) {
  const index = tableau.indexOf(elementASupprimer);
  if (index !== -1) {
    tableau.splice(index, 1);
  }
}

function deleteDouble(array1, array2){
  if(array2.length >= 1){
    array2.forEach(element => {
      if(!array1.includes(element)){
        array1.push(element);
      }
    });
  }else{
    array1 = [];
  }
  return array1;
}

function deleteElement(array1, array2){
  let array = deleteDouble(array1, array2);
  array.forEach(element => {
    if(!array2.includes(element)){
      supprimerElement(array, element);
    }
  });
  return array;
}

function isArray(args){
  let array = [];
  if(Array.isArray(args)){
    args.forEach(element => {
      array.push(element);
    });
  }else{
    if(args !== undefined){
      array.push(args);
    }
  }
  return array;
}

function timeToMinute(durationString){
  
  if (durationString) {
  const [hours, minutes] = durationString.split(':').map(Number);
  
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes; 
} else {
  console.error("durationString is undefined");
}
 
}

function addMinutesToDate(dateString, minutesToAdd) {

  const date = new Date(dateString);

  date.setMinutes(date.getMinutes() + minutesToAdd);

  const formattedDate = date.toISOString();

  return formattedDate;
}

module.exports = {getFileExtension, formatMillier, ucwords, listContact, fileName, uploadImage, formaterNumeroTelephone, getContact, deleteDouble, isArray, deleteElement,timeToMinute,addMinutesToDate};