import { loginWithGoogle } from "../firebase/config";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-8">Pharmalntel Login</h1>
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
};