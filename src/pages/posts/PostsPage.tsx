import React from "react";
import { nav } from "../../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const PostsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuthContext();

  const posts = [
    { id: 1, title: 'İlk Gönderi', body: 'Bu ilk gönderinin içeriği...', userId: 1 },
    { id: 2, title: 'İkinci Gönderi', body: 'Bu ikinci gönderinin içeriği...', userId: 1 },
    { id: 3, title: 'Üçüncü Gönderi', body: 'Bu üçüncü gönderinin içeriği...', userId: 1 },
    { id: 4, title: 'Dördüncü Gönderi', body: 'Bu dördüncü gönderinin içeriği...', userId: 1 },
    { id: 5, title: 'Beşinci Gönderi', body: 'Bu beşinci gönderinin içeriği...', userId: 1 },
  ];

  const handleEdit = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const handleDelete = (postId: number) => {
                  if (confirm('Bu gönderiyi silmek istediğinizden emin misiniz?')) {
                console.log('Gönderi silindi:', postId);
              }
  };

  const handleView = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gönderiler</h1>
            {user && (
              <p className="text-gray-600 mt-1">
                Hoş geldin, {user.name}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            {hasPermission('CREATE_POST') && (
              <button
                onClick={() => navigate('/posts/create')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Yeni Gönderi
              </button>
            )}
            <button
              onClick={() => nav.dashboard.go(navigate)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tüm Gönderiler</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                      <p className="text-gray-600 mt-1">{post.body}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>ID: {post.id}</span>
                        <span>User ID: {post.userId}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleView(post.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded"
                      >
                        Görüntüle
                      </button>
                      {hasPermission('EDIT_POST') && (
                        <button
                          onClick={() => handleEdit(post.id)}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm py-1 px-3 rounded"
                        >
                          Düzenle
                        </button>
                      )}
                      {hasPermission('EDIT_POST') && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
                        >
                          Sil
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage; 