const API_TOKEN='1407f8ed2b1cb20cf852a9569b22f1f0'

export default function getFilmsFromApiWithSearchedText(text, page){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=en&query=' + text + "&page=" + page
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300'+name;
}

