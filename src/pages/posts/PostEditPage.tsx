import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useI18n } from "../../contexts/I18nContext";
import { usePost, useUpdatePost, useDeletePost } from "../../hooks/usePosts";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { FiArrowLeft, FiSave, FiTrash2 } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useQueryClient } from "@tanstack/react-query";

const PostEditPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { data: post, isLoading, error } = usePost(Number(postId));
  const { mutate: updatePost, isPending: saving } = useUpdatePost();
  const { mutate: deletePost, isPending: deleting } = useDeletePost();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentPosts = queryClient.getQueryData(['posts']) as any[];
    if (currentPosts && Array.isArray(currentPosts)) {
      const updatedPosts = currentPosts.map(post => 
        post.id === Number(postId) ? { ...post, title, body } : post
      );
      queryClient.setQueryData(['posts'], updatedPosts);
    }
    
    updatePost(
      { id: Number(postId), data: { title, body } },
      {
        onSuccess: () => {
          toast.success('Gönderi başarıyla güncellendi!');
          nav.postDetail.go(navigate, { postId: postId! });
        },
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          toast.error('Gönderi güncellenirken bir hata oluştu');
        }
      }
    );
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const currentPosts = queryClient.getQueryData(['posts']) as any[];
    if (currentPosts && Array.isArray(currentPosts)) {
      const updatedPosts = currentPosts.filter(post => post.id !== Number(postId));
      queryClient.setQueryData(['posts'], updatedPosts);
    }
    
    deletePost(Number(postId), {
      onSuccess: () => {
        toast.success(t("posts", "deleteSuccess"));
        nav.posts.go(navigate);
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        toast.error(t("posts", "deleteError"));
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common", "loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <p className="text-red-600">{t("posts", "postError")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition"
            title={t("posts", "backToPosts")}
          >
            <FiArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          <h1 className="text-2xl font-bold text-blue-800">{t("posts", "editPost")}</h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                {t("posts", "title")}
              </label>
              <input
                type="text"
                className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={t("posts", "titlePlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                {t("posts", "body")}
              </label>
              <textarea
                className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={5}
                placeholder={t("posts", "bodyPlaceholder")}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="danger"
                size="md"
                onClick={handleDeleteClick}
                disabled={deleting}
                className="flex items-center gap-1"
              >
                <FiTrash2 className="w-4 h-4" />
                {t("posts", "deletePost")}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving}
                className="flex items-center gap-1"
              >
                <FiSave className="w-4 h-4" />
                {t("posts", "save")}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title={t("modal", "deleteTitle")}
        message={t("modal", "deleteMessage")}
        confirmText={t("modal", "confirmDelete")}
        cancelText={t("modal", "cancel")}
        variant="danger"
      />
    </div>
  );
};

export default PostEditPage;
