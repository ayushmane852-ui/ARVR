import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, X, Check, Sparkles } from 'lucide-react';

export async function generateDevotionalFrame(sourceCanvas) {
  const width = 1920;
  const height = 1080;
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d');

  // 1. Deep sacred sanctum background
  ctx.fillStyle = '#0c0704';
  ctx.fillRect(0, 0, width, height);

  // 2. Aspect-ratio preserving 3D canvas rendering
  const marginX = 64;
  const marginTop = 104;
  const marginBottom = 88;
  const photoW = width - marginX * 2;
  const photoH = height - marginTop - marginBottom;

  const srcW = sourceCanvas.width;
  const srcH = sourceCanvas.height;
  const srcAspect = srcW / srcH;
  const targetAspect = photoW / photoH;

  let sx = 0, sy = 0, sWidth = srcW, sHeight = srcH;
  if (srcAspect > targetAspect) {
    sWidth = srcH * targetAspect;
    sx = (srcW - sWidth) / 2;
  } else {
    sHeight = srcW / targetAspect;
    sy = (srcH - sHeight) / 2;
  }

  // Draw 3D scene photo
  ctx.drawImage(sourceCanvas, sx, sy, sWidth, sHeight, marginX, marginTop, photoW, photoH);

  // 3. Golden double border around the photo
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.strokeRect(marginX, marginTop, photoW, photoH);

  ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(marginX - 10, marginTop - 10, photoW + 20, photoH + 20);

  // Outer border
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  // 4. Corner decorative flourishes
  const drawCornerFlourish = (x, y, scaleX, scaleY) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.lineTo(0, 0);
    ctx.lineTo(32, 0);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(10, 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  drawCornerFlourish(marginX - 10, marginTop - 10, 1, 1);
  drawCornerFlourish(marginX + photoW + 10, marginTop - 10, -1, 1);
  drawCornerFlourish(marginX - 10, marginTop + photoH + 10, 1, -1);
  drawCornerFlourish(marginX + photoW + 10, marginTop + photoH + 10, -1, -1);

  // 5. Header Sanskrit Shloka & Title
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px "Cinzel", "Georgia", "Times New Roman", serif';
  ctx.fillStyle = '#fef08a';
  ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
  ctx.shadowBlur = 16;
  ctx.fillText('॥ ॐ गं गणपतये नमः ॥', width / 2, 46);

  ctx.font = '17px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(253, 230, 138, 0.82)';
  ctx.shadowBlur = 0;
  ctx.fillText('॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ • निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥', width / 2, 78);

  // 6. Footer Information
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  ctx.textAlign = 'left';
  ctx.font = 'bold 18px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('✨ VR GANAPATI DARSHAN', marginX, height - 44);

  ctx.font = '14px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(253, 230, 138, 0.65)';
  ctx.fillText('10 CLUB AR/VR • Experience the divine, in your own space', marginX, height - 20);

  ctx.textAlign = 'right';
  ctx.font = '16px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`Darshan Date: ${dateStr}`, width - marginX, height - 44);

  ctx.font = '14px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(253, 230, 138, 0.65)';
  ctx.fillText('Mangal Murti Morya 🙏', width - marginX, height - 20);

  return offscreen.toDataURL('image/png', 0.95);
}

export default function CaptureModal({ isOpen, onClose, imageDataUrl }) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !imageDataUrl) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageDataUrl;
    a.download = `ganapati-darshan-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'ganapati-darshan.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'VR Ganapati Darshan 🙏',
          text: 'Received sacred darshan of Lord Ganesha in VR! May Bappa bless you with wisdom, peace, and joy. ✨',
          files: [file],
        });
      } else if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 3500);
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#140e0a]/95 border border-amber-500/40 rounded-3xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.2)] flex flex-col gap-4 text-amber-100 max-h-[92vh] overflow-y-auto pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-full bg-amber-500/20 text-amber-300">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 tracking-wide">
                  Captured Sacred Darshan
                </h3>
                <p className="text-[11px] sm:text-xs text-amber-300/70">
                  Ready to download and share with family & friends
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Framed Image Preview */}
          <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-black/60 shadow-inner flex items-center justify-center">
            <img
              src={imageDataUrl}
              alt="VR Ganapati Darshan Snapshot"
              className="w-full h-auto object-contain max-h-[58vh] rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400 text-amber-200 text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer group"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Image</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Darshan</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
