require('dotenv').config()
const request = require('request')
const apiKey = process.env.DARKSKY_KEY

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const summary = body.daily.data[0].summary
            const temp = body.currently.temperature
            const precipProbability = Math.round(body.currently.precipProbability * 100)
            const dailyHigh = body.daily.data[0].temperatureHigh
            const dailyLow = body.daily.data[0].temperatureLow
            callback(
                undefined,
                summary
                + ' It is currently '
                + temp
                + '°C. There is currently a '
                + precipProbability
                + '% chance of rain. Today will have a temperature high of '
                + dailyHigh
                + '°C and a low of '
                + dailyLow
                + '°C.'
            )
        }
    })
}

module.exports = forecast