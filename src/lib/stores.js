import { browser } from '$app/env'
import { writable } from 'svelte/store'

const userStored = browser && localStorage.getItem('userName')
export const user = writable(userStored || 'guest')
user.subscribe((name) => {
    if (browser)
	    localStorage.setItem('userName', name)
})

const machineStored = browser && localStorage.getItem('userMachine')
export const machine = writable(machineStored || 'start')
machine.subscribe((name) => {
    if (browser)
	    localStorage.setItem('userMachine', name)
})
