export function keypress(node) {
    function handleKeypress(e) {
        if (e.key === 'Enter') {
            node.dispatchEvent(new CustomEvent('enterkey'))
        } else if (e.key === 'ArrowUp') {
            node.dispatchEvent(new CustomEvent('arrowup'))
        } else if (e.key === 'ArrowDown') {
            node.dispatchEvent(new CustomEvent('arrowdown'))
        } else if (e.key === 'Tab') {
            node.dispatchEvent(new CustomEvent('tabkey'))
        }
    }

    document.addEventListener('keydown', handleKeypress, true)

    return {
        destroy() {
            document.removeEventListener('keydown', handleKeypress, true)
        }
    }
}
