const dropZonephoto = document.getElementById('dropZonePhoto');
const fileInput = document.getElementById('fileInput');
const photoPreview = document.getElementById('photoPreview');

dropZonephoto.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZonephoto.classList.add('drop-zone--over');
});

dropZonephoto.addEventListener('dragleave', () => {
    dropZonephoto.classList.remove('drop-zone--over');
});

dropZonephoto.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZonephoto.classList.remove('drop-zone--over');

    const files = e.dataTransfer.files; 
    if (files.length > 0) {
        const file = files[0]; 
    
        if (file.type.startsWith('image/')) { 
           
            fileInput.files = files;
            
            const reader = new FileReader(); 
            reader.onload = () => { 
                photoPreview.src = reader.result; 
                photoPreview.style.display = 'block'; 
            };
            reader.readAsDataURL(file); 
        }
    }
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            photoPreview.src = reader.result;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
