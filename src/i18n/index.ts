export interface TranslationModule {
  [key: string]: string;
}

export interface TranslationFiles {
  [locale: string]: {
    [module: string]: {
      [key: string]: string;
    };
  };
}

export const getTranslation = (
  locale: string,
  module: string,
  key: string
): string => {
  return translations[locale]?.[module]?.[key] || key;
};

export const preloadTranslations = async (modules: string[]): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    await Promise.all(
      modules.map(async (module) => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/1`
          );
          if (!response.ok) {
            console.warn(
              `Translation module ${module} not found, using fallback`
            );
          }
          console.log(`Translation module ${module} preloaded successfully`);
        } catch (error) {
          console.warn(
            `Failed to preload translation module ${module}:`,
            error
          );
        }
      })
    );
  } catch (error) {
    console.warn(
      "Translation preloading failed, using local translations:",
      error
    );
  }
};

export const translations: TranslationFiles = {
  tr: {
    common: {
      loading: "Yükleniyor...",
      save: "Kaydet",
      cancel: "İptal",
      delete: "Sil",
      edit: "Düzenle",
      view: "Görüntüle",
      back: "Geri",
      home: "Ana Sayfa",
      dashboard: "Dashboard",
      posts: "Gönderiler",
      comments: "Yorumlar",
      welcome: "Hoş geldin",
      id: "ID",
      userId: "User ID",
      title: "Başlık",
      content: "İçerik",
      create: "Oluştur",
      update: "Güncelle",
      confirm: "Onayla",
      error: "Hata",
      success: "Başarılı",
      required: "Zorunlu",
      backToPosts: "Gönderilere Dön",
      backToDashboard: "Dashboard'a Dön",
    },
    auth: {
      login: "Giriş Yap",
      logout: "Çıkış",
      welcome: "Hoş Geldiniz",
      loginDescription: "Hesabınıza giriş yapın",
      demoUser: "Demo Kullanıcı",
      demoLogin: "Demo ile Giriş Yap",
      demoDescription:
        "Bu bir demo uygulamasıdır. Gerçek kimlik bilgileri gerekmez.",
      permissions: "İzinler:",
      viewPosts: "Gönderileri Görüntüle (VIEW_POSTS)",
      viewComments: "Yorumları Görüntüle (VIEW_COMMENTS)",
      editPosts: "Gönderileri Düzenle (EDIT_POST)",
    },
    dashboard: {
      title: "Dashboard",
      recentPosts: "Son 5 Gönderi",
      recentComments: "Son 5 Yorum",
      welcome: "Hoş geldin",
      permissions: "İzinler",
      postsLoading: "Gönderiler yükleniyor...",
      commentsLoading: "Yorumlar yükleniyor...",
      viewDetails: "Detayları Gör",
    },
    posts: {
      title: "Gönderiler",
      postsList: "Gönderiler",
      allPosts: "Tüm Gönderiler",
      newPost: "Yeni Gönderi",
      createPost: "Yeni Gönderi Oluştur",
      editPost: "Gönderiyi Düzenle",
      postTitle: "Başlık",
      postContent: "İçerik",
      postId: "ID",
      userId: "User ID",
      viewPost: "Görüntüle",
      viewDetails: "Detayları Gör",
      deletePost: "Sil",
      savePost: "Gönderiyi Kaydet",
      backToPosts: "Gönderilere Dön",
      backToPost: "Gönderiye Dön",
      postLoading: "Gönderi yükleniyor...",
      postError: "Gönderi yüklenirken hata oluştu.",
      postsLoading: "Gönderiler yükleniyor...",
      postsError: "Gönderiler yüklenirken hata oluştu.",
      deleteConfirm: "Bu gönderiyi silmek istediğinizden emin misiniz?",
      saveSuccess: "Gönderi başarıyla kaydedildi!",
      createSuccess: "Gönderi başarıyla oluşturuldu!",
      fillRequired: "Lütfen başlık ve içerik alanlarını doldurun!",
      titlePlaceholder: "Gönderi başlığını girin...",
      contentPlaceholder: "Gönderi içeriğini girin...",
      postDetail: "Gönderi Detayı",
      postDetails: "Gönderi Detayları",
      searchPosts: "Gönderilerde ara...",
      postsCount: "{count} gönderi bulundu",
      noPosts: "Henüz gönderi bulunmuyor",
      noPostsFound: "Arama kriterlerine uygun gönderi bulunamadı",
      deleteSuccess: "Gönderi başarıyla silindi!",
      deleteError: "Gönderi silinirken hata oluştu.",
      postUpdate: "Güncelle",
      postUpdateSuccess: "Gönderi başarıyla güncellendi!",
      postUpdateError: "Gönderi güncellenirken hata oluştu.",
    },
    comments: {
      title: "Yorumlar",
      comments: "Yorumlar",
      postComments: "Gönderi Yorumları",
      commentAuthor: "Yazar",
      commentContent: "Yorum",
      commentsLoading: "Yorumlar yükleniyor...",
      commentsError: "Yorumlar yüklenirken hata oluştu.",
      noComments: "Bu gönderi için henüz yorum bulunmuyor",
    },
    forms: {
      required: "Bu alan zorunludur",
      titleRequired: "Başlık alanı zorunludur",
      contentRequired: "İçerik alanı zorunludur",
      fillAllFields: "Lütfen tüm alanları doldurun",
    },
    errors: {
      forbidden: "Erişim Reddedildi",
      notFound: "Sayfa Bulunamadı",
      forbiddenMessage: "Bu sayfaya erişim izniniz bulunmamaktadır.",
      notFoundMessage: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
      backToHome: "Ana Sayfaya Dön",
      goBack: "Geri Git",
    },
    modal: {
      deleteTitle: "Gönderiyi Sil",
      deleteMessage:
        "Bu gönderiyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      confirmDelete: "Evet, Sil",
      cancel: "İptal",
    },
  },
  en: {
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      back: "Back",
      home: "Home",
      dashboard: "Dashboard",
      posts: "Posts",
      comments: "Comments",
      welcome: "Welcome",
      id: "ID",
      userId: "User ID",
      title: "Title",
      content: "Content",
      create: "Create",
      update: "Update",
      confirm: "Confirm",
      error: "Error",
      success: "Success",
      required: "Required",
      backToPosts: "Back to Posts",
      backToDashboard: "Back to Dashboard",
    },
    auth: {
      login: "Login",
      logout: "Logout",
      welcome: "Welcome",
      loginDescription: "Sign in to your account",
      demoUser: "Demo User",
      demoLogin: "Login with Demo",
      demoDescription:
        "This is a demo application. Real credentials are not required.",
      permissions: "Permissions:",
      viewPosts: "View Posts (VIEW_POSTS)",
      viewComments: "View Comments (VIEW_COMMENTS)",
      editPosts: "Edit Posts (EDIT_POST)",
    },
    dashboard: {
      title: "Dashboard",
      recentPosts: "Recent 5 Posts",
      recentComments: "Recent 5 Comments",
      welcome: "Welcome",
      permissions: "Permissions",
      postsLoading: "Posts loading...",
      commentsLoading: "Comments loading...",
      viewDetails: "View Details",
    },
    posts: {
      title: "Posts",
      postsList: "Posts",
      allPosts: "All Posts",
      newPost: "New Post",
      createPost: "Create New Post",
      editPost: "Edit Post",
      postTitle: "Title",
      postContent: "Content",
      postId: "ID",
      userId: "User ID",
      viewPost: "View",
      viewDetails: "View Details",
      deletePost: "Delete",
      savePost: "Save Post",
      backToPosts: "Back to Posts",
      backToPost: "Back to Post",
      postLoading: "Post loading...",
      postError: "Error loading post.",
      postsLoading: "Posts loading...",
      postsError: "Error loading posts.",
      deleteConfirm: "Are you sure you want to delete this post?",
      saveSuccess: "Post saved successfully!",
      createSuccess: "Post created successfully!",
      fillRequired: "Please fill title and content fields!",
      titlePlaceholder: "Enter post title...",
      contentPlaceholder: "Enter post content...",
      postDetail: "Post Details",
      postDetails: "Post Details",
      searchPosts: "Search posts...",
      postsCount: "{count} posts found",
      noPosts: "No posts yet",
      noPostsFound: "No posts found matching your search criteria",
      deleteSuccess: "Post deleted successfully!",
      deleteError: "Error deleting post.",
      postUpdate: "Update",
      postUpdateSuccess: "Post updated successfully!",
      postUpdateError: "Error updating post.",
    },
    comments: {
      title: "Comments",
      comments: "Comments",
      postComments: "Post Comments",
      commentAuthor: "Author",
      commentContent: "Comment",
      commentsLoading: "Comments loading...",
      commentsError: "Error loading comments.",
      noComments: "No comments yet for this post",
    },
    forms: {
      required: "This field is required",
      titleRequired: "Title field is required",
      contentRequired: "Content field is required",
      fillAllFields: "Please fill all fields",
    },
    errors: {
      forbidden: "Access Denied",
      notFound: "Page Not Found",
      forbiddenMessage: "You do not have permission to access this page.",
      notFoundMessage:
        "The page you are looking for does not exist or has been moved.",
      backToHome: "Back to Home",
      goBack: "Go Back",
    },
    modal: {
      deleteTitle: "Delete Post",
      deleteMessage:
        "Are you sure you want to delete this post? This action cannot be undone.",
      confirmDelete: "Yes, Delete",
      cancel: "Cancel",
    },
  },
};
