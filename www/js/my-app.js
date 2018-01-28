// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
    $$("#photoBtn").on("click", function(){
		 openCamera(false);
    });
    
    function setOptions(srcType) {
	    var options = {
	        // Some common settings are 20, 50, and 100
	        quality: 50,
	        destinationType: Camera.DestinationType.FILE_URI,
	        // In this app, dynamically set the picture source, Camera or photo gallery
	        sourceType: srcType,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE,
	        allowEdit: true,
	        correctOrientation: false  //Corrects Android orientation quirks
	    }
	    return options;
	}
	
	function openCamera(selection) {
 
	    var srcType = Camera.PictureSourceType.CAMERA;
	    var options = setOptions(srcType);
	    var func = createNewFileEntry;
	 
	    navigator.camera.getPicture(function cameraSuccess(imageUri) {
	 
	        displayImage(imageUri);
	        // You may choose to copy the picture, save it somewhere, or upload.
	        func(imageUri);
	 
	    }, function cameraError(error) {
	        console.debug("Unable to obtain picture: " + error, "app");
	    }, options);
	}
	
	function displayImage(imgUri) {
	 
	    $$('#imageFile').attr("src",imgUri);
	}
	
	function createNewFileEntry(imgUri) {
	    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
	 
	        // JPEG file
	        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
	 
	            // Do something with it, like write to it, upload it, etc.
	            // writeFile(fileEntry, imgUri);
	            console.log("got file: " + fileEntry.fullPath);
	            // displayFileData(fileEntry.fullPath, "File copied to");
	 
	        }, onErrorCreateFile);
	 
	    }, onErrorResolveUrl);
	}
});