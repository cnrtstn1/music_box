const musicList = document.getElementById("musicList");
const songs = [];
let currentAudio = null;
let isPlaying = false;

function showMusicSection() {
    document.getElementById("showButton").style.display = "none";
    document.getElementById("musicDiv").style.display = "block";
    loadMusicList();
}

function loadMusicList() {
    musicList.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${song.name}`;

        const playPauseButton = document.createElement("button");
        playPauseButton.innerText = "Play";
        playPauseButton.onclick = () => playPause(index, playPauseButton);

        li.appendChild(playPauseButton);
        musicList.appendChild(li);
    });
}


const fileInput = document.getElementById("fileInput");
fileInput.addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];

    if (!file || (!file.name.endsWith('.mp3'))) {
        return alert("HATALI DOSYA");
    }

    const songName = file.name;
    const song = {
        name: songName,
        url: URL.createObjectURL(file)
    };

    songs.unshift(song);

    loadMusicList();
    fileInput.value = null
}

function playPause(index, button) {
    if (currentAudio && currentAudio !== songs[index].audio) {
        currentAudio.pause();
        isPlaying = false;
    }

    if (!songs[index].audio) {
        songs[index].audio = new Audio(songs[index].url);
    }

    currentAudio = songs[index].audio;

    if (isPlaying) {
        currentAudio.pause();
        button.innerText = "Play";
    } else {
        currentAudio.play();
        button.innerText = "Pause";
    }

    isPlaying = !isPlaying;
}



