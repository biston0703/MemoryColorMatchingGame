const $table = document.querySelector('.dot-field');
const $colorDots = document.getElementsByTagName('input');
const colors = {
  1: 'blue',
  2: 'pink',
  3: 'purple',
  4: 'turquoise'
}
const randomColor = {};
const checkedDots = [];
const addRandomColor = function() {
  this.classList.toggle(randomColor[this.id]);
}

function createElement(tag, className, type) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  if (type) {
    $tag.setAttribute('type', '' + type);
  }

  return $tag;
}

function createPlayingField($table) {
  for (let i = 0; i < 8; i++) {
    const $row = createElement('div', 'row');
    $table.appendChild($row);
    for (let j = 0; j < 8; j++) {
      const $dot = createElement('input', 'dot', 'checkbox');
      $row.appendChild($dot);
    }
  }

  for (let colorKey = 0; colorKey < $colorDots.length; colorKey++) {
    randomColor[colorKey] = colors[Math.ceil(Math.random() * 4)];
  }

  for (let dotKey = 0; dotKey < $colorDots.length; dotKey++) {

    $colorDots[dotKey].setAttribute('name', 'dot');
    $colorDots[dotKey].setAttribute('id', dotKey);
    $colorDots[dotKey].onclick = addRandomColor;
    $colorDots[dotKey].addEventListener('click', function() {
      $colorDots[dotKey].checked = checkedDots.push(dotKey);
      console.log(checkedDots);
      if (checkedDots.length > 1) {
        if (checkedDots[0] != checkedDots[1]
          && $colorDots[checkedDots[0]].className == $colorDots[checkedDots[1]].className) {
          setTimeout(function(){
            $colorDots[checkedDots[0]].removeAttribute('class');
            $colorDots[checkedDots[1]].removeAttribute('class');
            $colorDots[checkedDots[0]].classList.add('dot');
            $colorDots[checkedDots[1]].classList.add('dot');
            $colorDots[checkedDots[0]].classList.add('transparent');
            $colorDots[checkedDots[1]].classList.add('transparent');
            $colorDots[checkedDots[0]].setAttribute('disabled', 'disabled');
            $colorDots[checkedDots[1]].setAttribute('disabled', 'disabled');
            checkedDots.length = 0;
          }, 500);
        } else {
          setTimeout(function(){
            $colorDots[checkedDots[0]].removeAttribute('class');
            $colorDots[checkedDots[1]].removeAttribute('class');
            $colorDots[checkedDots[0]].classList.add('dot');
            $colorDots[checkedDots[1]].classList.add('dot');
            checkedDots.length = 0;
          }, 500);
        }
        console.log(checkedDots);
      }
    })

    }
  }

createPlayingField($table);
