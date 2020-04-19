"use strict"

const textAreaUpdated = (textBox, e) => {
  const results = doWrap(textBox.value)
  const cursorStart = e.target.selectionStart
  const cursorEnd = e.target.selectionEnd

  if(results.errors.length === 0) {
    textBox.value = results.wrapped.join("\r")
  }

  // info.innerHTML = `${cursorStart}:${cursorEnd}`
  e.target.setSelectionRange(cursorStart, cursorEnd)
}

const textArea = document.getElementById("inputArea")
textArea.addEventListener( "keyup", e => textAreaUpdated(textArea, e) )
textArea.addEventListener( "change", e => textAreaUpdated(textArea, e) )

// init
// const submitButton = document.getElementById("submit")
// submitButton.addEventListener( "click", () => {
  
//   console.log("Submit clicked")
//   const input = document.getElementById("unformatted")
//   const results = doWrap(input.value)

//   if(results.errors.length === 0) {
//     input.value = results.wrapped.join("\r")
//     // input.value = "moo"
//   }
  
// })

// const clearButton = document.getElementById("clear")
// clearButton.addEventListener( "click", () => {
//   console.log("Clear clicked")
// })

// const copyButton = document.getElementById("copy")
// copyButton.addEventListener( "click", () => {
//   console.log("Copy clicked")
// })

// const resetButton = document.getElementById("clear")
// resetButton.addEventListener( "click", () => {
//   console.log("Reset clicked")
// })
