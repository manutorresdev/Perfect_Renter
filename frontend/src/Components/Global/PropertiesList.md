```jsx
const sectionStyle =
  'h-max-content p-5 text-principal-1 overflow-y-auto bg-gray-Primary';
const sectionTitleStyle = 'pb-5 text-3xl font-medium';
const sectionImgStyle = 'w-2/5 float-right pl-3';
const boxContStyle = 'row-span-2 flex flex-col gap-5 b';
const boxContTitleStyle =
  'w-full text-center pt-4 pb-3 text-principal-1 underline text-xl';
const boxItemContStyle =
  'grid grid-cols-1 grid-rows-auto gap-2 justify-items-center sm:grid-cols-2';
const boxReadMoreBtnStyle =
  'm-auto text-xl bg-gray-Primary text-principal-1 border-2 border-gray-800 max-w-max px-6 py-2 hover:bg-principal-1 hover:text-gray-700 duration-300';
const descBoxStyle = 'content-center w-3/4 h-full bg-principal-1-hover';
const descBoxTextStyle = 'text-left p-4';
const descBoxTitleStyle = 'text-base text-gray-700 pb-3 font-medium';
const descBoxPStyle = 'text-gray-700 text-sm pl-2';

<section className={sectionStyle}>
  <h3 className={sectionTitleStyle}>Alquileres</h3>
  <img className={sectionImgStyle} src='flat.jpg' alt='' />
  <p className='text-justify'>
    Si tienes una vivienda y quieres ponerla en alquiler... ¡Te damos la
    bienvenida a Perfect Renter! Encontrarás personas interesadas en una
    vivienda vacacional y personas que lo que buscan es un hogar. Todas con un
    historial de votaciones que te ayudarán a tomar la mejor decisión. ¡Estamos
    aquí para que encuentres a tu inquilino perfecto!
  </p>
</section>;
```
