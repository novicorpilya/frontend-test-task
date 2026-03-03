import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartsPage } from './pages/CartsPage';
import { CartDetailPage } from './pages/CartDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Редирект с пустого пути на список */}
          <Route index element={<Navigate to="/carts" replace />} />
          <Route path="carts" element={<CartsPage />} />
          <Route path="carts/:id" element={<CartDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
