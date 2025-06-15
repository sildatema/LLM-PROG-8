const input = document.getElementById("input")
const submit = document.getElementById("submit")
const responseDiv = document.getElementById("response")

submit.addEventListener("click", async () => {
    responseDiv.innerText = ""
    submit.disabled = true

    const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.value })
    })

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let content = ""

    while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const tokens = chunk.match(/data: (.+)/g)

        if (tokens) {
            tokens.forEach(token => {
                const text = token.replace(/^data: /, '')
                content += text
                responseDiv.innerText = content
            })
        }
    }

    submit.disabled = false
})
