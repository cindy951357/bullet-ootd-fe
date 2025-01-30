import { useTranslation } from "react-i18next";

interface PopupProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

function Popup({ title, message, onConfirm, onCancel, confirmText, cancelText }: PopupProps) {
  const { t } = useTranslation();

  return (
    <div id="popup-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div id="popup-box" className="bg-white p-6 rounded-lg shadow-lg text-center w-96 relative">
        {/* X 按鈕 */}
        <button
          id="popup-btn-close"
          onClick={onCancel}
          className="btn-cancel absolute top-2 right-2 p-2 "
        >
          ✕
        </button>

        <h2 id="popup-title" className="text-lg font-bold">{t(title)}</h2>
        <p id="popup-message" className="mt-2">{t(message)}</p>

        <div id="popup-btn-group" className="mt-4 flex justify-center gap-4">
          {onCancel && (
            <button
              id="popup-btn-cancel"
              onClick={onCancel}
              className="btn-cancel p-2"
            >
              {t(cancelText || "Cancel")}
            </button>
          )}
          <button
            id="popup-btn-confirm"
            onClick={onConfirm}
            className="p-2 rounded"
          >
            {t(confirmText || "OK")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
