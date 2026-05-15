import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import './ImageUpload.css';
import { supabase } from '../utils/supabase';

export default function ImageUpload({ value, onChange, label = 'Foto' }) {
  const fileRef = useRef();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      alert('Gagal upload gambar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleRemove = () => {
    onChange('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="admin-form-group">
      <label>{label}</label>
      {value ? (
        <div className="img-upload__preview">
          <img src={value} alt="Preview" />
          <button type="button" className="img-upload__remove" onClick={handleRemove}>
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`img-upload__dropzone ${dragOver ? 'img-upload__dropzone--active' : ''} ${uploading ? 'img-upload__dropzone--uploading' : ''}`}
          onClick={() => !uploading && fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOver(false)}
        >
          {uploading ? (
            <div className="img-upload__loading">
              <div className="spinner" />
              <p>Sedang mengunggah...</p>
            </div>
          ) : (
            <>
              <Upload size={24} />
              <p>Klik atau drag & drop foto di sini</p>
              <span>JPG, PNG, WEBP • Maks 5MB</span>
            </>
          )}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
