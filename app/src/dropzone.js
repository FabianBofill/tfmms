// Open file dialog
const clickingHereTexts = document.querySelectorAll('.open-file-dialog');

clickingHereTexts.forEach((clickingHereText) => {
    clickingHereText.addEventListener('click', function() {
        clickingHereText.parentElement.parentElement.querySelector('.file-dialog-input').click();
    });
});

/////////////////// Drag and drop events ///////////////////
const dropzones = document.querySelectorAll('.dropzone-upload-area');
dropzones.forEach((dropzone) => {
    // Capture data from file dialog
    dropzone.onchange = ({ target }) => {
        let dropzoneItems = dropzone.querySelectorAll('.dropzone-file-upload-item');
        let files = target.files;

        if (!files.length) { return; }

        const maxFilesLimit = dropzone.getAttribute('attr-max-files');
        if (files.length + (dropzoneItems.length || 0) > maxFilesLimit) {
            alert('You are trying to upload a number of files than exceeds the limit.');
            return;
        }

        [...files].forEach(file => uploadFile(dropzone, file));
    };

    // Capture data from drag and drop
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        let dropzoneItems = dropzone.querySelectorAll('.dropzone-file-upload-item');
        dropzone.classList.remove('dropzone-upload-area--over');

        let files = e.dataTransfer.files;

        const maxFilesLimit = dropzone.getAttribute('attr-max-files');
        if (files.length + (dropzoneItems.length || 0) > maxFilesLimit) {
            alert('You are trying to upload a number of files than exceeds the limit.');
            return;
        }

        [...files].forEach(file => uploadFile(dropzone, file));
    });

    // Animations events
    dropzone.addEventListener('dragenter', function(e) {
        e.preventDefault();
    });

    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropzone.classList.add('dropzone-upload-area--over');
    });

    dropzone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropzone.classList.remove('dropzone-upload-area--over');
    });
});
////////////////// Functions ///////////////

// AJAX request to upload files to the server
function uploadFile(dropzone, file) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/" + SERVICE_ENDPOINT, true);

    // Create HTML element
    const filesUploaderArea = dropzone.parentElement.querySelector('.dropzone-files-uploaded');
    let fileName = file.name.length > 20 ? abbreviateFilename(file.name) : file.name;
    let fileItemHTML = createUploadItemHTML(fileName);
    // Add item to upload files area
    filesUploaderArea.innerHTML = fileItemHTML + filesUploaderArea.innerHTML;
    const fileItemSelector = filesUploaderArea.childNodes[0];

    // Progress bar feedback
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileLoaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 1000);

        fileItemSelector.querySelector('.file-uplading-percent').textContent = fileLoaded + '%';
        fileItemSelector.querySelector('.file-progress-bar').style.width = fileLoaded + '%';

        if (loaded == total) {
            fileItemSelector.querySelector('.file-status').textContent = 'Uploaded';
            fileItemSelector.querySelector('.dropzone-file-upload-progress-bar').remove();

            let fileSize = (fileTotal < 1024) ? fileTotal + ' KB' : (loaded / (1024 * 1024)).toFixed(2) + ' MB';
            fileItemSelector.querySelector('.file-size').classList.remove('hide');
            fileItemSelector.querySelector('.file-size').textContent = fileSize;
        }
    });


    // TODO: Borrar - solo para pruebas
    // let progress = 10;
    // let interval = setInterval(() => {
    //     let loaded = progress;
    //     let total = 2000000;
    //     progress = progress * 5;
    //     let fileLoaded = Math.floor((loaded / total) * 100);
    //     let fileTotal = Math.floor(total / 1000);

    //     fileItemSelector.querySelector('.file-uplading-percent').textContent = fileLoaded + '%';
    //     fileItemSelector.querySelector('.file-progress-bar').style.width = fileLoaded + '%';

    //     if (loaded >= total) {
    //         fileItemSelector.querySelector('.file-status').textContent = 'Uploaded';
    //         fileItemSelector.querySelector('.dropzone-file-upload-progress-bar').remove();

    //         let fileSize = (fileTotal < 1024) ? fileTotal + ' KB' : (loaded / (1024 * 1024)).toFixed(2) + ' MB';
    //         fileItemSelector.querySelector('.file-size').classList.remove('hide');
    //         fileItemSelector.querySelector('.file-size').textContent = fileSize;
    //         fileItemSelector.querySelector('.file-uplading-percent').textContent = '100%';
    //         clearInterval(interval);
    //     }
    // }, 250);

    var formData = new FormData();
    let userData = {
        firstName: "ABC",
        lastName: "DEF",
        //userFormData: formData
    }
    console.log(file);
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
    formData.append("csvFile", file);
    xhr.send(formData);
}

function createUploadItemHTML(fileName) {
    return `<div class="dropzone-file-upload-item">
              <!-- File icon -->
              <span class="icon">${svgIcons.documentFile}</span>
              <!-- Details -->
              <div class="dropzone-file-upload-details">
                  <!-- Content -->
                  <div class="dropzone-file-details-content">
                      <div class="dropzone-file-details-content-left">
                          <span class="file-name">
                              ${fileName} &#8226; 
                              <span class="file-status">Uploading</span>
                          </span>
                          <span class="file-size hide"></span>
                      </div>
                      <div class="dropzone-file-details-content-right">
                          <span class="file-uplading-percent">0%</span>
                      </div>
                  </div>
                  <!-- Progress bar -->
                  <div class="dropzone-file-upload-progress-bar">
                      <div class="file-progress-bar"></div>
                  </div>
               </div>
            </div>`;
}

function abbreviateFilename(fileName) {
    let splitName = fileName.split('.');
    return splitName[0].substring(0, 20) + '... .' + splitName[1];
}