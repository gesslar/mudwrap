"use strict"
const console = chrome.extension.getBackgroundPage().console

console.log("popup.js loaded");

// init
const submitButton = document.getElementById("submit")
submitButton.addEventListener( "click", () => {
  window.alert("hi there");
  console.log("Submit clicked")
})

const clearButton = document.getElementById("clear")
clearButton.addEventListener( "click", () => {
  console.log("Clear clicked")
})

const copyButton = document.getElementById("copy")
copyButton.addEventListener( "click", () => {
  console.log("Copy clicked")
})

const resetButton = document.getElementById("clear")
resetButton.addEventListener( "click", () => {
  console.log("Reset clicked")
})
