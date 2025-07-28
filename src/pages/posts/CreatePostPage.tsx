import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useI18n } from "../../contexts/I18nContext";
import { useCreatePost } from "../../hooks/usePosts";
import Button from "../../components/Button";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { mutate: createPost, isPending: creating } = useCreatePost();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentPosts = queryClient.getQueryData(['posts']) as any[];
    const newPost = {
      id: Date.now(),
      title,
      body,
      userId: 1
    };
    queryClient.setQueryData(['posts'], [newPost, ...currentPosts]);
    
    createPost(
      { title, body },
      {
        onSuccess: (createdPost) => {
          const posts = queryClient.getQueryData(['posts']) as any[];
          const updatedPosts = posts.map(post => 
            post.id === newPost.id ? createdPost : post
          );
          queryClient.setQueryData(['posts'], updatedPosts);
          
          toast.success(t("posts", "createSuccess"));
          nav.posts.go(navigate);
        },
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          toast.error(t("posts", "createError"));
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => nav.posts.back(navigate)}
            className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition"
            title={t("posts", "backToPosts")}
          >
            <FiArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          <h1 className="text-2xl font-bold text-blue-800">{t("posts", "createPost")}</h1>
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
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={creating}
                className="flex items-center gap-1"
              >
                <FiSave className="w-4 h-4" />
                {t("posts", "createPost")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
