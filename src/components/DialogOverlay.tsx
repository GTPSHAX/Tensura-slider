export default function DialogOverlay({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" onClick={onClose}></div>
      <div className="relative animate-fade-in bg-[#1a1a1a] border-4 border-white p-6 rounded-lg shadow-lg max-w-md w-full m-4"
           style={{ imageRendering: 'pixelated' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
};