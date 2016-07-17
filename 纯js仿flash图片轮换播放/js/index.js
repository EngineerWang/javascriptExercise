var oContainer = document.getElementById("container");
var oBigImg = document.getElementById("big-img");
var oSmallImg = document.getElementById("small-img");
var oPrev = document.getElementById("prev");
var oNext = document.getElementById("next");
var oCurrPage = document.getElementById("curr-page");
var oPageNumber = document.getElementById("page-number");
var oAllPage = document.getElementById("all-page");
var imgNumber = 8;
var aImgs = [],aImages = [];
var count = 0;
var nowIdx = 0;
var zIndex = imgNumber;
var timer;
for(var i=0; i<imgNumber; i++){
	var oImg = new Image();
	var oImage = new Image();
	oImage.onload = oImg.onload = function(){
		count++;
		if(count == imgNumber){
			loadSuccess();
		}
	};
	oImage.src = "imgs/" + (i + 1) + ".jpg";
	oImg.src = "imgs/" + (i + 1) + ".jpg";
	oImg.style.zIndex = imgNumber - i;
	aImgs.push(oImg);
	aImages.push(oImage);
}
function loadSuccess(){
	oAllPage.innerHTML = "/" + imgNumber;
	oSmallImg.style.backgroundColor = "#ccc";
	oCurrPage.style.backgroundColor = "#000";
	oPrev.style.zIndex = zIndex + 1;
	oNext.style.zIndex = zIndex + 1;
	oCurrPage.style.zIndex = zIndex + 1;
	for(var i=0; i<imgNumber; i++){
		aImages[i].index = i;
		oBigImg.appendChild(aImgs[i]);
		oSmallImg.appendChild(aImages[i]);
		aImages[i].style.opacity = 0.3;
		aImages[i].style.filter = "alpha(opacity = 30)";
		aImages[i].onmouseover = function(){
			animate(this,{opacity:100});
		};
		aImages[i].onmouseout = function(){
			if(aImages[nowIdx] != this){
				animate(this,{opacity:30});
			}
		};
		aImages[i].onclick = function(){
			if(this.index != nowIdx){
				changeImg(this.index);
			}
		};
	}

	oSmallImg.style.width = aImages[0].offsetWidth * imgNumber + 10 + "px";
	oContainer.onmouseout = function(){
		clearInterval(timer);
		timer = setInterval(function(){
				oNext.onclick();
			},1000);
	};
	oContainer.onmouseover = function(){
		clearInterval(timer);
	};
	(oContainer.onmouseout)();
	aImages[nowIdx].style.opacity = 1;
	aImages[nowIdx].style.filter = "alpha(opacity = 100)";
	oPrev.onmouseover = oNext.onmouseover = function(){
		animate(this,{opacity:100});
	};
	oPrev.onmouseout = oNext.onmouseout = function(){
		animate(this,{opacity:0});
	};
	oPrev.onclick = oNext.onclick = function(){
		if(this == oPrev){
			nowIdx--;
			if(nowIdx < 0){
				nowIdx = aImgs.length - 1;
			}
			changeImg(nowIdx);
		}else{
			nowIdx++;
			if(nowIdx == aImgs.length){
				nowIdx = 0;
			}
			changeImg(nowIdx);
		}
	};
}
function changeImg(idx){
	var iLeft = 0;
	nowIdx = idx;
	oPageNumber.innerHTML = nowIdx + 1;
	aImgs[nowIdx].style.opacity = 0;
	aImgs[nowIdx].style.filter = "alpha(opacity = 0)";
	aImgs[nowIdx].style.zIndex = ++zIndex;
	oPrev.style.zIndex = zIndex + 1;
	oNext.style.zIndex = zIndex + 1;
	oCurrPage.style.zIndex = zIndex + 1;
	animate(aImgs[nowIdx],{opacity:100});
	for(var j=0; j<aImages.length; j++){
		if(j != nowIdx){
			aImages[j].style.opacity = 0.3;
			aImages[j].style.filter = "alpha(opacity = 30)";
		}
	}
	aImages[nowIdx].style.opacity = 1;
	aImages[nowIdx].style.filter = "alpha(opacity = 100)";
	if(nowIdx == 0 || nowIdx == 1){
		iLeft = 0;
		console.log(iLeft);
	}else if(nowIdx == imgNumber - 1 || nowIdx == imgNumber - 2){
		iLeft = imgNumber - 4;
	}else{
		iLeft = nowIdx - 1;
		console.log(iLeft);
	}
	animate(oSmallImg,{
		left : -iLeft * aImages[0].offsetWidth
	});
}