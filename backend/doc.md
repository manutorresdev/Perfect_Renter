const sections = document.querySelectorAll('section');
const div = document.querySelector('#main');
const h1 = document.querySelector('.page-title');

div.innerHTML = `
${h1.outerHTML}
${sections[1].outerHTML}
`;
