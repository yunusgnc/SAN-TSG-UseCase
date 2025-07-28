export interface TranslationModule {
  [key: string]: string;
}

export interface TranslationFiles {
  [locale: string]: {
    [module: string]: TranslationModule;
  };
}

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
    },
    auth: {
      login: "Giriş Yap",
      logout: "Çıkış",
      welcome: "Hoş Geldiniz",
      loginDescription: "Hesabınıza giriş yapın",
      demoUser: "Demo Kullanıcı",
      demoLogin: "Demo ile Giriş Yap",
    },
    dashboard: {
      title: "Dashboard",
      recentPosts: "Son 5 Gönderi",
      recentComments: "Son 5 Yorum",
      welcome: "Hoş geldin",
      permissions: "İzinler",
    },
    posts: {
      title: "Gönderiler",
      allPosts: "Tüm Gönderiler",
      newPost: "Yeni Gönderi",
      createPost: "Yeni Gönderi Oluştur",
      editPost: "Gönderiyi Düzenle",
      postTitle: "Başlık",
      postContent: "İçerik",
      postId: "ID",
      userId: "User ID",
      viewPost: "Görüntüle",
      deletePost: "Sil",
      savePost: "Gönderiyi Kaydet",
      backToPosts: "Gönderilere Dön",
    },
    comments: {
      title: "Yorumlar",
      postComments: "Gönderi Yorumları",
      commentAuthor: "Yazar",
      commentContent: "Yorum",
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
    },
    auth: {
      login: "Login",
      logout: "Logout",
      welcome: "Welcome",
      loginDescription: "Sign in to your account",
      demoUser: "Demo User",
      demoLogin: "Login with Demo",
    },
    dashboard: {
      title: "Dashboard",
      recentPosts: "Recent 5 Posts",
      recentComments: "Recent 5 Comments",
      welcome: "Welcome",
      permissions: "Permissions",
    },
    posts: {
      title: "Posts",
      allPosts: "All Posts",
      newPost: "New Post",
      createPost: "Create New Post",
      editPost: "Edit Post",
      postTitle: "Title",
      postContent: "Content",
      postId: "ID",
      userId: "User ID",
      viewPost: "View",
      deletePost: "Delete",
      savePost: "Save Post",
      backToPosts: "Back to Posts",
    },
    comments: {
      title: "Comments",
      postComments: "Post Comments",
      commentAuthor: "Author",
      commentContent: "Comment",
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
  },
};

export const getTranslation = (
  locale: string = "tr",
  module: string,
  key: string
): string => {
  return translations[locale]?.[module]?.[key] || key;
};

export const preloadTranslations = async (modules: string[]): Promise<void> => {
  console.log("Preloading translations for modules:", modules);
  return Promise.resolve();
};
