const $table = document.querySelector('.dot-field');
const $dots = document.getElementsByTagName('input');
const $colorDots = document.getElementsByClassName('dot');
const colors = {
  1: 'blue',
  2: 'pink',
  3: 'purple',
  4: 'turquoise'
}
const randomColor = {};
const checkedDots = [];
const transparentDots = [];
const addRandomColor = function() {
  this.classList.toggle(randomColor[this.id]);
}

function createElement(tag, className, type) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  if (type) {
    $tag.setAttribute('type', type);
  }
  return $tag;
}

function removeDisabledAttr($objects) {
  setTimeout(function(){
    for (var i = 0; i < $objects.length; i++) {
      $objects[i].removeAttribute('disabled');
    }
  }, 400);
}

function hideMatchedDots(array) {
  setTimeout(function(){
    while (array.length > 0) {
      $dots[array[0]].removeAttribute('class');
      $dots[array[0]].classList.add('transparent');
      $dots[array[0]].setAttribute('disabled', true);
      transparentDots.push(array[0]);
      array.shift();
    }
  }, 400);
}

function startMessage($table) {
  let $message = createElement('div', 'message');
  let $text = createElement('p');
  $message.classList.add('start');
  $text.innerHTML = 'Click any two dots.<br>If they have<br>the same color,<br>they disappear.<br>Otherwise, dots revert<br>to grey color.<br>Try to remove all the dots!';
  let $playButton = createElement('button');
  $playButton.innerHTML = 'Play';
  $playButton.setAttribute('onClick', 'createPlayingField($table);');
  $table.appendChild($message);
  $message.appendChild($text);
  $message.appendChild($playButton);

}

function finalMessage($table, win) {
  let $message = createElement('div', 'message');
  let $text = createElement('p');
  $message.classList.add('final');
  if (win == true) {
    $text.innerHTML = 'Turned out good!';
  } else {
    $text.innerHTML = 'No matches :(';
  }
  let $playAgainButton = createElement('button');
        $playAgainButton.setAttribute('onClick', 'window.location.reload();');
        $playAgainButton.innerHTML = 'Play again';
  setTimeout(function(){
    $table.appendChild($message);
    $message.appendChild($text);
    $message.appendChild($playAgainButton);
  }, 400);
}

function checkOutColors(array) {
  if ((array[0] !== array[1]) && (array[0] !== array[2]) && (array[0] !== array[3]) &&
    (array[1] !== array[2]) && (array[1] !== array[3]) && (array[2] !== array[3])) {
      return true;
    } else {
      return false;
    }
}

function createPlayingField($table) {
  let $message = document.querySelector('.message');
  $message.remove();
  for (let i = 0; i < 8; i++) {
    const $row = createElement('div', 'row');
    $table.appendChild($row);
    for (let j = 0; j < 8; j++) {
      const $dot = createElement('input', 'dot', 'checkbox');
      $row.appendChild($dot);
    }
  }

  for (let colorKey = 0; colorKey < $dots.length; colorKey++) {
    randomColor[colorKey] = colors[Math.ceil(Math.random() * 4)];
  }

  for (let dotKey = 0; dotKey < $dots.length; dotKey++) {

    $dots[dotKey].setAttribute('name', 'dot');
    $dots[dotKey].setAttribute('id', dotKey);
    $dots[dotKey].onclick = addRandomColor;
    $dots[dotKey].addEventListener('click', function() {
      $dots[dotKey].checked = checkedDots.push(dotKey);

      if (checkedDots.length == 2) {
        for (var g = 0; g < $dots.length; g++) {
          if (($dots[g] != checkedDots[0]) && ($dots[g] != checkedDots[1])) {
            $dots[g].setAttribute('disabled', true);
          }
        }

        removeDisabledAttr($colorDots);

        if (checkedDots[0] != checkedDots[1]
          && $dots[checkedDots[0]].className == $dots[checkedDots[1]].className) {
            hideMatchedDots(checkedDots);
        } else {
          setTimeout(function(){
            $dots[checkedDots[0]].removeAttribute('class');
            $dots[checkedDots[0]].classList.add('dot');
            $dots[checkedDots[1]].removeAttribute('class');
            $dots[checkedDots[1]].classList.add('dot');
            checkedDots.shift();
            checkedDots.shift();
          }, 400);
        }
      }
      console.log(checkedDots);

      let lastColors = [];
      let lastDots = document.getElementsByClassName('dot');

      for (var i = 0; i < lastDots.length; i++) {
        lastColors.push(randomColor[lastDots[i].id]);
      }
      console.log(lastColors);

      if (transparentDots.length >= 60) {

        let lastColors = [];
        let lastDots = document.getElementsByClassName('dot');

        for (var i = 0; i < lastDots.length; i++) {
          lastColors.push(randomColor[lastDots[i].id]);
        }
        console.log(lastColors);

        if (lastDots.length == 4) {
          if (checkOutColors(lastColors) == true) {
            if (checkedDots.length == 2) {
            finalMessage($table, false);
            lastDots[0] == lastDots[0].checked;
            lastDots[1] == lastDots[1].checked;
            lastDots[2] == lastDots[2].checked;
            lastDots[3] == lastDots[3].checked;
            lastDots[0] = addRandomColor;
            lastDots[1] = addRandomColor;
            lastDots[2] = addRandomColor;
            lastDots[3] = addRandomColor;
            lastDots[0].setAttribute('disabled', true);
            lastDots[1].setAttribute('disabled', true);
            lastDots[2].setAttribute('disabled', true);
            lastDots[3].setAttribute('disabled', true);
            }
          }
        } else if (lastDots.length == 2) {
          if (lastColors[0] !== lastColors[1]) {
            if (checkedDots.length == 2) {
            finalMessage($table, false);
            lastDots[0] == lastDots[0].checked;
            lastDots[1] == lastDots[1].checked;
            lastDots[0] = addRandomColor;
            lastDots[1] = addRandomColor;
            lastDots[0].setAttribute('disabled', true);
            lastDots[1].setAttribute('disabled', true);
          }
        } else {
          if (checkedDots.length == 2) {
          finalMessage($table, true);
        }
        }
        }
      }
    })
    }
  }

  startMessage($table);
