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

function print() {
	const args = [...arguments]
	return args.map((text) => `<pre class="output">${text}</pre>`)
}

function printWithColor(text, color) {
	return `<pre class="output" style="color: ${color ?? 'inherit'};">${text}</pre>`
}

function ls() {
	let output = []
	const renderColor = '#00FF9C'

	for (let i of Object.keys(bookmarks)) {
		output.push(printWithColor(i, renderColor))
		let k = Object.keys(bookmarks[i])
		output.push(print(`> ${k.join(' > ')}`))
	}

	return output.flat()
}

function help() {
	return print(
		'You found my terminal!',
		"This project serves as my browser's homepage. The bookmarks are 'commands' that you can type in the terminal.",
		"Type 'ls' to see all the commands.",
		"Type 'src' to see the code for this project on GitHub."
	)
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
	ls,
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
		if (command.slice(0, 3) === '/r/' || command.slice(0, 3) === '/u/')
			url = `https://www.reddit.com${command}`

		// bookmarks
		Object.keys(bookmarks).forEach(function (key) {
			if (bookmarks[key][command]) url = bookmarks[key][command]
		})

		if (url) {
			if (args[0] === '-t') {
				window.open(url, '_blank') // Open in new tab
			} else {
				window.location.href = url
			}

			return `Loading ${url}...`
		}
	}

	return `Command '${command}' not found. Type 'ls' for all commands.`
}
