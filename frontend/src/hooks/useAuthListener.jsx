// import { useEffect, useState, useRef } from "react"
// import { getAuth, onAuthStateChanged } from "firebase/auth"
// import { toast } from "react-toastify"
// import { useDispatch } from "react-redux"
// import { getProfile, reset, setUser } from "../features/auth/authSlice"

// export const useAuthListener = () => {
//   const dispatch = useDispatch()
//   const isMounted = useRef(true)
//   useEffect(() => {
//     if (isMounted) {
//       const auth = getAuth()
//       onAuthStateChanged(auth, (user) => {
//         console.log("auth called")
//         if (user) {
//           dispatch(getProfile(user.uid))
//         }
//         dispatch(reset())
//       })
//     }
//     return () => {
//       isMounted.current = false
//     }
//   }, [isMounted])
  
// }
