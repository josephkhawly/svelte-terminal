import { browser } from '$app/env'
import { writable, readable } from 'svelte/store'
import dayjs from 'dayjs'

const userStored = browser && window.localStorage.getItem('userName')
export const user = writable(userStored || 'guest')
user.subscribe((name) => {
	if (browser) window.localStorage.setItem('userName', name)
})

const machineStored = browser && window.localStorage.getItem('userMachine')
export const machine = writable(machineStored || 'start')
machine.subscribe((name) => {
	if (browser) window.localStorage.setItem('userMachine', name)
})

const historyStored = browser && window.localStorage.getItem('history')
export const history = writable(historyStored ? JSON.parse(historyStored) : [])
history.subscribe((history) => {
	if (browser) window.localStorage.setItem('history', JSON.stringify(history))
})

export const dateTime = readable(dayjs().format('ddd MMM DD hh:mm:ss A'), function start(set) {
	set(dayjs().format('ddd MMM DD hh:mm:ss A'))
	const interval = setInterval(() => set(dayjs().format('ddd MMM DD hh:mm:ss A')), 1000)

	return function stop() {
		clearInterval(interval)
	}
})
