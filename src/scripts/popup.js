"use strict"

// INIT
const optionNames = [ "wrap_at", "indent_check", "indent_at" ]

const wrapAt = document.getElementById("wrap_at")
const indentCheckbox = document.getElementById("indent_check")
const indentAt = document.getElementById("indent_at")

optionNames.forEach( optionName => {
  chrome.storage.sync.get(optionName, data => {
    console.log(optionName + " " + data[optionName])

    if(data[optionName] !== undefined) {
      const optionControl = document.getElementById(optionName)
      if(optionControl.type === "checkbox") {
        optionControl.checked = data[optionName]
      }
      optionControl.value = data[optionName]
    }
  })
})

const updateOptions = () => {
  const properties = {}

  optionNames.forEach( optionName => {
    const optionControl = document.getElementById(optionName)
    
    if(optionControl.type === "checkbox") {
      properties[optionControl.name] = optionControl.checked
    } else {
      properties[optionControl.name] = optionControl.value
    }

    
  })

  chrome.storage.sync.set(properties, () => {
    console.log(JSON.stringify(properties, null, 4))
  })
}

wrapAt.addEventListener( "change", e => updateOptions(e) )
indentCheckbox.addEventListener( "change", e => updateOptions(e) )
indentAt.addEventListener( "change", e => updateOptions(e) )

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

const chevron = document.getElementById("chevron")
const chevronLink = document.getElementById("chevronLink")
const optionsPanel = document.getElementById("options_panel")

chevron.addEventListener( "click", e => toggleOptions(e, chevron, optionsPanel) )
chevronLink.addEventListener( "click", e => toggleOptions(e, chevron, optionsPanel) )

const toggleOptions = (e, chevron, options) => {

  let chevronValue = chevron.textContent

  if(chevronValue === "chevron_right") {
    chevron.textContent = "expand_more"
    options.classList.remove("hidden")
  } else {
    chevron.textContent = "chevron_right"
    options.classList.add("hidden")
  }
}
