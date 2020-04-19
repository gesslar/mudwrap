"use strict"

const doWrap = (text, line_length = 79, indent = 0, indent_width = 5) => {
  const finished = []
  const sections = text.replace(/\r\n/gm, "\r").replace(/\n/gm, "\r").split("\r")
  const errors = [];

  for (const section of sections ) {
    const asciiCheckResults = asciiCheck(section)

    if(asciiCheckResults.status === "fail") {
      errors.push( ...asciiCheckResults.errors )
      finished.push( section )
      continue 
    }

    finished.push( perform_wrap( section, line_length, indent, indent_width ) )
  }

  console.log(finished)

  return {
    wrapped: finished,
    errors: errors
  }
}
  
const asciiCheck = text => {
  const errors = []

  for(const character of text) {
    if(!validateAscii(character.charCodeAt(0))) {
      errors.push ( `Unidentified ASCII character "${character}".`)
    }
  }

  return {
    status: errors.length ? "fail" : "pass",
    errors: errors.length ? errors : undefined
  }
}
  
const validateAscii = char => char >= 32 && char <= 126
  
const perform_wrap = (text = "", line_length = 79, indent = false, indent_width = 5) => {
  const indent_text = indent === true ? " ".repeat(indent_width) : ""
  const text_length = text.length

  let text_token = 0, line_cursor = 0, space = 0, skip = 0
  let result = ""
  
  if (text_length <= line_length) return text

  // while(text_token < text_length) {
  //   if(line_cursor < line_length) {
  //     result += text.slice(text_token, text_token + 1)
  //     line_cursor++
  //   } else {
  //     result += "\n"
  //     line_cursor = 0
  //   }
  //   text_token++
  // }

  while (text_token < text_length) {
    if (line_cursor === text_token) {
      // on a new line, so indent and reset skip counter.
      if (indent && text_token) {
        skip = indent_width
        result += indent_text
      } else {
        skip = 0
      }
    }
  
    if (text.substr(text_token, 1) === " ") space = text_token;
  
    if (skip + text_token - line_cursor >= line_length) {
      if (text_token - space < 15) {
        // line wrap instead of word wrap if no recent spaces.
        result += text.slice(line_cursor, space) + "\r"
        line_cursor = text_token = ++space
      } else {
        result += text.slice(line_cursor, text_token) + "\r"
        line_cursor = text_token
        space = text_token
        // position = space = text_token
      }
      continue
    }
    text_token++
  }
  
  if (line_cursor != text_token) result += text.slice(line_cursor, text_token) + "\r"

  // result = result.replace(/\r/gm, "\n")
  return result
};

// const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo quis metus sit amet sodales. Phasellus nisi diam, aliquam ut vehicula eget, pellentesque quis lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisi nulla, volutpat quis lorem in, lobortis iaculis sem. Nunc consectetur, eros et facilisis tristique, urna erat accumsan dolor, eget ornare augue magna et augue. In at ante non eros dapibus tempor tempus et purus. Aliquam rutrum, velit eu suscipit viverra, neque velit scelerisque nibh, ac malesuada leo nunc a sem. Sed efficitur ornare tempor. Donec in fermentum turpis. Donec nec vulputate turpis. Donec nec mauris dolor. Morbi mi est, commodo ac lorem et, maximus ultricies magna.

// Maecenas tincidunt semper velit, quis molestie tortor pulvinar quis. Vivamus ipsum nunc, vulputate et interdum eget, vulputate at nunc. Praesent et eros ante. Nam posuere neque ac urna placerat, vitae rhoncus velit gravida. Donec scelerisque dolor risus, sit amet condimentum magna luctus hendrerit. Vestibulum sollicitudin bibendum sem, eget rutrum orci luctus a. Integer rutrum elementum nibh, et tristique velit molestie a.

// Praesent fringilla enim elit, sit amet feugiat felis vestibulum sed. Praesent ut ex molestie, pharetra nunc sed, congue nunc. Nunc vulputate dignissim cursus. Suspendisse potenti. Sed quis tortor bibendum, lacinia dui vitae, malesuada orci. Praesent consequat faucibus volutpat. Aliquam vitae ultricies massa. Sed non felis blandit, auctor orci eget, sodales libero. Fusce ut nisi sit amet nisl aliquet pulvinar sed quis turpis. Aliquam ut magna diam. Duis egestas quam justo, in consequat odio ullamcorper non. Mauris vitae scelerisque felis. In sollicitudin ex libero, eget finibus lectus suscipit nec. Nunc luctus risus sapien. Phasellus quam lectus, pharetra non lacinia eu, porttitor at turpis.

// Mauris id viverra dui. Nam blandit augue id consectetur hendrerit. Aliquam at dui porta, posuere mi eu, vestibulum mauris. Aliquam arcu metus, pharetra et finibus et, faucibus et felis. Pellentesque mollis cursus est, vel consectetur ante venenatis sed. Donec in porttitor nisi. Proin vel porta sapien. Vivamus quis ligula tempor, pellentesque orci at, fringilla ex. Nulla volutpat, metus blandit rhoncus scelerisque, neque lacus mollis elit, a dapibus ipsum dolor nec mi. Ut at interdum purus, ac vehicula odio. Proin pharetra massa et justo tincidunt rhoncus.

// Sed non massa ac erat auctor auctor. Mauris ac mauris quam. Aenean porttitor nisi vel lectus laoreet tincidunt. Morbi efficitur, nulla et pharetra faucibus, justo eros ultrices est, sit amet laoreet odio odio sed augue. Duis tortor lacus, scelerisque eu pellentesque ut, feugiat quis mauris. Fusce porta urna at consequat mollis. Vivamus tincidunt dolor quis neque tempor condimentum eget vel libero. Pellentesque et tortor nulla. Ut arcu dui, dignissim sit amet euismod eu, consequat non sapien. Cras nec imperdiet est, nec dignissim velit.

// dèjà`

// const result = doWrap(text)
// console.log(result.wrapped.length)
// result.wrapped.forEach( text => {
//   console.log(text)
// })
