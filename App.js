import 'react-native-gesture-handler';
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./src/navigation/AppNav";
export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
