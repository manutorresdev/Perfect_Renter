```jsx
<div className='flex gap-2  max-w-md my-2 bg-gray-100 rounded'>
  <div className='w-24 h-32 flex items-center justify-center '>
    <img
      className={'animate-pulse rounded-t-lg opacity-75'}
      src={require('../../Images/defProfile.png').default}
      alt={'Loading Skeleton Img'}
    />
  </div>
  <div className='flex flex-col relative gap-2 p-2 animate-pulse'>
    <div className='w-24 h-4 rounded bg-gray-Primary'></div>
    <div className='w-12 h-3 rounded bg-gray-400'></div>
    <div className='w-28 h-4 rounded bg-gray-Primary'></div>
    <div className='absolute bottom-2 w-24 h-3 rounded bg-gray-400'></div>
  </div>
  <div className='ml-auto my-auto w-14 h-6 bg-gray-Primary rounded animate-pulse'></div>
</div>
```
