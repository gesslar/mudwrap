"use strict"

const textAreaUpdated = (textBox, e) => {
  const results = doWrap(textBox.value)
  const cursorStart = e.target.selectionStart
  const cursorEnd = e.target.selectionEnd

  if(results.errors.length === 0) {
    textBox.value = results.wrapped.join("\r")
  }

  e.target.setSelectionRange(cursorStart, cursorEnd)
}

const textArea = document.getElementById("inputArea")
textArea.addEventListener( "keyup", e => textAreaUpdated(textArea, e) )
textArea.addEventListener( "change", e => textAreaUpdated(textArea, e) )
