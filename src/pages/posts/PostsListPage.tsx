import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePosts, useDeletePost } from "../../hooks/usePosts";
import { useI18n } from "../../contexts/I18nContext";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
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
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    postId: number | null;
    postTitle: string;
  }>({
    isOpen: false,
    postId: null,
    postTitle: "",
  });

  const filteredPosts =
    posts
      ?.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5) || [];

  const handleDeleteClick = (postId: number, postTitle: string) => {
    setDeleteModal({
      isOpen: true,
      postId,
      postTitle,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.postId) return;

    const currentPosts = queryClient.getQueryData(["posts"]) as any[];
    const updatedPosts = currentPosts.filter(
      (post) => post.id !== deleteModal.postId
    );
    queryClient.setQueryData(["posts"], updatedPosts);

    try {
      await deletePostMutation.mutateAsync(deleteModal.postId);
      toast.success(t("posts", "deleteSuccess"));
    } catch (error) {
      queryClient.setQueryData(["posts"], currentPosts);
      toast.error(t("posts", "deleteError"));
    }

    setDeleteModal({ isOpen: false, postId: null, postTitle: "" });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, postId: null, postTitle: "" });
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {t("posts", "postsList")}
            </h1>
            <p className="text-gray-600 text-lg">
              {t("posts", "postsCount", { count: filteredPosts.length })}
            </p>
          </div>
          {hasPermission("EDIT_POST") && (
            <Button
              variant="success"
              onClick={() => nav.createPost.go(navigate)}
              className="flex items-center gap-2 px-6 py-3"
            >
              <FiPlus className="w-5 h-5" />
              {t("posts", "createPost")}
            </Button>
          )}
        </div>

        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("posts", "searchPosts")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base line-clamp-3">
                    {post.body}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      nav.postDetail.go(navigate, {
                        postId: post.id.toString(),
                      })
                    }
                    className="p-3 rounded-xl hover:bg-blue-100 transition-colors"
                    title={t("posts", "viewDetails")}
                  >
                    <FiEye className="w-5 h-5 text-blue-600" />
                  </button>
                  {hasPermission("EDIT_POST") && (
                    <button
                      onClick={() =>
                        nav.editPost.go(navigate, {
                          postId: post.id.toString(),
                        })
                      }
                      className="p-3 rounded-xl hover:bg-green-100 transition-colors"
                      title={t("posts", "editPost")}
                    >
                      <FiEdit2 className="w-5 h-5 text-green-600" />
                    </button>
                  )}
                  {hasPermission("EDIT_POST") && (
                    <button
                      onClick={() => handleDeleteClick(post.id, post.title)}
                      className="p-3 rounded-xl hover:bg-red-100 transition-colors"
                      title={t("posts", "deletePost")}
                    >
                      <FiTrash2 className="w-5 h-5 text-red-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {t("common", "id")}: {post.id}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {t("common", "userId")}: {post.userId}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl">
              {searchTerm ? t("posts", "noPostsFound") : t("posts", "noPosts")}
            </p>
          </div>
        )}
      </div>
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={t("posts", "deletePost")}
        message={`"${deleteModal.postTitle}" ${t("posts", "deleteConfirm")}`}
        confirmText={t("posts", "delete")}
        cancelText={t("posts", "cancel")}
        variant="danger"
      />
    </div>
  );
};

export default PostsListPage;
