# Svelte Terminal

This project is a very basic terminal emulator built with SvelteKit. It mostly acts as a homepage with bookmark "commands".

I actually use this regularly as my browser homepage. I built the original version in 2017 with plain JavaScript. In 2022 I decided to port it to SvelteKit as a way to learn it.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjosephkhawly%2Fsvelte-terminal&env=VITE_WEATHER_API_KEY&envDescription=API%20key%20from%20openweathermap.org&envLink=https%3A%2F%2Fopenweathermap.org%2Fappid&demo-title=Svelte%20Terminal&demo-description=A%20terminal-style%20homepage%20built%20with%20SvelteKit&demo-url=https%3A%2F%2Fterminal.josephkhawly.dev%2F)

## Customization

### Colors

Change the custom properties in `app.css`

### Bookmarks

Bookmarks can be changed in `lib/bookmarks.js`

Format:

    category: {
        name: 'https://example.com',
    }

## New features to add

- Search command
- Tab autocomplete
- clear command
