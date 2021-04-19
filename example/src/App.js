import React, { useState, useEffect } from 'react'
import { ninja } from '@babbage/sdk'
export default () => {
  const [paymail, setPaymail] = useState('--')
  useEffect(() => {
    (async () => {
      setPaymail(await ninja.getPaymail())
    })()
  }, [])
  return <div><h1>Hello, {paymail}</h1></div>
}
