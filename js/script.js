
(function () {
  var width = 320
  var height = 320
  var streaming = false
  var video = null
  var canvasGallery = null
  var canvas = null;
  let DRAW = false;
  var no = 0, scale = 10, hue = 0;
  var photo = null;
  var photo1 = null;
  var link = null;
  var startbutton = null;




  document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("canvas")
    const vid = document.getElementById("video");
    const photo = document.getElementById("photo");
    const canvasVideo = document.getElementById("canvasVideo")

    var contextVideo = canvasVideo.getContext('2d');
    const photo1 = document.getElementById("photo");
    const link = document.getElementById('a');
    const canvas3 = document.getElementById("canvas3");
    const canvasGallery = document.getElementById("canvasGallery");
    const vidStyleData = vid.getBoundingClientRect();
    canvas.style.width = vidStyleData.width + 34 + "px";
    canvas.style.height = vidStyleData.height + 150 + "px";
    canvas.style.left = vidStyleData.left + "px";
    canvas.style.top = vidStyleData.top + "px";
    canvas3.style.width = vidStyleData.width + 34 + "px";
    canvas3.style.height = vidStyleData.height + 150 + "px";
    canvas3.style.left = vidStyleData.left + "px";
    canvasGallery.style.top = vidStyleData.top + "px";
    canvasGallery.style.width = vidStyleData.width + 34 + "px";
    canvasGallery.style.height = vidStyleData.height + 150 + "px";
    canvasGallery.style.left = vidStyleData.left + "px";

    canvasVideo.style.top = vidStyleData.top + "px";
    canvasVideo.style.width = vidStyleData.width + 34 + "px";
    canvasVideo.style.height = vidStyleData.height + 150 + "px";
    canvasVideo.style.left = vidStyleData.left + "px";
    canvasGallery.style.top = vidStyleData.top + "px";
    photo.style.width = vidStyleData.width + 34 + "px";
    photo.style.height = vidStyleData.height + 150 + "px";
    photo.style.left = vidStyleData.left + "px";
    photo.style.top = vidStyleData.top + "px";
    photo.width = 500;
    photo.height = 400;
    photo1.style.width = vidStyleData.width + 34 + "px";
    photo1.style.height = vidStyleData.height + 150 + "px";
    photo1.style.left = vidStyleData.left + "px";
    photo1.style.top = vidStyleData.top + "px";
 
    photo1.width = 500;
    photo1.height = 400;
    canvas.width = 400;
    var context = canvas.getContext('2d');
    context.fillStyle = "black";
    context.font = "50px Arial";
    context.fillText('ASD', 0, 50);
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "#00FFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);//for white background
    context.globalCompositeOperation = "source-over";
    context.lineWidth = 2;
    context.strokeStyle = "#FF0000";
    


  });

  function startup() {
    video = document.getElementById('video');
    canvasGallery = document.getElementById('canvasGallery');
    canvas = document.getElementById('canvas');

    canvas3 = document.getElementById('canvas3');
    const context = canvasGallery.getContext('2d')
    const context1 = canvas.getContext('2d')
    context1.fillStyle = "#FF0000";
    context1.fillRect(0, 0, 150, 75);

    photo = document.getElementById('photo');
    photo1 = document.getElementById('photo1')
    useFilter = document.getElementById('useFilter');
    startbutton = document.getElementById('startButton');
    const downloadBtn = document.getElementById("downloadBtn");
    addShapes = document.getElementById('addShapes');
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });



    video.addEventListener('canplay', function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvasGallery.setAttribute('width', video.videoWidth);
        canvasGallery.setAttribute('height', video.videoHeight);
        canvas.setAttribute('width', video.width);
        canvas.setAttribute('height', video.height);
        streaming = true;

      }

    });


    startbutton.addEventListener('click', function (ev) {

      context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo1.setAttribute('src', data);
        photo1.display = "none";
        console.log(photo1)
      } else {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/png');
        photo1.setAttribute('src', data);
      }
      ev.preventDefault();
    }, false);

    downloadBtn.addEventListener('click', download, false);
    function download() {
      var dt = canvasGallery.toDataURL('image/jpeg');
      this.href = dt;
    };


    useFilter.addEventListener('click', function (ev) {
      context = canvasGallery.getContext('2d');
      if (width && height) {
        canvasGallery.width = width;
        canvasGallery.height = height;
        context.drawImage(canvas, 0, 0);
        var data = canvas.toDataURL('image/png');
        photo2.setAttribute('src', data);

      } else {
        var context = canvasGallery.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvasGallery.width, canvasGallery.height);

        var data = canvasGallery.toDataURL('image/png');
        photo2.setAttribute('src', data);
      }
      ev.preventDefault();
    }, false);

    addShapes.addEventListener('click', function (ev) {
      const context = canvasGallery.getContext('2d');
     
      context.drawImage(canvasGallery, 0, 0);
      
      var data = canvasGallery.toDataURL('image/png');
      photo.setAttribute('src', data);
      const context1=canvas3.getContext('2d')
      canvas3.width=320;
      canvas3.height=240
      context1.drawImage(canvasGallery,0,0,320,240)

    })


    document.getElementById("randomButton").addEventListener("click", function () {
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context1.drawImage(photo1, 0, 0, width, height);
      let pixels = context1.getImageData(0, 0, width, height);
      pixels = randomEffect(pixels);
      context.putImageData(pixels, 0, 0)
    }, 1);

    function randomEffect(pixels) {
      for (let i = 0; i < pixels.data.length; i += 4) {
        var intensity = 0.5 * pixels.data[i] + 0.9 * pixels.data[i + 1] + 0.1 * pixels.data[i + 2] - 100;
        pixels.data[i] = Math.round(intensity) + 80;
        pixels.data[i + 1] = Math.round(intensity) + 9;
        pixels.data[i + 2] = Math.round(intensity) + 90;
      }
      return pixels;

    }

    document.getElementById("redButton").addEventListener("click", function () {
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context1.drawImage(photo1, 0, 0, width, height);
      let pixels = context.getImageData(0, 0, width, height);
      pixels = pinkEffect(pixels);
      context.putImageData(pixels, 0, 0);

    });


    function pinkEffect(pixels) {

      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] += 130;
        pixels.data[i + 1] -= 40;
        pixels.data[i + 2] += 150;

      }
      return pixels;
    }

    document.getElementById("neonButton").addEventListener("click", function () {
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context1.drawImage(photo1, 0, 0, width, height);
      let pixels = context1.getImageData(0, 0, width, height);
      pixels = neonEffect(pixels);
      context.putImageData(pixels, 0, 0)
    }, 1)

    function neonEffect(pixels) {

      for (var i = 0; i < pixels.data.length; i += 4) {
        var v = Math.abs(pixels.data[i]);
        pixels.data[i] = v;
        var h = Math.abs(pixels.data[i] + 70);
        pixels.data[i + 1] = h;
        pixels.data[i + 2] = (v + h) / 4;
        pixels.data[i + 3] = 200;
      }
      return pixels;
    }
    document.getElementById("drawButton").addEventListener("click", function () {
      const context1 = canvasGallery.getContext('2d')
      canvasGallery.width = width;
      canvasGallery.height = height;
      context1.drawImage(photo2, 0, 0, width, height);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          context1.strokeStyle = `rgb(
              0,
              ${Math.floor(255 - 80.5 * i)},
              ${Math.floor(255 - j)})`;
          context1.beginPath();
          context1.moveTo(0, i * 180);
          context1.bezierCurveTo(12.5 + j * 25, 12.5 + i * 25, i, 180, 160, 90);
          context1.bezierCurveTo(240, 0, 240, 180, 12.5 + j * 25, 12.5 + i * 25);
          context1.bezierCurveTo(0, 67, i * 89, 38 * j, 0, 12.5 + i * 25);
          context1.stroke();
        }
      }

      var data = canvasGallery.toDataURL('image/png');
      photo3.setAttribute('src', data);



    });

    document.getElementById("flowButton").addEventListener("click", function () {

      const context1 = canvasGallery.getContext('2d')
      canvasGallery.width = width;
      canvasGallery.height = height;
      context1.drawImage(photo2, 0, 0, width, height);
      for (var i = 0; i < 500; i++) {
        n = Math.floor(Math.random() * canvasGallery.width) + 1;
        m = Math.floor(Math.random() * canvasGallery.height) + 1;
        drawFlow(context1, n, m)
      }
      var data = canvasGallery.toDataURL('image/png');
      photo3.setAttribute('src', data);

    });

    function drawFlow(context1, n, m) {
      var angle = no * 10;
      var rad = scale * Math.sqrt(no / 4);
      var posX = rad * Math.sin(angle) + canvas3.width/n;
      var posY = rad * Math.cos(angle)+canvas3.height/ m;
      context1.fillStyle = 'hsl(' + hue + ', 60%, 60%)';
      context1.strokeStyle = 'white';
      context1.lineWidth = 1;
      context1.beginPath();
      context1.arc(posX, posY, 2, 0, Math.PI * 3);
      context1.closePath();
      context1.fill();
      context1.stroke();
      hue++;
      no++;

    }
    document.getElementById("colorButton").addEventListener("click", function () {

      const context1 = canvasGallery.getContext('2d')
      canvasGallery.width = width;
      canvasGallery.height = height;
      context1.drawImage(photo2, 0, 0, width, height);
      var grammar = '#JSGF V1.0'
      var recognition = new webkitSpeechRecognition();
      var speechRecognitionList = new webkitSpeechGrammarList();
      var color=null;
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.start();
console.log('Ready to receive a color command.');
recognition.onspeechend = function() {
  recognition.stop();
}
      recognition.onresult = function(event) {
         color = event.results[0][0].transcript;
console.log(color)
        console.log('Confidence: ' + event.results[0][0].confidence);
        var grd = context.createLinearGradient(0,0,0,height);
grd.addColorStop(0, color);
grd.addColorStop(0.5, "pink");
grd.addColorStop(1, "white");
context.fillStyle = grd;       
        context.fillRect(0, 0,width, 20);
        context.fillRect(0, 20, 20, height);
        context.fillRect(0, height-20, width, 20);
        context.fillRect(width-20, 20, 20, height);
        context.stroke();
        
      }
     
     
    });



    document.getElementById("rgbButton").addEventListener("click", function () {

      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context1.drawImage(photo1, 0, 0, width, height);
      let pixels = context1.getImageData(0, 0, width, height);
      pixels = rgbEffect(pixels);
      context.putImageData(pixels, 0, 0)
    }, 1)

    function rgbEffect(pixels) {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 500] = pixels.data[i + 0];
        pixels.data[i + 300] = pixels.data[i + 1];
        pixels.data[i - 450] = pixels.data[i + 2];

      }

      return pixels;
    }

  }
  
  document.getElementById("pixelButtonCanvas").addEventListener("click", function () {

    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(photo1, 0, 0, width, height);
    for(var m = 1; m < width; m += 7)
    {
      for(var n = 1; n <height; n += 7)
      {
        var pixel = context.getImageData(m, n, 4, 4);
        context.fillStyle = "rgb("+pixel.data[0]+","+pixel.data[1]+","+pixel.data[2]+")";
        context.fillRect(m, n,7,7);
       
      }
    }
  })

  
  document.getElementById("BlackWhiteButtonCanvas").addEventListener("click", function () {

    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(photo1, 0, 0, width, height);

    let imageData2 = context.getImageData(0, 0, width, height);
    let  data2=imageData2.data;
    for(var i = 0; i < data2.length; i+=4)
    {
      var r = data2[i],
        g = data2[i+4],
        b = data2[i+2];
        data2[i] = r;
        data2[i+1] = g;
        data2[i+2] = g;
    }
    imageData2.data=data2;
    context.putImageData(imageData2, 0, 0);

  })

  document.getElementById("frameButton").addEventListener("click", function () {

    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(photo1, 0, 0, width, height);
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    context.beginPath();
    context.fillStyle="#"+randomColor
    context.fillRect(0, 0,width, 15);
    context.fillRect(0, 15, 15, height);
    context.fillRect(0, height-15, width, 15);
    context.fillRect(width-15, 15, 15, height);
    context.stroke();


    

  })

  
  document.getElementById("invertButton").addEventListener("click", function () {

    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(photo1, 0, 0, width, height);
    let imageData = context.getImageData(0, 0, width, height);
    let data=imageData.data;
         for(var i = 0; i < data.length; i+=4)
         {
           var r = data[i],
             g = data[i+1],
             b = data[i+2];
           data[i] = 255-r;
           data[i+1] = 255-g;
           data[i+2] = 255-b;
         }
         imageData.data=data;
        context.putImageData(imageData, 0, 0);

  })


  window.addEventListener('load', startup, false);

  const drawFreeButton=document.getElementById("drawFreeButton")
  canvasGallery=document.getElementById('canvasGallery')
  // const photo=document.getElementById('photo')
  canvasGallery.addEventListener("mousemove", onMouseMove,false);
  drawFreeButton.addEventListener("click", onMouseClick,false);
  var mouseClicked=false, mouseReleased=true;
  var grammar = '#JSGF V1.0'
  var recognition = new webkitSpeechRecognition();
  var speechRecognitionList = new webkitSpeechGrammarList();
  var color=null;
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

 
  function onMouseClick(e)
  {
    canvasGallery=document.getElementById('canvasGallery')
    const context1 = canvasGallery.getContext('2d')
    var height = canvasGallery.height = window.innerHeight;
    var width = canvasGallery.width = window.innerWidth;
    context1.drawImage(photo2, 0, 0, width, height);
  
      recognition.start();
      console.log('Ready to receive a color command.');
      recognition.onspeechend = function() {
        recognition.stop();
      }
            recognition.onresult = function(event) {
               color = event.results[0][0].transcript;
            }
    mouseClicked=!mouseClicked;
  }
  
  function onMouseMove(e)
  {
  //  context1.drawImage(canvasGallery, 0, 0, width, height);
    if(mouseClicked)
    {  const context1 = canvasGallery.getContext('2d')
   
      // context1.beginPath();
      // context1.arc(e.clientX, e.clientY, 10,0,Math.PI*2,false)
      // context1.lineWidth=10;
      // context1.strokeStyle="pink"
      // context1.stroke();
  
               
      context1.lineWidth = 10;
      context1.lineCap = "round";
      context1.lineTo(e.clientX, e.clientY);
      context1.stroke();
      var randomColor = Math.floor(Math.random()*12345678).toString(16);
      context1.strokeStyle=color
      context1.beginPath();
      context1.moveTo(e.clientX, e.clientY);
 
      // canvasGallery.height=240;
      // canvasGallery.width=320;
    

    }
    // var data = canvasGallery.toDataURL('image/png');
    // photo.setAttribute('src', data);

  }

 

  let imgInput = document.getElementById('imageInput');
  imgInput.addEventListener('change', function (e) {
    if (e.target.files) {
      let imageFile = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        var userImg = new Image();
        userImg.src = e.target.result;
        userImg.onload = function (ev) {
          var canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");
          canvas.width = userImg.width;
          canvas.height = userImg.height;
          context.drawImage(userImg, 0, 0);
          // let imgData = canvas.toDataURL("image/jpeg",0.75); 
          var data = canvas.toDataURL('image/png');
          photo1.setAttribute('src', data);
        }
      }
    }
  });
  

  //video
  var rec = null;
  let text=null;
	rec = new webkitSpeechRecognition();

  let preview = document.getElementById("video");
  let recording = document.getElementById("video2");
  let startButton = document.getElementById("startRecButton");
  let stopButton = document.getElementById("stopButton");
  let downloadButton = document.getElementById("downloadButton");
  var contextVideo = canvasVideo.getContext('2d');


  downloadButton.addEventListener('click',function(){
    canvasVideo=document.getElementById('canvasVideo')
    var canvasVideoFinal=document.getElementById('canvasVideoFinal')
    var destCtx = canvasVideoFinal.getContext('2d');
    destCtx.drawImage(canvasVideo, 0, 0);

  })
  let recordingTimeMS = 5000;

  function wait(delayInMS) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
  }

  function startRecording(stream, lengthInMS) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = event => data.push(event.data);
    recorder.start();
    rec.start();
    rec.onstart = function() {
      console.log("Voice recognition started. Try speaking into the microphone.");
    };

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = event => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(
      () => recorder.state == "recording" && recorder.stop()
    );

    return Promise.all([
      stopped,
      recorded
    ])
      .then(() => data);
  }
  function stop(stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  startButton.addEventListener("click", function () {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      preview.srcObject = stream;
      //downloadButton.href = stream;
     
		
      preview.captureStream = preview.captureStream || preview.mozCaptureStream;
      return new Promise(resolve => preview.onplaying = resolve);
    }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
      .then(recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        recording.src = URL.createObjectURL(recordedBlob);
     //   downloadButton.href = recording.src;
       // downloadButton.download = "RecordedVideo.webm";
      })
      .catch();
  }, false);
  

  stopButton.addEventListener("click", function () {
    
    stop(preview.srcObject);
    rec.stop();
    rec.onresult = function(event) {
    text = event.results[0][0].transcript;}
    console.log(text)
    
  }, false);

  document.addEventListener('DOMContentLoaded', function () {
    var v = document.getElementById('video2');
    var canvas = document.getElementById('canvasVideo');
    var context = canvas.getContext('2d');
    var back = document.getElementById('canvasBack');
    var backcontext = back.getContext('2d');
    let effect = "Normal";
    var cw, ch;
    let buttons = document.getElementsByClassName("videoeffects");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        context.restore()
        context.save()
        console.log(buttons.length)
        effect=buttons[i].textContent
        console.log(effect
          )
        window.effect = this.dataset.effect;
      });
    }
    v.addEventListener('play', function () {
      cw = v.clientWidth;
      ch = v.clientHeight;
      canvas.width = cw;
      canvas.height = ch;
      back.width = cw;
      back.height = ch;
      // SimpleCanvas(v,context,backcontext,cw,ch);
      sc(v, context)
    }, false);
  
    function sc(video, context) {
      if (video.paused || video.ended) {
        return false;
      }
        switch(effect){
        case "Normal":
          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          break;
        case "Rotation":
          let angle = 3* Math.PI / 180;
          let ct = Math.cos(angle);
           let st = Math.sin(angle);
          let x = video.clientWidth / 2, y = video.clientHeight / 2;
          context.transform(ct, -st, st, ct, -x * ct - y * st + x, x* st - y * ct + y);
          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
      

          break;
          case "Frame":
context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
var offset = 0;
function draw() {
  context.clearRect(0, 0, video.clientWidth, 15);
  context.clearRect(0, 15, 15, video.clientHeight);
  context.clearRect(0, video.clientHeight-15, video.clientWidth, 15);
  context.clearRect(video.clientWidth-15, 15, 15, video.clientHeight);
  context.setLineDash([4, 2]);
  context.lineDashOffset = -offset;
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  context.strokeStyle = "#a30b8f";
  context.strokeRect(10, 10, video.clientWidth-20, video.clientHeight-20);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();

break;
          case "BlackWhite":
            context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
            let imageData2 = context.getImageData(0, 0, video.clientWidth, video.clientHeight);
            let  data2=imageData2.data;
            for(var i = 0; i < data2.length; i+=4)
            {
              var r = data2[i],
                g = data2[i+4],
                b = data2[i+2];
                data2[i] = r;
                data2[i+1] = g;
                data2[i+2] = g;
            }
            imageData2.data=data2;
            context.putImageData(imageData2, 0, 0);
            break;

            case "Neon":
              context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
              let pixels1 = context.getImageData(0, 0, video.clientWidth, video.clientHeight);
             
              for (var i = 0; i < pixels1.data.length; i += 4) {
                var v = Math.abs(pixels1.data[i]);
                pixels1.data[i] = v;
                var h = Math.abs(pixels1.data[i] + 70);
                pixels1.data[i + 1] = h;
                pixels1.data[i + 2] = (v + h) / 4;
                pixels1.data[i + 3] = 200;
              }
               
              context.putImageData(pixels1, 0, 0);
              break;

        case "Invert":
         

          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          let imageData = context.getImageData(0, 0, video.clientWidth, video.clientHeight);
         let data=imageData.data;
         for(var i = 0; i < data.length; i+=4)
         {
           var r = data[i],
             g = data[i+1],
             b = data[i+2];
           data[i] = 255-r;
           data[i+1] = 255-g;
           data[i+2] = 255-b;
         }
         imageData.data=data;
        context.putImageData(imageData, 0, 0);
         
          break;
        case "BlackWhite":
          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          let imageData1 = context.getImageData(0, 0, video.clientWidth, video.clientHeight);

          context.putImageData(imageData1, 0, 0);

          break;
          case "Pixel":
          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          for(var m = 1; m < video.clientWidth; m += 7)
          {
            for(var n = 1; n < video.clientHeight; n += 7)
            {
              var pixel = context.getImageData(m, n, 4, 4);
              context.fillStyle = "rgb("+pixel.data[0]+","+pixel.data[1]+","+pixel.data[2]+")";
              context.fillRect(m, n,7,7);
            }
          }
          break;
          case "RGB":
            context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          let pixels = context.getImageData(0, 0, video.clientWidth, video.clientHeight);
       
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 500] = pixels.data[i + 0];
        pixels.data[i + 300] = pixels.data[i + 1];
        pixels.data[i - 450] = pixels.data[i + 2];

      }

      context.putImageData(pixels, 0, 0)
     
       break;
      case "Words":
        context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        var gradient = context.createLinearGradient(0, 0, video.clientWidth, 0);
gradient.addColorStop("0","pink");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("0.1", "white");
context.fillStyle = gradient;
        context.font = "30px Red Rose";
        
        context.fillText(text, 100, 100);
        console.log(text);
      
            break;
       


      }
      canvasVideo=document.getElementById('canvasVideo')
      var canvasVideoFinal=document.getElementById('canvasVideoFinal')
      var destCtx = canvasVideoFinal.getContext('2d');
      destCtx.drawImage(canvasVideo, 0, 0);
      setTimeout(sc, 66, video, context);
    }



    })

  
  })();


function PlaySound(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.play();
  }

  function StopSound(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
  }

