import { UserAuthForm, UserAuthFormMode } from "@/components/auth";
import AuthLayout from "@/components/shared/layouts/auth";
import Layout from "@/components/shared/layouts/sidebarmenu";
import Employees from "@/pages/employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<UserAuthForm />} />
      <Route path="/signup" element={<UserAuthForm mode={UserAuthFormMode.SignUp} />} />


        <Route element={<AuthLayout />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Employees />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Route>


    </Routes>
  </BrowserRouter>
  )
}

export default AppRouter