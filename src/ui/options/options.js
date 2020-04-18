// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const page = document.getElementById("buttonDiv");

( colors => {
  colors.forEach( color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => {
      chrome.storage.sync.set({color: color}, () => {
        console.log('color is ' + color);
      })
    });
    
    page.appendChild(button);
  })
}) ( ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'] )
