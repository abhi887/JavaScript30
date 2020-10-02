const progress = document.querySelector(".progress__filled");
const progressEmpty = document.querySelector(".progress");
const playToggle = document.querySelector(".player__button.toggle");
const volume = document.querySelector(".player__slider[name=volume]");
const speed = document.querySelector(".player__slider[name=playbackRate]");
const skipButtons = document.querySelectorAll(".player__button");
const video = document.querySelector(".player__video.viewer");
var mousedown = false;

function playPause(){
    if(video.paused){
        console.log(playToggle.innerHTML);
        playToggle.innerHTML="❚ ❚";
        video.play();
    }
    else if(!video.paused){
        console.log(playToggle.innerHTML);
        playToggle.innerHTML="►";
        video.pause();
    }
}

function dragProgress(e) {
    video.currentTime = (e.offsetX / progressEmpty.offsetWidth) * video.duration ;
}

document.addEventListener('DOMContentLoaded',()=>{
    setInterval(()=>{progress.style.flexBasis=`${(video.currentTime/video.duration)*100}%`},10);
})

progressEmpty.addEventListener('mousedown',()=>mousedown=true);
progressEmpty.addEventListener('mouseup',()=>mousedown=false);
progressEmpty.addEventListener('mousemove',(e)=> mousedown && dragProgress(e));
progressEmpty.addEventListener('click',dragProgress);

playToggle.addEventListener("click",playPause);

speed.addEventListener('change',()=>{
    video.playbackRate = speed.value;
})

volume.addEventListener('change',()=>{
    video.volume = volume.value;
})

skipButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        if(btn.dataset.skip != null) video.currentTime += parseFloat(btn.dataset.skip);
    })
})

document.querySelector("video").addEventListener('click',playPause);
document.addEventListener("keypress",e=>{ if(e.key==" ") playPause();});