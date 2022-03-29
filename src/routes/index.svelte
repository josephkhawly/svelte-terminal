<script context="module">
	export const prerender = true
</script>

<script>
	import { onMount } from 'svelte'
	import dayjs from 'dayjs'
	$: timeString = () => dayjs().format('hh:mm:ss A')
	$: dateString = () => dayjs().format('ddd MMM DD')
	let dateTime = ''

	let termInput

	function startTime() {
		dateTime = `${dateString()} ${timeString()}`
		setTimeout(startTime, 500)
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
	<pre class="input" contenteditable="true" spellcheck="false" bind:this={termInput} />
</div>
<div class="clock">{dateTime}</div>
