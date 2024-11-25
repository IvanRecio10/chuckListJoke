document.body.addEventListener('click', loadChuckNorrisJokes())

const jokesBtn = document.getElementById("fetchJoke")

function loadChuckNorrisJokes(){
    const jokesDiv = document.getElementById("jokeList")
    jokesDiv.innerHTML = ""
    var jokesList = localStorage.getItem("jokes")
    jokesList = JSON.parse(jokesList)
    var contador = 0
    if (jokesList != null) {
        for (var joke of jokesList) {
            jokesDiv.innerHTML += "<li>" + joke + "<button onclick='deleteJoke(" + contador + ")' class='deleteBtn'>Borrar</button></li>"
            contador++
        }
    }
}

function deleteJoke(contador){
    var jokesList = localStorage.getItem("jokes")
    jokesList = JSON.parse(jokesList)
    
    jokesList.splice(contador, 1)

    localStorage.setItem('jokes', JSON.stringify(jokesList))

    loadChuckNorrisJokes()
}

jokesBtn.addEventListener('click', () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error en la peticion")
            }

            return res.json();
        }).then((data) => {
            var jokesList = localStorage.getItem("jokes")
            var newJokesList = []
            if (jokesList != null) {
                newJokesList = JSON.parse(localStorage.getItem("jokes"))
            }else{
                newJokesList = []
            }


            if (data.joke) {
                newJokesList.push(data.joke)
            } else if (data.value) {
                newJokesList.push(data.value)
            }else {
                var jokeText = data.setup + " / " + data.delivery 
                newJokesList.push(jokeText)
            }
            
            localStorage.setItem('jokes', JSON.stringify(newJokesList))

            loadChuckNorrisJokes()
        })
})