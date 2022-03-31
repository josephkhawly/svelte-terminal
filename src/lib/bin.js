import { bookmarks } from './bookmarks'
import { machine, user } from './stores'

function setUser(name) {
	if (name === '') return 'usage: user [newname]'

	user.set(name)
	return `Set user to ${name}.`
}

function setMachineName(name) {
	if (name === '') return 'usage: machine [newname]'

	machine.set(name)
	return `Set machine name to ${name}.`
}

function help() {
	return [
		'You found my terminal!',
		"This project serves as my browser's homepage. The bookmarks are 'commands' that you can type in the terminal.",
		"Type 'ls' to see all the commands."
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
	user: setUser,
	machine: setMachineName,
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
