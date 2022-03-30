<!-- <script context="module">
	export const prerender = true
</script> -->

<script>
	import { onMount } from 'svelte'
	import dayjs from 'dayjs'
	import { handle } from '$lib/bin'

	$: timeString = () => dayjs().format('hh:mm:ss A')
	$: dateString = () => dayjs().format('ddd MMM DD')
	let dateTime = ''
	let history = []
	let lineData = []
	let histIndex = 0

	let termInput

	function startTime() {
		dateTime = `${dateString()} ${timeString()}`
		setTimeout(startTime, 500)
	}

	function handleKeypress(e) {
		const command = termInput.value
		if (e.key === 'Enter') {
			e.preventDefault()
			const output = handle(command)
			lineData[lineData.length] = { command, output }
			termInput.value = ''

			if (command === '' || /^[ ]+$/.test(command) || history[0] === command) return

			history[history.length] = command
			// histIndex = history.length
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			if (histIndex < history.length) {
				histIndex++
				termInput.value = history[history.length - histIndex]
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault()
			if (histIndex > 1) {
				histIndex--
				termInput.value = history[history.length - histIndex]
			} else {
				histIndex = 0
				termInput.value = ''
			}
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
	{#each lineData as line, i (i)}
		<span>
			<p class="prompt">joseph@mac:$&nbsp;</p>
			<pre class="input-old">{line.command}</pre>
			<br />
			<pre class="output">{line.output}</pre>
		</span>
	{/each}
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
