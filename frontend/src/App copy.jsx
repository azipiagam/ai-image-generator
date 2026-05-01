import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import ImageEditorPage from "./pages/ImageEditorPage";
import Layout from "./components/Layout";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout pageTitle="Gallery" pageSubtitle="Hasil generate tersimpan di server">
                  <Gallery />
                </Layout>
              }
            />
            <Route
              path="/image-editor"
              element={
                <Layout pageTitle="Image Editor" pageSubtitle="Edit gambar dengan AI">
                  <ImageEditorPage />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProtectedRoute>
    </AuthProvider>
  );
}