import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingCart, Heart, Info, AlertCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'cart':
        return <ShoppingCart className="w-4 h-4 text-[#0067b8]" />;
      case 'wishlist':
        return <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <Info className="w-4 h-4 text-[#0067b8]" />;
    }
  };

  return (
    <div 
      id="toast-notification-container"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-lg border border-neutral-200 shadow-lg p-2.5 flex items-start gap-2.5 text-left overflow-hidden relative group"
          >
            {/* Left Accent Bar */}
            <div 
              className={`absolute top-0 left-0 bottom-0 w-0.5 ${
                toast.type === 'cart' 
                  ? 'bg-[#0067b8]' 
                  : toast.type === 'wishlist' 
                  ? 'bg-rose-500' 
                  : toast.type === 'success' 
                  ? 'bg-emerald-500' 
                  : 'bg-neutral-800'
              }`} 
            />

            {/* Icon or Thumbnail */}
            <div className="shrink-0 pl-0.5 mt-0.5">
              {toast.image ? (
                <img
                  src={toast.image}
                  alt="Thumbnail"
                  className="w-8 h-8 rounded-md object-cover border border-neutral-200"
                />
              ) : (
                <div className="p-1 rounded-md bg-neutral-50 border border-neutral-100">
                  {getIcon(toast.type)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1.5">
              <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                {toast.title}
              </h4>
              <p className="text-[10px] text-neutral-600 mt-0.5 line-clamp-2 leading-tight">
                {toast.message}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded hover:bg-neutral-100 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
