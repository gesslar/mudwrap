// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
const page = document.getElementById("buttonDiv");

function constructOptions(kButtonColors) {
  for (const item of kButtonColors) {
    const button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', () => {
      chrome.storage.sync.set({color: item}, () => {
        console.log('color is ' + item);
      })
    });
    
    page.appendChild(button);
  }
}

constructOptions(kButtonColors);
