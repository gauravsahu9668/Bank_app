import React from 'react'
const HeaderBox = ({type="title",title,subtext,user}:HeaderBoxProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-36 lg:text-30 font-bold text-gray-900'>
        {title}
        {type === "greeting" && (
          <span className="text-[#0179FE] ml-1.5">
            {user}
          </span>
        )}
      </h1>
      <p className='text-16 font-normal text-gray-600'>{subtext}</p>    
    </div>
      
  )
}

export default HeaderBox
