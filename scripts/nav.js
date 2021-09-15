function scrollToNavItem() {
  var path = window.location.href
    .split('/')
    .pop()
    .replace(/\.html/, '');
  document.querySelectorAll('nav a').forEach(function (link) {
    var href = link.attributes.href.value.replace(/\.html/, '');
    if (path === href) {
      link.scrollIntoView({ block: 'center' });
      return;
    }
  });
}

scrollToNavItem();
const sections = document.querySelectorAll('section');
const div = document.querySelector('#main');
const h1 = document.querySelector('.page-title');

div.innerHTML = `
  ${h1.outerHTML}
  ${sections[1].outerHTML}
  `;
