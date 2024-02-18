function getFileExtension(filename) {
    return filename.split('.').pop(); 
}

function convertStringOnObject(items){
    const data = [];
    for(let item of items){
        data.push(JSON.parse(JSON.stringify(item)));
    }
    return data;
}

function formatMillier(nombre) {
    return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

module.exports = {getFileExtension, convertStringOnObject, formatMillier};