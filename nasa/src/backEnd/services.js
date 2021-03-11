import React from 'react'
import { BASE_URL, NASA_API } from '../Contants'

export const getAsteroidInfo = async (id) => {
    try {
        var respose = await fetch(`${BASE_URL}${id}?api_key=${NASA_API}`)

        var responseJson = await respose.json();
        return responseJson
    } catch (ex) {
        console.log("ex", ex)
    }
}
export const getRandomAsteroid = async () => {
    try {
        console.log("api",NASA_API)
        var respose = await fetch(`${BASE_URL}browse?api_key=${NASA_API}`)

        var responseJson = await respose.json();
        return responseJson
    } catch (ex) {
        console.log("ex", ex)
    }
}