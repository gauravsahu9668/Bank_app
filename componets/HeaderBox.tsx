import React from 'react'
const HeaderBox = ({type="title",title,subtext,user}:HeaderBoxProps) => {
  return (
    <div className=''>
      <h1 className=''>
        {title}
        {type==="greeting" && (
            <span className="text-[#0179FE]">
                {user}
            </span>
        ) }
      </h1>
      <p className=''>{subtext}</p>    
    </div>
  )
}

export default HeaderBox
