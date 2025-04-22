
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileType, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileUpload: (file: File) => Promise<any>;
  accept: string;
  title: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const FileUploader = ({
  onFileUpload,
  accept,
  title,
  icon,
  disabled = false,
  className,
}: FileUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [filename, setFilename] = useState("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilename(file.name);
    setIsUploading(true);

    try {
      await onFileUpload(file);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <label
        htmlFor={`file-upload-${title}`}
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer",
          disabled || isUploading
            ? "border-gray-300 bg-gray-100"
            : "border-primary/50 hover:bg-primary/5"
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          ) : (
            icon || <Upload className="h-8 w-8 text-primary mb-2" />
          )}
          <p className="mb-2 text-sm font-semibold">{title}</p>
          {filename ? (
            <p className="text-xs text-gray-500">{filename}</p>
          ) : (
            <p className="text-xs text-gray-500">Click to upload</p>
          )}
        </div>
        <input
          id={`file-upload-${title}`}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
};

export const PDFUploader = ({ onUpload, disabled = false }: { onUpload: (file: File) => Promise<any>, disabled?: boolean }) => {
  return (
    <FileUploader
      onFileUpload={onUpload}
      accept="application/pdf"
      title="Upload PDF Document"
      icon={<FileType className="h-8 w-8 text-primary mb-2" />}
      disabled={disabled}
    />
  );
};

export const ImageUploader = ({ onUpload, disabled = false }: { onUpload: (file: File) => Promise<any>, disabled?: boolean }) => {
  return (
    <FileUploader
      onFileUpload={onUpload}
      accept="image/*"
      title="Upload Image"
      disabled={disabled}
    />
  );
};
