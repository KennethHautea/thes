auth.onAuthStateChanged((user) => {
  if(user) {
    const id = localStorage.getItem("dbID");
    db.collection('event').doc(id).onSnapshot(function(doc) {
      render(doc)
    }
    );
  } else {
    window.location = 'index.html'
  }
});

function render(doc){

  const event = document.getElementById('event');
  let eventname = document.createElement('h1');
  eventname.className = 'display-1 text-center';
  eventname.setAttribute = ('id', 'CoupleName');
  eventname.setAttribute = ('style','line-height: 0.2')
  let eventdate = document.createElement('h4');
  eventdate.className = 'display-6 text-center';
  let eventvenue = document.createElement('h4')
  eventvenue.className = 'display-6 text-center';
  let at = document.createElement('h4')
  at.className = 'display-6 text-center';
  let div = document.createElement('div')

  eventname.textContent = doc.data().eventname;
  eventdate.textContent = doc.data().eventdate;
  eventvenue.textContent = doc.data().eventvenue;
  at.textContent ="at";
  div.appendChild(eventname);
  div.appendChild(eventdate);
  div.appendChild(at);
  div.appendChild(eventvenue);
  event.appendChild(div);
}

//---------------------------------------------------Select Image Gallery-------------------------------------------------------//

const imageUpload = document.querySelector("#gallery");
imageUpload.addEventListener("change",function(e){
        const file = this.files[0];
        /** 
        if(file){
            const reader = new FileReader();
            
             reader.addEventListener("load", function(){
              CreateApendedImg = $($.parseHTML('<img class="appendedImg" > ')).attr('src', this.result)
              // IMGsurroundedByDiv = `<div class="imgHolder">` + CreateIMGANDapendedImg + `</div>`;
          IMGsurroundedByDiv = $($.parseHTML('<div class="imgHolder">')).html(CreateApendedImg);
          IMGsurroundedByDiv.append('<span class="badge badge-danger" id="remove"  style = "cursor: pointer; position: absolute; padding" display:none;>x</span>');
          $("#showImg").append(IMGsurroundedByDiv);
             });
             reader.readAsDataURL(file);
       }*/
                var uploadTask = firebase.storage().ref('carousel/' + file.name).put(file);
                console.log(uploadTask)
                uploadTask.on('state_changed',function (snapshot)  {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    var progressBar = $('.progress-bar');
                    progressBar.css('width',progress);
                    console.log('Upload is ' + progress + '% done');
                   
                  }, 
                  (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    console.log(error.message);
                  }, 
                  () => {
                    
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                      console.log('File available at', downloadURL);
                      imgUrl = downloadURL;
                     
                        console.log('url'+imgUrl); 
                        db.collection("image").add({
                            imageUrl: imgUrl,
                            imageName: file.name
                            
                        })
                        .then(function(docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            console.log(docRef)
                            alert('successfully upload')
                            location.reload(); 
                            
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                      
                    });    
                    
                  }
                  
                )
    
});
//-----------------------------------------------------------image upload-----------------------------------------------------//
var imgUrl;
function upload(){
    var imageName = document.getElementById("file").files;
    for (var i = 0; i < imageName.length; i++){
        console.log(imageName[i].name);     
        
        // Upload file and metadata to the object 'images/mountains.jpg'
//var uploadTask = storageRef.ref('carousel/' + imageName.name)
var uploadTask = firebase.storage().ref('carousel/' + imageName[i].name).put(imageName[i]);
// Listen for state changes, errors, and completion of the upload.
// or 'state_changed'
uploadTask.on('state_changed',function (snapshot)  {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    console.log(error.message);
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      imgUrl = downloadURL;
      
        console.log('url'+imgUrl);
    });

  }
);
  
    }
    
}
//------------------------------------------------Image Preview------------------------//

db.collection("image").get().then(function(querySnapshot) {
   
  querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(doc.data().imageName)
      var ids = doc.id;
      var imageUrl = doc.data().imageUrl;
              CreateApendedImg = $($.parseHTML('<img class="appendedImg">')).attr('src',imageUrl),('id',ids)
                  // IMGsurroundedByDiv = `<div class="imgHolder">` + CreateIMGANDapendedImg + `</div>`;
              IMGsurroundedByDiv = $($.parseHTML('<div class="imgHolder">')).html(CreateApendedImg);
              IMGsurroundedByDiv.append('<span class="badge badge-danger" id="'+ids+'" onclick="remove(this)"  style = "cursor: pointer; position: absolute; padding">x</span>');
              $("#showgalleryImg").append(IMGsurroundedByDiv);
              console.log(doc.data().imageUrl)
  });
  
});
//remove img from firestore
function remove(ctl){
  var id = ctl.id
  console.log(ctl.name)
db.collection("image").doc(id).delete();
$(ctl).parents(".imgHolder").remove();
}
//----------------------------------------------------------Insert Guest in table-------------------------------------------------------------/
var addGuest = document.querySelector("#addGuest").addEventListener("click",function(e){
  // First check if a <tbody> tag exists, add one if not
  e.preventDefault();
  if ($("tbody").length == 0) {
      $("table").append("<tbody></tbody>");
  }
  // Append product to the table
  $("tbody").append("<tr>" +
      "<td>" + $("#getGuestValue").val() + "</td>" +
      "<td><button type='button' id='Update' class='btn btn-warning' style ='margin-right: 10px;'>Update</button><button type='button' id='Delete' onclick='Delete(this);' class='btn btn-danger'>Delete</button></td>" +
      "</tr>");
      console.log($("tbody").length);
});
function Delete(ctl) {
  $(ctl).parents("tr").remove();

}