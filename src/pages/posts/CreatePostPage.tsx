import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useI18n } from "../../contexts/I18nContext";
import { useCreatePost } from "../../hooks/usePosts";
import Button from "../../components/Button";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { toast } from 'react-toastify';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { mutate: createPost, isPending } = useCreatePost();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost(
      { title, body },
      {
        onSuccess: () => {
          toast.success('Gönderi başarıyla oluşturuldu!');
          nav.dashboard.go(navigate);
        },
        onError: () => {
          toast.error('Gönderi oluşturulurken bir hata oluştu');
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => nav.dashboard.go(navigate)}
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
                disabled={isPending}
                className="flex items-center gap-1"
              >
                <FiPlus className="w-4 h-4" />
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
