const form = document.querySelector('form')
const search = document.querySelector('input')
const locationResult = document.querySelector('#location-data')
const forecastResult = document.querySelector('#forecast-data')
const errorResult = document.querySelector('#error')
const loadingMessage = document.querySelector('#loading-message')

const resetResults = () => {
    locationResult.className = 'initial-results'
    forecastResult.className = 'initial-results'
    errorResult.className = 'initial-results'
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    loadingMessage.classList = 'completed-results'
    resetResults()
    const searchValue = search.value
    fetch('/weather?address=' + searchValue)
        .then(response => response.json())
        .then((data) => {
            if (data.error) {
                errorResult.textContent = data.error
                loadingMessage.classList = 'initial-results'
                errorResult.className = 'completed-results'
            } else {
                locationResult.textContent = data.location
                forecastResult.textContent = data.forecastData
                loadingMessage.classList = 'initial-results'
                locationResult.className = 'completed-results'
                forecastResult.className = 'completed-results'
            }
        })
})