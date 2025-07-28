import React from "react";
import { nav } from "../../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePosts, useDeletePost } from "../../hooks/usePosts";
import { useI18n } from "../../contexts/I18nContext";

const PostsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuthContext();
  const { t } = useI18n();
  const { data: posts, isLoading, error } = usePosts();
  const deletePostMutation = useDeletePost();

  const handleDelete = (postId: number) => {
    if (confirm(t("posts", "deleteConfirm"))) {
      deletePostMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">{t("posts", "postsLoading")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600">{t("posts", "postsError")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("posts", "title")}</h1>
            {user && (
              <p className="text-gray-600 mt-1">
                {t("common", "welcome")}, {user.name}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            {hasPermission('CREATE_POST') && (
              <button
                onClick={() => nav['create-post'].go(navigate)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {t("posts", "newPost")}
              </button>
            )}
            <button
              onClick={() => nav.dashboard.go(navigate)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("dashboard", "title")}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t("posts", "allPosts")}</h2>
            <div className="space-y-4">
              {posts?.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                      <p className="text-gray-600 mt-1">{post.body}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{t("common", "id")}: {post.id}</span>
                        <span>{t("common", "userId")}: {post.userId}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => nav['post-detail'].go(navigate, { postId: post.id.toString() })}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded"
                      >
                        {t("posts", "viewPost")}
                      </button>
                      {hasPermission('EDIT_POST') && (
                        <button
                          onClick={() => nav['post-detail'].go(navigate, { postId: post.id.toString() })}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm py-1 px-3 rounded"
                        >
                          {t("common", "edit")}
                        </button>
                      )}
                      {hasPermission('EDIT_POST') && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
                        >
                          {t("common", "delete")}
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