import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PATH } from "./routes/path"
import SignIn from "./modules/auth/SignIn/SignIn"
import User from "./modules/user/User"
import NotFound from "./modules/not-found/NotFound"
import Profile from "./modules/user/Profile/Profile"
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout"
import { UserProvider } from "./contexts/UserContext/UserContext"
import ShowProfile from "./modules/user/ShowProfile"

function App() {

  return (
    <UserProvider>
   <BrowserRouter>
    <Routes>
      <Route path={PATH.SIGN_IN}>
      <Route
      index
      element= {<SignIn/>}
      />
      <Route
      path={PATH.DASHBOARD}
      element ={<DashboardLayout/>}
      >
        <Route
        index 
        element={<User/>}
        />
        <Route
        path={PATH.PROFILE}
        element={<Profile/>}
        />
           <Route
        path={PATH.PROFILE_VIEW}
        element={<ShowProfile/>}
        />
        </Route>

        <Route
            path="*"
            element={<NotFound/>}
          />
      </Route>
    </Routes>
   </BrowserRouter>
   </UserProvider>
  )
}

export default App
