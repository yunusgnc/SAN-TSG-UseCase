import React from 'react';
import { nav } from '../nav';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-gray-400 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("errors", "notFound")}</h1>
        <p className="text-gray-600 mb-8">
          {t("errors", "notFoundMessage")}
        </p>
        <div className="space-y-4">
          <Button
            variant="primary"
            fullWidth
            onClick={() => nav.dashboard.go(navigate)}
          >
            {t("errors", "backToHome")}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate(-1)}
          >
            {t("errors", "goBack")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 