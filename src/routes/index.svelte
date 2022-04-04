<!-- <script context="module">
	export const prerender = true
</script> -->
<script>
	import { onMount } from 'svelte'
	import { handle } from '$lib/bin'
	import { keypress } from '$lib/actions'
	import { dateTime, user, machine, history } from '$lib/stores'
	import Weather from '$lib/Weather.svelte'

	let lineData = []
	let histIndex = $history.length

	let termInput

	function enter() {
		let command = termInput.value
		const output = handle(command)
		lineData[lineData.length] = { command, output }
		termInput.value = ''

		if (command === '' || /^[ ]+$/.test(command) || $history[$history.length - 1] === command)
			return

		$history[$history.length] = command
		histIndex = $history.length
	}

	function arrowUp() {
		if (histIndex === 0) return

		histIndex--
		termInput.value = $history[histIndex]
	}

	function arrowDown() {
		if (histIndex < $history.length - 1) {
			histIndex++
			termInput.value = $history[histIndex]
		} else {
			histIndex = $history.length
			termInput.value = ''
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
	<pre class="output">Type 'help' to learn more.</pre>
	{#each lineData as line, i (i)}
		<span>
			<p class="prompt">{$user}@{$machine}:$&nbsp;</p>
			<pre class="input-old">{line.command}</pre>
			<br />
			{#if typeof line.output === 'string'}
				<pre class="output">{line.output}</pre>
			{:else}
				{#each line.output as out}
					{@html out}
				{/each}
			{/if}
		</span>
	{/each}
	<p class="prompt">{$user}@{$machine}:$&nbsp;</p>
	<input
		class="input"
		type="text"
		spellcheck="false"
		bind:this={termInput}
		use:keypress
		on:enterkey={enter}
		on:arrowup|preventDefault={arrowUp}
		on:arrowdown|preventDefault={arrowDown}
	/>
</div>
<div class="clock">{$dateTime}</div>
