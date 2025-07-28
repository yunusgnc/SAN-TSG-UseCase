import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { usePost } from "../../hooks/usePosts";
import { useComments } from "../../hooks/useComments";
import { useI18n } from "../../contexts/I18nContext";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FiArrowLeft, FiEdit2, FiMessageSquare } from "react-icons/fi";

const PostCommentsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();

  const postIdNumber = parseInt(postId || "1");
  const { data: post, isLoading: postLoading, error: postError } = usePost(postIdNumber);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments(postIdNumber);

  if (postLoading || commentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <LoadingSpinner message={t("comments", "commentsLoading")} />
      </div>
    );
  }

  if (postError || !post) {
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => nav.postDetail.go(navigate, { postId: postId! })}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition"
              title={t("posts", "backToPost")}
            >
              <FiArrowLeft className="w-5 h-5 text-blue-600" />
            </button>
            <h1 className="text-2xl font-bold text-blue-800">{t("comments", "postComments")}</h1>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => nav.editPost.go(navigate, { postId: postId! })}
            className="flex items-center gap-1"
          >
            <FiEdit2 className="w-4 h-4" />
            {t("posts", "editPost")}
          </Button>
        </div>

        {/* Post Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
          <h2 className="font-semibold text-xl text-blue-700 mb-2">{post.title}</h2>
          <p className="text-gray-700 text-base">{post.body}</p>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-blue-700">
              {t("comments", "comments")} ({comments?.length || 0})
            </h3>
          </div>

          {commentsError && (
            <div className="text-center py-8">
              <p className="text-red-600">{t("comments", "commentsError")}</p>
            </div>
          )}

          {comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment: any) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 text-white font-bold text-lg flex-shrink-0">
                    {comment.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-blue-900">{comment.name}</span>
                      <span className="text-sm text-gray-500">{comment.email}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">{t("comments", "noComments")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCommentsPage; 