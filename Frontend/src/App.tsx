import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Temporary placeholder components
const Dashboard = () => <div className="p-6"><h1 className="text-2xl font-bold text-zinc-100">Projects</h1></div>;
const Workspace = () => <div className="p-6"><h1 className="text-2xl font-bold text-zinc-100">Workspace</h1></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold text-zinc-100">Settings</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;