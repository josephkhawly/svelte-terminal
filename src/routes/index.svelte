<script context="module">
	export const prerender = true
</script>

<script>
	import { onMount } from 'svelte'
	import dayjs from 'dayjs'
	import { handle } from '$lib/bin'

	$: timeString = () => dayjs().format('hh:mm:ss A')
	$: dateString = () => dayjs().format('ddd MMM DD')
	let dateTime = ''

	let termInput

	function startTime() {
		dateTime = `${dateString()} ${timeString()}`
		setTimeout(startTime, 500)
	}

	function handleKeypress(e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			const output = handle(termInput.value)
			termInput.value = ''
		}
	}

	onMount(() => {
		startTime()
		termInput.focus()
	})
</script>

<svelte:head>
	<title>~</title>
</svelte:head>

<div class="terminal" on:click={() => termInput.focus()}>
	<p class="prompt">joseph@mac:$&nbsp;</p>
	<input
		class="input"
		type="text"
		spellcheck="false"
		bind:this={termInput}
		on:keydown={handleKeypress}
	/>
</div>
<div class="clock">{dateTime}</div>
