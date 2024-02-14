import React from 'react'
import Header from '../../layouts/header'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
