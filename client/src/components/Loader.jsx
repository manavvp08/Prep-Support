import React from 'react'

function Loader() {
  return (
<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
<span className="loading loading-spinner loading-lg"></span>
</div>
  )
}

export default Loader