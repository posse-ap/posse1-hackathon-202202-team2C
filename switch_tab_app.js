'use strict';

function displaySelected(panel1,panel2,panel3,panel4,panel5,button){
  panel1.style.display = 'block';
  panel2.style.display = 'none';
  panel3.style.display = 'none';
  panel4.style.display = 'none';
  panel5.style.display = 'none';
  button.setAttribute('aria-selected',true);
}

function changeDisplay(element){
  const panel1 = document.getElementById('panel1');
  const panel2 = document.getElementById('panel2');
  const panel3 = document.getElementById('panel3');
  const panel4 = document.getElementById('panel4');
  const panel5 = document.getElementById('panel5');
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.setAttribute('aria-selected', false);
  })
  switch(element){
    case 'movie':
      displaySelected(panel1,panel2,panel3,panel4,panel5,buttons[0]);
      break;
    case 'book':
      displaySelected(panel2,panel1,panel3,panel4,panel5,buttons[1]);
      break;
    case 'music':
      displaySelected(panel3,panel1,panel2,panel4,panel5,buttons[2]);
      break;
    case 'game':
      displaySelected(panel4,panel1,panel2,panel3,panel5,buttons[3]);
      break;
    default:
      displaySelected(panel5,panel1,panel2,panel3,panel4,buttons[4]);
      break;
  }
}