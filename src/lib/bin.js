import { bookmarks } from './bookmarks'
import { machine, user } from './stores'

// const setProperty = (key, value) => {
// 	if (value === '') return 'usage: name [newname]'

// 	localStorage.setItem(key, value)
// 	return `Set ${key} to ${value}.`
// }

function help() {
	return [
		'usage: help [command]', 
		'this is my terminal'
	]
}

const local = (args) => {
	if (args.length === 0) return 'usage: local [port] [flag]'

	const [port, flag] = args.trim().split(' ')
	let url = `http://localhost:${port}000`

	if (flag === '-a') url += '/admin'
	else if (flag === '-p') url += '/api'

	window.location.href = url
	return url
}

const actions = {
	echo: (input) => input,
	user: (name) => user.set(name),
	machine: (str) => machine.set(str),
	local,
	help,
}

export const handle = (text) => {
	const [command, ...args] = text.trim().split(' ')
	if (actions[command]) {
		const executor = actions[command]
		const output = executor(args.join(' '))
		return output
	} else {
		// check for URL
		let url

		// subreddit or reddit user
		if (text.slice(0, 3) === '/r/' || text.slice(0, 3) === '/u/')
			url = `https://www.reddit.com${text}`

		// bookmarks
		Object.keys(bookmarks).forEach(function (key) {
			if (bookmarks[key][text]) url = bookmarks[key][text]
		})

		if (url) {
			const modifier = url.substring(url.length - 3)
			if (modifier === '-t') {
				// Open in new tab
				url = url.slice(0, url.length - 3) //remove " -t"
				window.open(url, '_blank')
			} else {
				window.location.href = url
				return `Loading ${url}...`
			}
		}
	}

	return `Command '${command}' not found. Type 'ls' for all commands.`
}
