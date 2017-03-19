var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if(iOS) {
    document.body.className = "ios-version";
}
