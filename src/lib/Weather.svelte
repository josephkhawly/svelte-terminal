<script>
    import { onMount } from 'svelte'

    let weatherString = ''

    const json_url = `https://api.openweathermap.org/data/2.5/weather?q=boulder&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

    onMount(async () => {
        await fetch(json_url)
            .then(response => response.json())
            .then(response => {
                const city = response.name
                const { temp, temp_min, temp_max, humidity } = response.main
                const temp_curr = temp.toFixed(0)
                const weatherCode = Number(response.weather[0].id)
                const disgusting = ((weatherCode > 500 && weatherCode < 800) || temp_min < 30 || temp_max > 95 || humidity > 75)

                let { description } = response.weather[0]
                description = description.charAt(0).toUpperCase() + description.slice(1)
                weatherString = `It's ${temp_curr}&deg; in ${city}. ${description}. ${disgusting ? 'Disgusting.' : 'Not bad.'}`
            })
    })
</script>

<pre class="output">{@html weatherString}</pre>