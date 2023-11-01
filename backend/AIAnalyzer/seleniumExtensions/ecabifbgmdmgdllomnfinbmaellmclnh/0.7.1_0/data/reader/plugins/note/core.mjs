/**
    Reader View - Strips away clutter

    Copyright (C) 2014-2022 [@rNeomy](https://add0n.com/chrome-reader-view.html)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Mozilla Public License as published by
    the Mozilla Foundation, either version 2 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Mozilla Public License for more details.
    You should have received a copy of the Mozilla Public License
    along with this program.  If not, see {https://www.mozilla.org/en-US/MPL/}.

    GitHub: https://github.com/rNeomy/reader-view/
    Homepage: https://add0n.com/chrome-reader-view.html
*/

/* global iframe, args, Behave, ready */

const notes = {};
const key = 'notes:' + args.get('url').split('#')[0];

const add = (id, {content, type, box}, active = false) => {
  const doc = iframe.contentDocument;

  type = isNaN(type) ? Math.floor(5 * Math.random()) : type;

  box = box || {
    left: Math.round(400 + (Math.random() - 0.5) * 300),
    top: doc.documentElement.scrollTop + Math.round(400 + (Math.random() - 0.5) * 300),
    width: 300,
    height: 300
  };

  let timeout;
  const save = () => {
    notes[id] = {
      date: Date.now(),
      box,
      type,
      content: textarea.value
    };

    // only save notes with content
    chrome.storage.local.set({
      [key]: Object.entries(notes).filter(([, o]) => o.content.trim()).reduce((p, [id, o]) => {
        p[id] = o;
        return p;
      }, {})
    });
  };
  const tick = () => {
    if (tick.active) {
      clearTimeout(timeout);
      timeout = setTimeout(save, 200);
    }
    else {
      clearTimeout(timeout);
    }
  };
  tick.active = true;

  const textarea = doc.createElement('textarea');
  textarea.classList.add('note');
  textarea.title = textarea.placeholder = `Instruction:


Delete: Press "ESC" when note is focused
Color: Press "Alt + Number" or "Option + Number"
`;
  textarea.style = `
    width: ${box.width}px;
    height: ${box.height}px;
    left: ${box.left}px;
    top: ${box.top}px;
  `;
  textarea.value = content;
  textarea.setAttribute('type', type);

  const resizeObserver = new ResizeObserver(() => {
    box.width = Math.max(32, parseInt(getComputedStyle(textarea).width));
    box.height = Math.max(32, parseInt(getComputedStyle(textarea).height));

    tick();
  });
  resizeObserver.observe(textarea);

  textarea.onkeypress = tick;

  textarea.onkeydown = e => {
    if (e.code === 'Escape') {
      e.stopPropagation();

      if (textarea.value === '' || confirm('Permanently remove this note?')) {
        tick.active = false;
        delete notes[id];
        chrome.storage.local.set({
          [key]: notes
        }, () => textarea.remove());
      }
    }
    else if (e.code.startsWith('Digit') && e.altKey) {
      type = Number(e.code.replace('Digit', '')) % 5;

      textarea.setAttribute('type', type);
      e.preventDefault();
      tick();
    }
  };

  textarea.onmousedown = ed => {
    if ((box.width - ed.layerX < 10) && (box.height - ed.layerY < 10)) {
      return; // resize
    }
    const dx = ed.clientX - box.left;
    const dy = ed.clientY - box.top;

    const padding = doc.body.getBoundingClientRect().left;

    const move = e => {
      box.left = Math.min(Math.max(-padding, e.clientX - dx), doc.body.offsetWidth - box.width + padding);
      box.top = Math.max(0, e.clientY - dy);
      textarea.style.left = box.left + 'px';
      textarea.style.top = box.top + 'px';
      tick();
    };
    const done = () => {
      doc.removeEventListener('mousemove', move);
      doc.removeEventListener('mouseup', done);
    };

    doc.addEventListener('mousemove', move);
    doc.addEventListener('mouseup', done);
  };

  new Behave({
    textarea
  });

  iframe.contentDocument.body.appendChild(textarea);
  if (active) {
    textarea.focus();
  }
};

const observe = () => {
  const id = Math.random().toString(36).substring(7);
  add(id, {
    content: ''
  }, true);
};

function enable() {
  const styles = document.createElement('style');
  styles.id = 'note-styling';
  styles.textContent = `
    .note {
      position: absolute;
      z-index: 10;
      border: none;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      padding: 5px;
      min-width: 32px;
      min-height: 32px;
    }
    .note:focus {
      z-index: 11;
    }
    .note[type="0"] {
      background-color: #fff740;
      color: #2c2c2d;
    }
    .note[type="0"]::placeholder {
      color: #868226;
    }
    .note[type="1"] {
      background-color: #feff9c;
      color: #2c2c2d;
    }
    .note[type="1"]::placeholder {
      color: #6d6d3d;
    }
    .note[type="2"] {
      background-color: #ff65a3;
      color: #2c2c2d;
    }
    .note[type="2"]::placeholder {
      color: #65263f;
    }
    .note[type="3"] {
      background-color: #ff7eb9;
      color: #2c2c2d;
    }
    .note[type="3"]::placeholder {
      color: #562b3f;
    }
    .note[type="4"] {
      background-color: #7afcff;
      color: #295c5d;
    }
    .note[type="4"]::placeholder {
      color: #377677;
    }`;

  document.addEventListener('add-note', observe);

  ready().then(() => {
    iframe.contentDocument.body.append(styles);

    const s = document.createElement('script');
    s.onload = () => {
      chrome.storage.local.get({
        [key]: {}
      }, prefs => {
        for (const [id, note] of Object.entries(prefs[key])) {
          add(id, note);
        }
      });
    };
    s.src = '/data/reader/plugins/note/behave.js';
    document.body.appendChild(s);
  });
}
function disable() {
  document.removeEventListener('add-note', observe);
  document.getElementById('note-styling').remove();
}

export {
  enable,
  disable
};
