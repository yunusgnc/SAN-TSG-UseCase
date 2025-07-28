import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePosts, useDeletePost } from "../../hooks/usePosts";
import { useI18n } from "../../contexts/I18nContext";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FiEdit2, FiEye, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const PostsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { hasPermission } = useAuthContext();
  const { data: posts, isLoading, error } = usePosts();
  const deletePostMutation = useDeletePost();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (postId: number) => {
    if (window.confirm(t("posts", "deleteConfirm"))) {
      const currentPosts = queryClient.getQueryData(['posts']) as any[];
      const updatedPosts = currentPosts.filter(post => post.id !== postId);
      queryClient.setQueryData(['posts'], updatedPosts);
      
      try {
        await deletePostMutation.mutateAsync(postId);
        toast.success(t("posts", "deleteSuccess"));
      } catch (error) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        toast.error(t("posts", "deleteError"));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <LoadingSpinner message={t("posts", "postsLoading")} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <p className="text-red-600">{t("posts", "postsError")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
              {t("posts", "postsList")}
            </h1>
            <p className="text-center">
              {t("posts", "postsCount", { count: filteredPosts.length })}
            </p>
          </div>
          {hasPermission("EDIT_POST") && (
            <Button
              variant="success"
              onClick={() => nav.createPost.go(navigate)}
              className="flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              {t("posts", "createPost")}
            </Button>
          )}
        </div>

        {/* Arama */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("posts", "searchPosts")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-2 flex-1 mr-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => nav.postDetail.go(navigate, { postId: post.id.toString() })}
                    className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
                    title={t("posts", "viewDetails")}
                  >
                    <FiEye className="w-4 h-4 text-blue-600" />
                  </button>
                  {hasPermission("EDIT_POST") && (
                    <button
                      onClick={() => nav.editPost.go(navigate, { postId: post.id.toString() })}
                      className="p-2 rounded-lg hover:bg-green-100 transition-colors"
                      title={t("posts", "editPost")}
                    >
                      <FiEdit2 className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                  {hasPermission("EDIT_POST") && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                      title={t("posts", "deletePost")}
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {post.body}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{t("common", "id")}: {post.id}</span>
                <span>{t("common", "userId")}: {post.userId}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              {searchTerm ? t("posts", "noPostsFound") : t("posts", "noPosts")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsListPage; 