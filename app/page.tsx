import React from 'react'
import FetchData from './fetch-data/page'
import CreateData from './create-data/page'
import MockApi from './mockapi/page'

const page = () => {
  return (
    <>
    <FetchData/>
    <CreateData/>
    </>
  )
}

export default page