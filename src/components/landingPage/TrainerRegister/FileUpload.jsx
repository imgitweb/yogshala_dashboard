import React from "react";

const FileUpload = ({ id, label, files, setFiles, accept = "*" }) => (
  <div className="flex-1 mb-6">
    <label className="block text-sm font-600 text-dark mb-2">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="file"
        id={id}
        accept={accept}
        multiple
        onChange={e => setFiles(Array.from(e.target.files))}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="px-5 w-full py-3 bg-offwhite border border-light rounded-lg cursor-pointer hover:border-primary hover:text-primary transition-all"
      >
        Upload Files
      </label>
      {files && files.length > 0 && (
        <div className="flex flex-col gap-1 text-sm text-dark">
          {files.map((file, i) => (
            <span key={i} className="truncate max-w-[200px]">{file.name}</span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default FileUpload;
