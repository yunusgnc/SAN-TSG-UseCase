import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      alert("Lütfen başlık ve içerik alanlarını doldurun!");
      return;
    }

    console.log("Yeni gönderi oluşturuldu:", formData);

    alert("Gönderi başarıyla oluşturuldu!");
    navigate("/posts");
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Yeni Gönderi Oluştur
            </h1>
            {user && (
              <p className="text-gray-600 mt-1">Hoş geldin, {user.name}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/posts")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Gönderilere Dön
            </button>
            <button
              onClick={() => nav.dashboard.go(navigate)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Başlık *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Gönderi başlığını girin..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  İçerik *
                </label>
                <textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Gönderi içeriğini girin..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                >
                  Gönderiyi Oluştur
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
