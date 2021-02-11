const searchSong = () => {
    const searchText = document.getElementById("search").value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`

    fetch(url)
        .then((response) => response.json())
        .then((data) => showSong(data.data))
        .catch(error => displayError(error))

    //using async await
    // const response = await fetch(url)
    // const data = await response.json()
    // showSong(data.data)

}

const showSong = songs => {
    const songContainer = document.getElementById("songContainer")
    songContainer.innerHTML = ""
    songs.forEach(song => {

        const songDiv = document.createElement("div")
        songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
             <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls><source src="${song.preview}"></source></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
        `
        songContainer.appendChild(songDiv)

    });
}
const getLyric = async (artist, title) => {
    const url = ` https://api.lyrics.ovh/v1/:${artist}/:${title}`
    // fetch(url)
    // .then((response)=>response.json())
    // .then((data)=> showLyrics(data.lyrics))
    //using async await
    try {
        const res = await fetch(url);
        const data = await res.json();
        showLyrics(data.lyrics);
    }
    catch (error) {
        displayError(error)
    }

}

const showLyrics = lyric => {
    const lyricDiv = document.getElementById("lyrics")
    lyricDiv.innerText = lyric

}

const displayError = error => {
    const errorId = document.getElementById("errorMsg")
    errorId.innerHTML = `<h2>something went wrong. Please try again later</h2>`
    errorId = error
}
