document.addEventListener('alpine:init', () => {
    Alpine.data('image', () => ({
      fname: 'the image',
      imageUrl: '',
      imageData : null,
      status : "...",
      message : "...",
      fileChosen(evt) {  
        this.fileToDataUrl(evt, (src) => (this.imageUrl = src));
      },
  
      fileToDataUrl(event, callback) {
        if (!event.target.files.length) return;
  
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
        reader.onload = (e) => callback(e.target.result);
  
        const formData = new FormData();
        // this key name should match the name in the api route.
        formData.append('image', file);
        this.imageData = formData;
        
      },
      uploadPhoto(){
        axios
          .post('http://127.0.0.1:8000/api/detect', this.imageData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .catch((err) =>{
            this.status = "error uploading image"
          })
          .then((result) => {
            console.log(result.data)
            this.status = result.data.pred_class
            this.message = result.data.confidence
        });
      }
    }));
  });
  