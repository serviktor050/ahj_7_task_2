export default function initData() {
  const params = new URLSearchParams();
  params.append('small-description', 'Поменять краску в принтере, ком. 404');
  params.append('full-description', 'Принтер HP LJ 1210, катриджи на складе');

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://ahj-7-task-1.herokuapp.com');
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log('Error');
    }
  });
  xhr.send(params);
}
