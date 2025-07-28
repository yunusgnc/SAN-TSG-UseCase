import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { usePost } from "../../hooks/usePosts";
import { useComments } from "../../hooks/useComments";
import { useI18n } from "../../contexts/I18nContext";
import { FiArrowLeft } from "react-icons/fi";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();

  const postIdNumber = parseInt(postId || "1");
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = usePost(postIdNumber);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useComments(postIdNumber);

  if (postLoading || commentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common", "loading")}</p>
        </div>
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
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => nav.posts.back(navigate)}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition"
              title={t("posts", "backToPosts")}
            >
              <FiArrowLeft className="w-5 h-5 text-blue-600" />
            </button>
            <h1 className="text-2xl font-bold text-blue-800">
              {t("posts", "postDetail")}
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
          <h2 className="font-semibold text-xl text-blue-700 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-700 text-base">{post.body}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <h3 className="font-semibold text-lg text-blue-700 mb-4">
            {t("comments", "postComments")}
          </h3>
          <div className="space-y-4">
            {commentsError && (
              <p className="text-red-600">{t("comments", "commentsError")}</p>
            )}
            {comments?.map((comment: any) => (
              <div
                key={comment.id}
                className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100 hover:shadow transition"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 text-white font-bold text-lg flex-shrink-0">
                  {comment.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-blue-900 text-sm">
                      {comment.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.email}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.body}</p>
                </div>
              </div>
            ))}
            {comments && comments.length === 0 && (
              <p className="text-gray-500 text-sm">
                {t("comments", "noComments")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
