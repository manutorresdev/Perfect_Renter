import React from 'react'

export default function LoadingSkeleton () {
  return (
    <div className='flex gap-2  max-w-md my-2 bg-gray-100 rounded'>
      <div className='w-24 h-32 flex items-center justify-center '>
        <img
          className='animate-pulse rounded-t-lg opacity-75'
          src={require('../../Images/defProfile.png').default}
          alt='Loading Skeleton Img'
        />
      </div>
      <div className='flex flex-col relative gap-2 p-2 animate-pulse'>
        <div className='w-24 h-4 rounded bg-gray-Primary' />
        <div className='w-12 h-3 rounded bg-gray-400' />
        <div className='w-28 h-4 rounded bg-gray-Primary' />
        <div className='absolute bottom-2 w-24 h-3 rounded bg-gray-400' />
      </div>
      <div className='ml-auto my-auto w-14 h-6 bg-gray-Primary rounded animate-pulse' />
    </div>
  )
}

// Set styles
//   const imgStyle = `w-full rounded-t-lg h-full object-cover`;
//   const titleScoreStyle = `h-14 text-xs bg-gray-500 rounded-b-lg relative flex items-center`;
//   const movieCont = `w-52 m-2 h-auto text-white font-semibold flex flex-col `;
//   const titleStyle = `m-1 w-40`;
//   const scoreStyle = `bg-gray-600 ${VoteColor} flex items-center h-5 px-2 py-4 rounded absolute right-2 top-2 bottom-1`;
