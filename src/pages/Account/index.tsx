import { Button } from '@mui/material'
import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { auth } from '../../firebase/utility'
import { useDispatch } from 'react-redux'
import { signOutUser } from '../../redux/User/user.actions'
import LogoutBtn from '../../components/Form/LogoutBtn'
import { Navigate, Route, Routes } from 'react-router-dom'
import AccountDetails from './AccountDetails'
import AccountCart from './AccountCart';
import AccountFavorite from './AccountFavorite';
import AccountOrderHistory from './AccountOrderHistory'

const Account = () => {

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="my-account" replace />} />
        <Route path="my-account" element={<AccountDetails />} />
        <Route path="order-history" element={<AccountOrderHistory />} />
        <Route path="cart" element={<AccountCart />} />
        <Route path="favorite" element={<AccountFavorite />} />
      </Routes>
    </DashboardLayout>
  )
}

export default Account