import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import FriendsPage from './pages/FriendsPage'
import SingleChat from './pages/SingleChat'
import ChatWindow from './components/ChatWindow'

const protectedRoutes = [
  {
    element: <ChatPage/>,
    path: '/chat',
    children: [
      {
        element: <SingleChat/>,
        path:'/chat/:id'
      },
      {
        element: <ChatWindow/>,
        path:'/chat'
      },
    ]
  },
  {
    element: <FriendsPage/>,
    path: '/friends',
    children: [
      {
        element: <SingleChat/>,
        path:'/friends/:id'
      },
      {
        element: <ChatWindow/>,
        path:'/friends'
      },
    ]
  },
]
const protectedRoutesMap = protectedRoutes
.map(route => <Route key={route.path} element={route.element} path={route.path}>
 {route.children && route.children
 .map(childRoute => <Route key={childRoute.path} element={childRoute.element} path={childRoute.path}/>) }
  </Route>)
const router = createBrowserRouter(createRoutesFromElements(
  <>
   <Route index element={<AuthPage/>}/> 
    <Route path='/login' element={<AuthPage/>}/>  
    <Route path='/' element={<Layout/>}>
      {protectedRoutesMap}
    </Route>
  </>
))

const App = () => {
  return (
      <RouterProvider router={router}/>
  )
}

export default App