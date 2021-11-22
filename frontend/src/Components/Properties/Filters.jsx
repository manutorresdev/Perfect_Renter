import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import { useHistory } from 'react-router'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateRangePicker from '@mui/lab/DateRangePicker'
import { format } from 'date-fns'
import CalendarPickerSkeleton from '@mui/lab/CalendarPickerSkeleton'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import esEsLocale from 'date-fns/locale/es'

export default function Filters ({ setOverlay, Overlay }) {
  const pMinVal = useRef()
  const history = useHistory()
  const [TriggerDatePicker, setTriggerDatePicker] = useState(false)
  const [pickerValue, setPickerValue] = useState([null, null])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      orden: '',
      direccion: '',
      ciudad: '',
      provincia: '',
      tipo: '',
      pMin: '',
      pMax: '',
      hab: '',
      garaje: '',
      baños: '',
      m2: '',
      entrada: '',
      salida: ''
    }
  })

  function onSubmit (body, e) {
    e.preventDefault()

    const queryString = Object.keys(body)
      .filter((val) => {
        if (val === 'garaje' && body.garaje === true) {
          return body[val]
        } else {
          return body[val].length >= 1
        }
      })
      .map((key) => {
        if (key === 'garaje') {
          return `${key}=1`
        } else {
          return `${key}=${body[key]}`
        }
      })
      .join('&')

    if (history.location.pathname.length > 12) {
      history.replace('/alquileres?' + queryString)
    }
    history.push('?' + queryString)

    if (window.innerWidth <= 650) {
      setOverlay({ show: false })
    }
  }
  const inputsLabelStyle = 'text-lg duration-200'
  const inputStyle =
    'bg-black bg-opacity-70 w-48 p-3 placeholder-yellow-300  mix-blend-multiply text-principal-1 font-light text-lg'
  return (
    <>
      <div
        className={`transform ${
          Overlay.show
            ? 'translate-y-0 opacity-100 '
            : '-translate-y-full opacity-0'
        }  lg:translate-y-0 bg-yellow-300 lg:bg-white lg:opacity-100 bg-opacity-70 overlay z-20 w-full h-full fixed left-0 bottom-0 flex flex-col items-center pt-24 pb-14 overflow-scroll duration-300 lg:overflow-hidden lg:z-0 lg:mt-0 lg:static lg:py-10`}
      >
        <section className='filtros overflow-scroll overflow-x-hidden lg:overflow-hidden p-2 flex flex-col gap-5 w-10/12 md:w-full bg-white lg:bg-none relative'>
          <button
            className='close-overlay absolute top-3 right-3 lg:hidden'
            onClick={() => {
              setOverlay({ show: false, form: '' })
            }}
          >
            <FaPlus className='transform rotate-45 ' />
          </button>
          <h1 className='title self-center select-none font-semibold text-principal-gris text-2xl underline'>
            Filtros
          </h1>
          <div className='filters-card-container flex justify-around flex-col-reverse gap-10 sm:flex-row '>
            <form
              className='flex flex-col gap-y-3 p-2 items-center'
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>
                <select
                  name='orden'
                  defaultValue=''
                  {...register('orden')}
                  className={inputStyle}
                >
                  <option value=''>Filtrar por</option>
                  <option value='precio' className='font-medium'>
                    Precio
                  </option>
                  <option value='creacion' className='font-medium'>
                    Más recientes
                  </option>
                  <option value='valoraciones' className='font-medium'>
                    Valoraciones
                  </option>
                </select>
              </label>
              <label>
                <select
                  name='direccion'
                  {...register('direccion')}
                  className={inputStyle}
                >
                  <option value=''>Orden</option>
                  <option value='ASC' className='font-medium'>
                    Ascendente
                  </option>
                  <option value='DESC' className='font-medium'>
                    Descendente
                  </option>
                </select>
              </label>
              <LocalizationProvider
                locale={esEsLocale}
                dateAdapter={AdapterDateFns}
              >
                <DateRangePicker
                  disablePast
                  label='Advanced keyboard'
                  value={pickerValue}
                  open={TriggerDatePicker}
                  onClose={() => {
                    setTriggerDatePicker(false)
                  }}
                  renderLoading={() => <CalendarPickerSkeleton />}
                  inputFormat='dd/MM/yyyy'
                  onChange={(newValue) => {
                    if (
                      new Date(newValue[0]).getTime() >
                      new Date(newValue[1]).getTime()
                    ) {
                      console.error(
                        'Fecha de entrada mayor a fecha de salida.'
                      )
                    } else if (
                      new Date(newValue[0]).getTime() ===
                      new Date(newValue[1]).getTime()
                    ) {
                      console.error('Selecciona fechas diferentes.')
                    } else {
                      console.warn('FECHAS CORRECTAS')
                      setPickerValue(newValue)
                      if (
                        newValue[0] &&
                        !isNaN(newValue[0].getTime()) &&
                        newValue[1] &&
                        !isNaN(newValue[1].getTime())
                      ) {
                        setValue('entrada', format(newValue[0], 'yyyy/MM/dd'))
                        setValue('salida', format(newValue[1], 'yyyy/MM/dd'))
                        setTriggerDatePicker(false)
                      }
                    }
                  }}
                  renderInput={(startProps, endProps) => (
                    <div className='flex flex-col w-full justify-start '>
                      <label
                        onClick={(e) => {
                          setTriggerDatePicker(true)
                        }}
                        className='flex flex-col w-full justify-start '
                      >
                        <span className={inputsLabelStyle}>
                          Fecha de entrada:
                        </span>
                        <input
                          className={inputStyle}
                          name='startDate'
                          autoComplete='off'
                          ref={startProps.inputRef}
                          {...startProps.inputProps}
                        />
                      </label>
                      <label
                        onClick={(e) => {
                          setTriggerDatePicker(true)
                        }}
                        className='flex flex-col w-full justify-start'
                      >
                        <span className={inputsLabelStyle}>
                          Fecha de salida:
                        </span>
                        <input
                          className={inputStyle}
                          name='endDate'
                          autoComplete='off'
                          ref={endProps.inputRef}
                          {...endProps.inputProps}
                        />
                      </label>
                    </div>
                  )}
                />
              </LocalizationProvider>
              <div className='flex flex-col gap-2 text-l'>
                <div className={inputsLabelStyle}>Ciudad:</div>
                <label className='city'>
                  <input
                    defaultValue={Filters.ciudad ?? ''}
                    {...register('ciudad', {
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                        message:
                          'La ciudad no puede contener caracteres especiales ni números.'
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'La ciudad no puede tener más de 50 caracteres.'
                      }
                    })}
                    type='text'
                    name='ciudad'
                    className={inputStyle}
                    placeholder='Ciudad'
                  />
                  {errors.city && (
                    <p className='text-red-500'>{errors.city.message}</p>
                  )}
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <div className={inputsLabelStyle}>Provincia:</div>
                <label className='province'>
                  <input
                    {...register('provincia', {
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                        message:
                          'La provincia no puede contener carácteres especiales ni números.'
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'La provincia no puede tener más de 50 carácteres.'
                      }
                    })}
                    type='text'
                    name='provincia'
                    className={inputStyle}
                    placeholder='Provincia'
                  />
                </label>
              </div>
              <div className='flex flex-col justify-center'>
                <div className={`${inputsLabelStyle}`}>Tipo de vivienda:</div>
                <label className='flex gap-2 items-baseline justify-between font-medium'>
                  Piso
                  <input
                    type='checkbox'
                    name='tipo'
                    value='piso'
                    {...register('tipo')}
                    defaultChecked={history.location.search.includes('piso')}
                  />
                </label>
                <label className='flex gap-2 items-baseline justify-between font-medium'>
                  Casa
                  <input
                    type='checkbox'
                    name='tipo'
                    value='casa'
                    defaultChecked={history.location.search.includes('casa')}
                    {...register('tipo')}
                  />
                </label>
                <label className='flex gap-2 items-baseline justify-between font-medium'>
                  Dúplex
                  <input
                    type='checkbox'
                    name='tipo'
                    value='duplex'
                    {...register('tipo')}
                    defaultChecked={history.location.search.includes('duplex')}
                  />
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='minPrice relative'>
                  <div className={inputsLabelStyle}>Precio Mínimo:</div>
                  <input
                    ref={pMinVal}
                    min='1'
                    maxLength={5}
                    max='10000'
                    {...register('pMin', {
                      pattern: {
                        value: /^([0-9]*){5,}$/,
                        message: 'Debe contener solo números.'
                      }
                    })}
                    name='pMin'
                    className={inputStyle}
                    placeholder='Mínimo'
                  />
                  <span className='text-xl text-principal-1 absolute top-8 pt-1 right-4'>
                    €
                  </span>
                  {errors.pMin && (
                    <p className='text-red-500 font-medium'>
                      {errors.pMin.message}
                    </p>
                  )}
                </label>
                <label className='maxPrice relative'>
                  <div className={inputsLabelStyle}>Precio Máximo:</div>
                  <input
                    {...register('pMax', {
                      pattern: {
                        value: /^([0-9]*){5,}$/,
                        message: 'Debe contener solo números.'
                      }
                    })}
                    min='1'
                    maxLength={5}
                    max='10000'
                    name='pMax'
                    className={inputStyle}
                    placeholder='Máximo'
                  />
                  <span className='text-xl text-principal-1 absolute top-8 pt-1 right-4'>
                    €
                  </span>
                  {errors.pMax && (
                    <p className='text-red-500 font-medium'>
                      {errors.pMin.message}
                    </p>
                  )}
                </label>
              </div>
              <label className='rooms'>
                <div className={inputsLabelStyle}>Habitaciones:</div>
                <input
                  {...register('hab')}
                  type='number'
                  name='hab'
                  maxLength={2}
                  min='1'
                  max='10'
                  className={inputStyle}
                  placeholder='Habitaciones'
                />
              </label>
              <label className='parking w-1/2 justify-between font-medium sm:w-full flex flex-row items-center'>
                <div className={`${inputsLabelStyle}`}>Garaje:</div>
                <input
                  {...register('garaje')}
                  type='checkbox'
                  name='garaje'
                  placeholder='Garaje'
                />
              </label>
              <label className='toilets'>
                <div className={inputsLabelStyle}>Baños: </div>
                <input
                  {...register('baños')}
                  min='1'
                  max='10'
                  maxLength={2}
                  type='number'
                  name='baños'
                  className={inputStyle}
                  placeholder='Baños'
                />
              </label>
              <label className='mts'>
                <div className={inputsLabelStyle}>Metros:</div>
                <input
                  {...register('m2')}
                  min='1'
                  max='1000'
                  maxLength={4}
                  type='number'
                  name='m2'
                  className={inputStyle}
                  placeholder='Metros'
                />
              </label>
              <div className='flex justify-center items-center self-center sticky -bottom-1 w-full h-28 bg-white lg:bg-transparent'>
                <input
                  type='submit'
                  value='Buscar'
                  className='btn-submit text-lg bg-none px-4 cursor-pointer font-medium text-principal-gris border-yellow-300 border-2 h-1/3 hover:bg-gray-Primary bg-principal-1 hover:border-white hover:text-principal-1 duration-300'
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}
