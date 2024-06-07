
import { useState } from "react"
import Contextstate from "./Contextstate"
const Contextvalue = (props) => {
    const [userDetails,setUserDetails] = useState([])
    const addUserDetail = (detail) => {
      setUserDetails((prevUserDetails) => [...prevUserDetails, detail]);
    };
  return (
    <div>
        <Contextstate.Provider value={{userDetails,addUserDetail}}>
        {props.children}
        </Contextstate.Provider>
      
    </div>
  )
}

export default Contextvalue
