"use client"

import React, { useState, useRef, useCallback } from "react"
import { Upload, ImageIcon, Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import dotenv from 'dotenv';
import './OCRComponent.css';

dotenv.config()


export default function OCRComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ocrResult, setOcrResult] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [eventSource, setEventSource] = useState<EventSource | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleFile = useCallback((file: File) => {
    if (file.type.startsWith("image/")) {
      setFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
    } else {
      setError("Please upload an image file.")
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const droppedFile = e.dataTransfer.files[0]
      handleFile(droppedFile)
    },
    [handleFile],
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile()
            if (blob) handleFile(blob)
          }
        }
      }
    },
    [handleFile],
  )

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  // Replace hardcoded URLs with environment variables
  const processImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    // Setup SSE connection
    const sse = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_PROGRESS_ENDPOINT}`);
    setEventSource(sse);

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress);
    };

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_OCR_ENDPOINT}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("OCR processing failed");
      }

      const result = await response.json();
      setOcrResult(result.text);
    } catch (err) {
      setError("An error occurred during OCR processing.");
      console.error(err);
    } finally {
      setIsProcessing(false);
      if (sse) {
        sse.close();
        setEventSource(null);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ocrResult).then(() =>
        toast({
          title: "Copied to clipboard",
          description: "The OCR result has been copied to your clipboard.",
          open: true, // Ensure the toast opens
        })
    ).catch(error => {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Failed to copy the OCR result to your clipboard.",
        open: true, // Ensure the error toast opens
      });
    });
  }

  React.useEffect(() => {
    document.addEventListener("paste", handlePaste)
    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [handlePaste])

  // Clean up SSE connection on component unmount
  React.useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Paste/Drop Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={dropZoneRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="preview-area border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-gray-400 dark:hover:border-gray-500"
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Drag and drop an image here, or click to select</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">You can also paste an image (Ctrl+V)</p>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/*"
          className="hidden"
          aria-label="Upload image"
        />
        {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}
        <div className="flex justify-center mt-4">
          <Button onClick={processImage} disabled={!file || isProcessing} className="w-full sm:w-auto">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Process Image
              </>
            )}
          </Button>
        </div>
        {isProcessing && <Progress value={progress} className="w-full mt-4" />}
        {ocrResult && (
          <div className="results mt-6">
            <Textarea value={ocrResult} readOnly className="w-full h-32 p-2 border rounded" aria-label="OCR Result" />
            <Button onClick={copyToClipboard} className="mt-2">
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="hint text-sm text-gray-500 dark:text-gray-400 text-center w-full">
          Supported image formats: PNG, JPG, GIF. Max file size: 5MB
        </p>
      </CardFooter>
    </Card>
  )
}

