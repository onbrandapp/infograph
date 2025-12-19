import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';

const usePrintMode = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = useCallback(async (element: HTMLElement, fileName: string) => {
    if (!element) return;
    
    setIsExporting(true);
    
    try {
      // We want a high-quality export. 
      // The "SwissInfographic" component is designed to be responsive, but for export 
      // we want to lock it to a standard "Paper" width (e.g. A4 width approx 794px at 96DPI)
      // multiplied by a scale factor for Retina quality.
      
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3, // High Res
        backgroundColor: '#F5F5F7', // Ensure background color is captured
        style: {
          // Force a fixed width during capture to ensure desktop layout even if triggered on mobile
          width: '800px',
          height: 'auto',
          transform: 'none', // Reset any potential transforms
          margin: '0',
        },
        width: 800, // Explicit width for the canvas
      });

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { handleDownload, isExporting };
};

export default usePrintMode;