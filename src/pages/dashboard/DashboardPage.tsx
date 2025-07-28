import React from "react";
import { nav } from "../../nav";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useI18n } from "../../contexts/I18nContext";
import { usePosts } from "../../hooks/usePosts";
import { useAllComments } from "../../hooks/useComments";
import LoadingSpinner from "../../components/LoadingSpinner";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { t } = useI18n();
  const { data: posts, isLoading: postsLoading } = usePosts();
  const { data: allComments, isLoading: commentsLoading } = useAllComments();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("dashboard", "recentPosts")}
            </h2>
            <div className="space-y-3">
              {postsLoading ? (
                <LoadingSpinner message={t("dashboard", "postsLoading")} size="sm" />
              ) : (
                posts?.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      {post.body.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{t("common", "id")}: {post.id}</span>
                      <button
                        onClick={() => nav['post-detail'].go(navigate, { postId: post.id.toString() })}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {t("dashboard", "viewDetails")}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("dashboard", "recentComments")}
            </h2>
            <div className="space-y-3">
              {commentsLoading ? (
                <LoadingSpinner message={t("dashboard", "commentsLoading")} size="sm" />
              ) : (
                allComments?.slice(0, 5).map((comment: any) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {comment.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {comment.body.substring(0, 80)}...
                        </p>
                        <span className="text-xs text-gray-500">{comment.email}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;
