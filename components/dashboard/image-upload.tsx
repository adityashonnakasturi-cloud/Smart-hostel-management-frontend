"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  accept?: string
  maxSize?: number
}

export default function ImageUpload({
  onImageChange,
  accept = "image/jpeg,image/png",
  maxSize = 5242880,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) {
      setPreview(null)
      setFileName(null)
      onImageChange(null)
      return
    }

    if (file.size > maxSize) {
      setError(`File size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`)
      return
    }

    const validTypes = accept.split(",").map((t) => t.trim())
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG and PNG are allowed.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      setFileName(file.name)
      onImageChange(file)
    }
    reader.readAsDataURL(file)
  }

  const handleClear = () => {
    setPreview(null)
    setFileName(null)
    setError(null)
    onImageChange(null)
  }

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition">
        <Upload size={32} className="text-muted-foreground mb-2" />
        <span className="text-sm text-muted-foreground">Click to upload image</span>
        <span className="text-xs text-muted-foreground mt-1">
          JPG or PNG (max {(maxSize / (1024 * 1024)).toFixed(1)}MB)
        </span>
        <input type="file" onChange={handleFileChange} accept={accept} className="hidden" aria-label="Upload image" />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {preview && (
        <div className="relative">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full max-h-64 object-cover rounded-lg" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <X size={20} />
          </button>
          <p className="text-sm text-muted-foreground mt-2">Selected: {fileName}</p>
        </div>
      )}
    </div>
  )
}
