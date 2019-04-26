(function() {
  window.Gra = {
      createCanvas,
      resetDraw,
      saveImg
  }

  var canvas, ctx, initSite = {}, imgurl, drawColor = "black"

  function createCanvas(canvasId, imgUrl, color) {
    if (!canvasId) {
      return
    }
    canvas = document.getElementById(canvasId)
    ctx = canvas.getContext('2d')
    imgurl = imgUrl
    drawColor = color ? color : 'black'
    if (!canvas) {
      throw new Error(`Canvas with ID '${canvasId}' was not found `)
      return
    }

    drawImg(imgUrl)
    mouseEvents()
  }

  const mouseEvents = () => {
    canvas.onmousedown = function() {
      canvas.onmousemove = beginDraw
    }
  
    canvas.onmouseup = function(){
      canvas.onmousemove = null;	
      initSite = {};
    }
   
    canvas.onmouseout = function(){
      canvas.onmousemove = null;
      initSite = {};
    }
  }

  const drawImg = (imgUrl) => {
    let img = new Image()
    img.src = imgUrl
    
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }  
    console.log(img)
  }

  const beginDraw = (e) => {
    ctx.beginPath();
    ctx.moveTo(initSite['x'], initSite['y']);
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.strokeStyle = drawColor;
    ctx.stroke();
    //下一次的起始坐标
    initSite = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

  //重置画布
  function resetDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImg(imgurl)
  }  

  function saveImg() {
    const _imgurl = canvas.toDataURL('image/png');
    return _imgurl
  }
})()