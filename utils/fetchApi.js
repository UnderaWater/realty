import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'f06f7a8585mshd619862b2847c74p157b49jsn28bada5cdf67'
        }
    })

    return data;
}