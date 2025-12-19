import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const CitationFooter = ({ references = [], date = "", verifyUrl = "" }) => {
  return (
    // Main Footer Container with Top Border
    <div className="w-full border-t-4 border-black pt-6 mt-12 pb-4">

      {/* Flex Container: Separates Text (Left) from QR (Right) */}
      <div className="flex flex-row justify-between items-end gap-8">

        {/* LEFT ZONE: References & Date */}
        <div className="flex flex-col gap-4 grow">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">
              References & Methodology
            </h4>
            <ol className="list-decimal list-inside font-mono text-[10px] space-y-1 text-gray-600">
              {references.slice(0, 3).map((ref, i) => (
                <li key={i} className="truncate max-w-xl">{ref}</li>
              ))}
            </ol>
          </div>

          {/* Generated Date Line - Now safely stacked under references */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="font-mono text-[10px] uppercase opacity-50">
              Generated: {date} | Engine: Google Gemini 1.5 Pro
            </p>
          </div>
        </div>

        {/* RIGHT ZONE: QR Code (Fixed width, never overlaps) */}
        <div className="flex flex-col items-end shrink-0">
          <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <QRCodeCanvas
              value={verifyUrl}
              size={80}
              level="H"
              includeMargin={false}
              imageSettings={{
                excavate: true,
              }}
            />
          </div>
          <p className="text-[8px] font-mono uppercase tracking-widest mt-2 opacity-60">
            Scan to Verify
          </p>
        </div>

      </div>
    </div>
  );
};

export default CitationFooter;