import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { CreateFormData, put } from '../../Helpers/Api';
import EditAvatar from 'react-avatar-editor';

export default function Avatar({ setOverlay, avatar, usuario, Token }) {
  const [Error, setError] = useState('');
  const [FileName, setFileName] = useState('');
  const [ImgPreview, setImgPreview] = useState(null);
  const [Scale, setScale] = useState(1);
  const hiddenInput = useRef(null);
  const editedImg = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { ref, onChange, ...rest } = register('avatar', {
    required: 'Debes escoger una foto',
  });

  function uploadFile(body, e) {
    e.preventDefault();
    if (body.avatar[0]) {
      editedImg.current.getImageScaledToCanvas().toBlob((blob) => {
        const file = new File([blob], hiddenInput.current.files[0].name, {
          type: 'image/jpeg',
        });

        put(
          `http://192.168.5.103:4000/users/${usuario.idUser}`,
          CreateFormData({ avatar: file }),
          (data) => {
            console.log('Success');
            alert(data.message);
            window.location.reload();
          },
          (error) => {
            setError(error.message);
          },
          Token
        );
      }, 'image/jpeg');
    }
  }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = (d) => {
      if (reader.readyState === 2) {
        setImgPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  // const registerComponentStyle =
  //   Token &&
  //   'overlay z-10 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center py-32 overflow-scroll sm:overflow-hidden';

  return (
    <div className='overlay z-20 bg-gray-400 bg-opacity-75 fixed w-full h-full left-0 top-0 flex flex-col items-center px-12 py-24 overscroll-scroll sm:overflow-hidden'>
      <section className='contact pt-2 border-2 border-gray-700 flex flex-col items-center gap-5 bg-gray-100 relative text-principal-gris overflow-y-scroll md:w-3/4'>
        <button
          className='close-overlay absolute top-3 p-5 right-2'
          onClick={() => {
            setOverlay({ shown: false, info: {} });
          }}
        >
          <FaPlus className='transform scale-150 rotate-45' />
        </button>
        <h1 className='title text-3xl p-4 border-b-4 self-center border-gray-700 flex justify-center w-5/6 select-none'>
          Añadir avatar
        </h1>
        <p className='font-medium text-center'>
          Añade una foto de perfil para tener más oportunidades en las mejores
          viviendas.
        </p>
        <div className='contact-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
          <form
            className='flex flex-col gap-10 md:gap-3 pl-2 font-medium w-full pb-4'
            onSubmit={handleSubmit(uploadFile)}
          >
            <div className='flex flex-col gap-5'>
              <button
                className='font-medium flex items-center gap-2 bg-blue-600 text-white p-1 rounded'
                onClick={(e) => {
                  e.preventDefault();
                  hiddenInput.current.click();
                }}
              >
                <FaRegArrowAltCircleUp className='animate-bounce' />
                Selecciona un archivo
              </button>
              <input
                className='hidden'
                {...rest}
                onChange={(e) => {
                  onChange(e);
                  imageHandler(e);
                  setFileName(hiddenInput.current.files[0].name);
                }}
                ref={(e) => {
                  ref(e);
                  hiddenInput.current = e;
                }}
                type='file'
                name='avatar'
              />
            </div>
            {Error && (
              <p className='text-red-600 font-medium text-center'>{Error}</p>
            )}
            {errors.avatar && (
              <p className='text-red-600 font-medium text-center'>
                {errors.avatar.message}
              </p>
            )}
            {FileName && (
              <>
                <EditAvatar
                  image={ImgPreview}
                  ref={editedImg}
                  width={250}
                  height={250}
                  borderRadius={150}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={Scale}
                  rotate={0}
                />
                <input
                  type='range'
                  name='scale'
                  min='1'
                  max='3'
                  step='0.01'
                  onChange={(e) => {
                    setScale(e.target.value);
                  }}
                />
              </>
            )}
            <button
              type='submit'
              className='button font-medium select-none w-1/2 self-center text-center bg-principal-1 text-principal-gris border border-gray-400 text-black p-2 hover:bg-gray-200 hover:text-gray-600 transform ease-in duration-200 cursor-pointer'
            >
              Subir
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
