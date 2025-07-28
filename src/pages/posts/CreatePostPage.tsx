import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreatePost } from "../../hooks/usePosts";
import { useI18n } from "../../contexts/I18nContext";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { t } = useI18n();
  const createPostMutation = useCreatePost();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      alert(t("posts", "fillRequired"));
      return;
    }

    createPostMutation.mutate(
      {
        title: formData.title,
        body: formData.body,
        userId: 1,
      },
      {
        onSuccess: () => {
          alert(t("posts", "createSuccess"));
          navigate("/posts");
        },
      }
    );
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
              {t("posts", "createPost")}
            </h1>
            {user && (
              <p className="text-gray-600 mt-1">
                {t("common", "welcome")}, {user.name}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/posts")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("posts", "backToPosts")}
            </button>
            <button
              onClick={() => nav.dashboard.go(navigate)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("dashboard", "title")}
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
                  {t("posts", "postTitle")} *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("posts", "titlePlaceholder")}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("posts", "postContent")} *
                </label>
                <textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("posts", "contentPlaceholder")}
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                >
                  {t("posts", "createPost")}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
                >
                  {t("common", "cancel")}
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
