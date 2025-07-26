import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    const dummyUser = {
      name: 'John Doe',
      permissions: ['VIEW_POSTS', 'VIEW_COMMENTS']
    };
    
    console.log('Kullanıcı giriş yaptı:', dummyUser);
    
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Giriş Yap
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Dummy Kullanıcı ile Giriş Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 