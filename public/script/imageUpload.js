
//---------------------------------------------------Select Image Gallery-------------------------------------------------------//
const imageUpload = document.querySelector("#file");
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
                        dbs.collection("image").add({
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

window.onload = function(){
    this.getdatas();
}
//------------------------------------------------------------Image Preview------------------------//
function getdatas(){
    /** */
dbs.collection("image").get().then(function(querySnapshot) {
   
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
                $("#showImg").append(IMGsurroundedByDiv);
                console.log(doc.data().imageUrl)
    });
    
});
}
//remove img from firestore
function remove(ctl){
    var id = ctl.id
    console.log(ctl.name)
  dbs.collection("image").doc(id).delete();
  $(ctl).parents(".imgHolder").remove();
}

//----------------------------------------------------------Insert Guest in table-------------------------------------------------------------//
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
//-----------------------------------------------------------Select photos in carousel------------------------------------------------------//
/** 
buttonCarousels.addEventListener('click', e => {
    e.preventDefault();

})

const addPhotoCarousel = document.querySelector("#buttonCarousels").addEventListener("click",function(e){
    
    var input = document.createElement("input");
    input.type = "file"; 
    files = e.target.files;
    
    input.addEventListener("change", function(){
        for(i = 0; i < input.files.length; i++){
            var file = input.files[i], i;
            reader = new FileReader;
            console.log(file);
            
            if(file){
                const reader = new FileReader();
                 reader.addEventListener("load", function(e){
                    CreateApendedImg = $($.parseHTML('<img class="appendedImg" > ')).attr('src', this.result)
                        // IMGsurroundedByDiv = `<div class="imgHolder">` + CreateIMGANDapendedImg + `</div>`;
                    IMGsurroundedByDiv = $($.parseHTML('<div class="imgHolder">')).html(CreateApendedImg);
                    //IMGsurroundedByDiv.append('<span class="badge badge-danger" style = "cursor: pointer; position: absolute; padding">x</span>');
                    $(".modal-body").append(IMGsurroundedByDiv);
                    
                 });
                 reader.readAsDataURL(file);
           }
           var badge = document.getElementsByClassName('badge');
           arrayFormCloseBtn = [...badge];
           arrayFormCloseBtn.forEach((onebyone) =>{
               onebyone.addEventListener('click',function(e){
                if (e.target.classList[0] == 'badge'){
                    console.log(file);
                   badge = e.target;
                   badge.parentElement.remove(file);
               }
                
              })
    
          });
           
           var uploadimg = document.querySelector("#insertPhotoCarousel").addEventListener("click", function(e){
            e.preventDefault();
            console.log(file.name);
            var uploadTask = firebase.storage().ref('carousel/'+file.name).put(file[0]);
            
            uploadTask.on('state_changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }),
            (error) => {
                // Handle unsuccessful uploads
                console.log("not saving!");
              }
              firebase.database()
            
        });
           
        } 
    });input.click();
    

})*/
