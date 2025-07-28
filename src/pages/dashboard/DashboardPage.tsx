import React from "react";
import { nav } from "../../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useI18n } from "../../contexts/I18nContext";
import { usePosts } from "../../hooks/usePosts";
import { useAllComments } from "../../hooks/useComments";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../components/Button";
import { FiEdit2, FiEye, FiFileText, FiMessageSquare } from "react-icons/fi";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuthContext();
  const { t } = useI18n();
  const { data: posts, isLoading: postsLoading } = usePosts();
  const { data: allComments, isLoading: commentsLoading } = useAllComments();

  const recentPosts = posts ? posts.slice(0, 5) : [];
  const recentComments = allComments ? allComments.slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
              {t("dashboard", "title")}
            </h1>
            {user && (
              <p className="text-base text-gray-600">
                {t("dashboard", "welcome")},{" "}
                <span className="font-bold text-gray-800">{user.name}</span>
              </p>
            )}
          </div>
          {hasPermission("EDIT_POST") && (
            <Button
              variant="success"
              onClick={() => nav.createPost.go(navigate)}
              size="sm"
              className="px-4 py-2"
            >
              {t("posts", "createPost")}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/90 rounded-xl shadow border border-blue-100 p-4">
            <h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                <FiFileText className="w-4 h-4 text-white" />
              </div>
              {t("dashboard", "recentPosts")}
            </h2>
            <div className="space-y-2">
              {postsLoading ? (
                <LoadingSpinner
                  message={t("dashboard", "postsLoading")}
                  size="sm"
                />
              ) : recentPosts.length === 0 ? (
                <div className="text-gray-400 text-center py-4">
                  {t("posts", "postsError")}
                </div>
              ) : (
                recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-blue-50 rounded p-2 border border-blue-100 hover:shadow transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 text-xs mr-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => nav.postDetail.go(navigate, { postId: post.id.toString() })}
                          className="p-1 rounded hover:bg-blue-200 transition"
                          title={t("posts", "viewDetails")}
                        >
                          <FiEye className="w-3 h-3 text-blue-600" />
                        </button>
                        {hasPermission("EDIT_POST") && (
                          <button
                            onClick={() => nav.editPost.go(navigate, { postId: post.id.toString() })}
                            className="p-1 rounded hover:bg-blue-200 transition"
                            title={t("posts", "editPost")}
                          >
                            <FiEdit2 className="w-3 h-3 text-blue-600" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-1">{post.body}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span>{t("common", "id")}: {post.id}</span>
                      <span>{t("common", "userId")}: {post.userId}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white/90 rounded-xl shadow border border-green-100 p-4">
            <h2 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="w-4 h-4 text-white" />
              </div>
              {t("dashboard", "recentComments")}
            </h2>
            <div className="space-y-2">
              {commentsLoading ? (
                <LoadingSpinner
                  message={t("dashboard", "commentsLoading")}
                  size="sm"
                />
              ) : recentComments.length === 0 ? (
                <div className="text-gray-400 text-center py-4">
                  {t("comments", "commentsError")}
                </div>
              ) : (
                recentComments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="bg-green-50 rounded-lg p-3 border border-green-100 hover:shadow transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {comment.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <span className="font-bold text-gray-900 text-xs">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {comment.email}
                      </span>
                    </div>
                    <p className="text-gray-700 text-xs">{comment.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
