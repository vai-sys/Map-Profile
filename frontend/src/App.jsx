

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider";
// import Login from "./pages/Login";
// import AdminPanel from "./pages/AdminPanel";
// import ProtectedRoute from "./component/ProtectedRoute"; 
// import Register from "./pages/Register";
// import AdminProfilePage from "./pages/AdminProfilePage";
// import AdminEdit from "./pages/AdminEdit";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                <AdminProfilePage/>
//               </ProtectedRoute>
//             }
//           />
//           {/* <Route path="/admin-profile"  element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminProfilePage/>
//             </ProtectedRoute>
//           }   /> */}

//           <Route  path="admin-edit"  element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//             <AdminEdit/>
//           </ProtectedRoute>

//           } />
        
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./component/ProtectedRoute";
import Register from "./pages/Register";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminEdit from "./pages/AdminEdit";
import CreateProfile from "./pages/CreateProfile"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEdit />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;