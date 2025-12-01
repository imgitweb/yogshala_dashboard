import React, { useState, useEffect } from "react";
import { uploadImageToImageKit } from "../../../utils/imagekitHelper";
import { showError, showSuccess } from "../../../utils/toastService";
import {
  Loader2,
  Upload,
  X,
  AlertTriangle,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { updateGallery } from "../../../apis/trainerApi";

const GallaryTab = ({ photosVideos }) => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  console.log("GallaryTab - Initial photosVideos prop:", photosVideos);

  const MAX_SIZE_MB = {
    photos: 5,
    videos: 50,
  };

  // ✅ Load pre-uploaded gallery data
  useEffect(() => {
    if (photosVideos) {
      setPhotos(photosVideos.photos || []);
      setVideos(photosVideos.videos || []);
    }
  }, [photosVideos]);

  // ✅ Upload handler (single API call, no duplicates)
  const handleUpload = async (event, type) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    setError(null);

    const oversizedFiles = files.filter(
      (f) => f.size > MAX_SIZE_MB[type] * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setError(
        `Some ${type === "photos" ? "images" : "videos"} exceed the ${
          MAX_SIZE_MB[type]
        }MB limit.`
      );
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadImageToImageKit(
          file,
          type === "photos" ? "/trainer-photos" : "/trainer-videos"
        );
        uploadedUrls.push(url);
      }

      let newPhotos = [...photos];
      let newVideos = [...videos];
      if (type === "photos") newPhotos = [...newPhotos, ...uploadedUrls];
      if (type === "videos") newVideos = [...newVideos, ...uploadedUrls];

      setPhotos(newPhotos);
      setVideos(newVideos);

      await updateGallery({ photos: newPhotos, videos: newVideos });
      showSuccess("Upload successful & saved!");
    } catch (error) {
      console.error("Upload failed:", error);
      showError("Upload failed. Please try again.");
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Remove item & sync with backend
  const removeItem = async (type, url) => {
    try {
      const newPhotos =
        type === "photos" ? photos.filter((p) => p !== url) : photos;
      const newVideos =
        type === "videos" ? videos.filter((v) => v !== url) : videos;

      setPhotos(newPhotos);
      setVideos(newVideos);

      await updateGallery({ photos: newPhotos, videos: newVideos });
      showSuccess(
        `${type === "photos" ? "Photo" : "Video"} removed & synced with server!`
      );
    } catch (err) {
      console.error("Error removing media:", err);
      showError("Failed to sync deletion with server.");
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-700 text-xl text-dark mb-1">Trainer Gallery</h3>
          <p className="text-muted text-sm">
            Upload and manage your training photos and videos.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 mb-5 bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-2 text-sm shadow-sm">
          <AlertTriangle size={16} />
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-700 hover:text-red-900"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* --- PHOTOS --- */}
        <div className="p-5 bg-white rounded-2xl border border-light shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} className="text-primary" />
              <h4 className="font-600 text-dark">Photos</h4>
            </div>
            <label className="flex items-center gap-2 text-primary font-500 cursor-pointer hover:opacity-80 transition">
              <Upload size={16} />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleUpload(e, "photos")}
              />
            </label>
          </div>

          {uploading && (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin text-primary" size={24} />
            </div>
          )}

          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {photos.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden border border-light hover:border-primary transition-all"
                >
                  <img
                    src={url}
                    alt={`photo-${idx}`}
                    className="w-full h-28 object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    onClick={() => removeItem("photos", url)}
                    className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} color="#FFF" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !uploading && (
              <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-light rounded-xl hover:border-primary transition">
                <ImageIcon size={32} className="text-muted mb-2" />
                <p className="text-sm text-muted">No photos uploaded yet.</p>
              </div>
            )
          )}
        </div>

        {/* --- VIDEOS --- */}
        <div className="p-5 bg-white rounded-2xl border border-light shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Video size={18} className="text-primary" />
              <h4 className="font-600 text-dark">Videos</h4>
            </div>
            <label className="flex items-center gap-2 text-primary font-500 cursor-pointer hover:opacity-80 transition">
              <Upload size={16} />
              <span>Upload</span>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={(e) => handleUpload(e, "videos")}
              />
            </label>
          </div>

          {uploading && (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin text-primary" size={24} />
            </div>
          )}

          {videos.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {videos.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden border border-light hover:border-primary transition-all"
                >
                  <video
                    src={url}
                    controls
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeItem("videos", url)}
                    className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} color="#FFF" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !uploading && (
              <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-light rounded-xl hover:border-primary transition">
                <Video size={32} className="text-muted mb-2" />
                <p className="text-sm text-muted">No videos uploaded yet.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GallaryTab;
