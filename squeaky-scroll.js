var squeak = new Audio();
squeak.src = chrome.runtime.getURL("squeak.mp3");
var isPlaying = false;
var interacted = false;
var timer;

function playSqueak() {
  if (!isPlaying) {
    var resp = squeak.play();

    if (resp !== undefined) {
      resp
        .then((_) => {
          // autoplay starts!
          isPlaying = true;
          console.log("starting");
        })
        .catch((error) => {
          //show error
        });
    }
  }
}

function stopSqueak() {
  if (isPlaying) {
    console.log("stopping");
    squeak.pause();
    squeak.currentTime = 0;
    isPlaying = false;
  }
}
function play() {
  // play() is repeatedly fired when scrolling. When timeout occurs, it means scrolling has stopped. 
  clearTimeout(timer);
  timer = setTimeout(stopSqueak, 100);
  // Chrome requires interaction with the page before audio can be played
  if (interacted) {
    //play audio or video
    playSqueak();
  }
}
function fun() {
  interacted = true;
  document.removeEventListener("scroll", fun);

  document.addEventListener("scroll", play);
}
document.addEventListener("scroll", fun);
document.addEventListener("mouseup", stopSqueak);
document.addEventListener("touchend", stopSqueak);
