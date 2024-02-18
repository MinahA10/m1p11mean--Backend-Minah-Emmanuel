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
    })

  });
}

function formaterNumeroTelephone(numero) {
  let numeroFormatte = "-------------------------";
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

module.exports = {getFileExtension, formatMillier, ucwords, listContact, fileName, uploadImage};