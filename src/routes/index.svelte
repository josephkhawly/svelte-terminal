<!-- <script context="module">
	export const prerender = true
</script> -->
<script>
	import { onMount } from 'svelte'
	import { handle } from '$lib/bin'
	import { dateTime } from '$lib/stores'
	import Weather from '$lib/Weather.svelte'

	let history = []
	let lineData = []
	let histIndex = 0

	let termInput, command

	function handleKeypress(e) {
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
		termInput.focus()
	})
</script>

<svelte:head>
	<title>Terminal</title>
</svelte:head>

<div class="terminal" on:click={() => termInput.focus()}>
	<Weather />
	{#each lineData as line, i (i)}
		<span>
			<p class="prompt">joseph@mac:$&nbsp;</p>
			<pre class="input-old">{line.command}</pre>
			<br />
			{#if typeof line.output === 'string'}
				<pre class="output">{line.output}</pre>
			{:else}
				{#each line.output as out}
					<pre class="output">{out}</pre>
				{/each}
			{/if}
		</span>
	{/each}
	<p class="prompt">joseph@mac:$&nbsp;</p>
	<input
		class="input"
		type="text"
		spellcheck="false"
		bind:this={termInput}
		bind:value={command}
		on:keydown={handleKeypress}
	/>
</div>
<div class="clock">{$dateTime}</div>
