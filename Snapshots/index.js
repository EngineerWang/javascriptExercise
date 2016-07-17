	function prepareGallery() {
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById) return false;
		if (!document.getElementById("icon")) return false;
		var oIcon = document.getElementById("icon");
		var aLinks = oIcon.getElementsByTagName("a");
		for (var i = 0; i < aLinks.length; i++) {
			aLinks[i].onclick = function() {
				return showPic(this) ? false : true;
			};
		}
	}

	function showPic(whichpic) {
		if (!document.getElementById("main-picture")) return false;
		var sSourse = whichpic.getAttribute("href");
		var oMainPicture = document.getElementById("main-picture");
		if (oMainPicture.nodeName != "IMG") return false;
		oMainPicture.setAttribute("src", sSourse);
		if (document.getElementById("paragraph")) {
			var sText = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
			var oParagraph = document.getElementById("paragraph");
			if (oParagraph.firstChild.nodeType == 3) {
				oParagraph.firstChild.nodeValue = sText;
			}
		}
		return true;
	}
	window.onload = prepareGallery();