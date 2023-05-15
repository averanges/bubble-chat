import { useState } from "react"
import { placeholderTexts } from "../consts/placeholders"

const useHandleForm = () => {
    const [onBlurOn, setOnBlurOn] = useState ({
        name: null,
        email: null,
        psw: null,
        confirmPsw: null
      })
      const [placeholders, setPlaceholders] = useState({
          email: placeholderTexts.email,
          name: placeholderTexts.name,
          psw: placeholderTexts.psw,
          confirmPsw: placeholderTexts.confirmPsw
    })
      const handleBlur = (e) => {
        setPlaceholders(prevPlaceholder => {
          return {...prevPlaceholder, [e.target.name]: placeholderTexts[e.target.name]}})
        setOnBlurOn(prevOnBlur => {
          return {...prevOnBlur, [e.target.name]: true}})
      } 
      const handleFocus = (e) => {
        setPlaceholders(prevPlaceholder => {
          return {...prevPlaceholder, [e.target.name]: ''}})
        setOnBlurOn(prevOnBlur => {
          return {...prevOnBlur, [e.target.name]: false}})
      }
    return {onBlurOn, placeholders, handleBlur, handleFocus}
}

export default useHandleForm