import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePost, useUpdatePost } from "../../hooks/usePosts";
import { useComments } from "../../hooks/useComments";
import { useI18n } from "../../contexts/I18nContext";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"edit" | "comments">("edit");

  const postIdNumber = parseInt(postId || "1");
  const { data: post, isLoading: postLoading, error: postError } = usePost(postIdNumber);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments(postIdNumber);
  const updatePostMutation = useUpdatePost();

  const [editForm, setEditForm] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (post) {
      setEditForm({
        title: post.title,
        body: post.body,
      });
    }
  }, [post]);

  if (postLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">{t("posts", "postLoading")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600">{t("posts", "postError")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (post) {
      updatePostMutation.mutate(
        { id: post.id, data: editForm },
        {
          onSuccess: () => {
            alert(t("posts", "saveSuccess"));
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setEditForm({ title: post.title, body: post.body });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("posts", "title")} #{postId}
            </h1>
            {user && (
              <p className="text-gray-600 mt-1">{t("common", "welcome")}, {user.name}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => nav.posts.go(navigate)}
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

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("edit")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "edit"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {t("posts", "editPost")}
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "comments"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {t("comments", "postComments")}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "edit" ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {t("posts", "editPost")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("posts", "postTitle")}
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("posts", "postContent")}
                    </label>
                    <textarea
                      value={editForm.body}
                      onChange={(e) =>
                        setEditForm({ ...editForm, body: e.target.value })
                      }
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {t("common", "save")}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {t("common", "cancel")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {t("comments", "postComments")}
                </h2>
                <div className="space-y-4">
                  {commentsLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-gray-600">{t("comments", "commentsLoading")}</p>
                    </div>
                  ) : commentsError ? (
                    <div className="text-center py-4">
                      <p className="text-red-600">{t("comments", "commentsError")}</p>
                    </div>
                  ) : (
                    comments?.map((comment: any) => (
                      <div
                        key={comment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">
                                {comment.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({comment.email})
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.body}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
