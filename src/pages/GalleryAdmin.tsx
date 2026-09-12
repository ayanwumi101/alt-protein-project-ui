import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { CloseCircle, Cloud, DocumentUpload, TickCircle } from "iconsax-react";
import { saveUploadedGalleryEvent } from "../data/galleryStorage";

type UploadState = "idle" | "uploading" | "success" | "error";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const maxFileSize = 1024 * 1024;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function GalleryAdmin() {
  const [state, setState] = useState<UploadState>("idle");
  const [status, setStatus] = useState("");
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const oversized = selectedFiles.find((file) => file.size > maxFileSize);
    const validFiles = selectedFiles.filter(
      (file) => file.type.startsWith("image/") && file.size <= maxFileSize,
    );

    if (oversized) {
      setState("error");
      setStatus(`"${oversized.name}" is larger than 1 MB and was not added.`);
    } else {
      setState("idle");
      setStatus("");
    }

    setFiles(validFiles);
  }

  function removeFile(index: number) {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(nextFiles);
    if (fileInputRef.current) {
      const transfer = new DataTransfer();
      nextFiles.forEach((file) => transfer.items.add(file));
      fileInputRef.current.files = transfer.files;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedFiles = data
      .getAll("images")
      .filter(
        (value): value is File => value instanceof File && value.size > 0,
      );
    const title = String(data.get("title") || "").trim();
    const tags = String(data.get("tags") || "").trim();

    if (!cloudName || !uploadPreset) {
      setState("error");
      setStatus(
        "Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file first.",
      );
      return;
    }
    if (!selectedFiles.length || !title) {
      setState("error");
      setStatus("Add an event title and at least one image.");
      return;
    }
    const oversized = selectedFiles.find((file) => file.size > maxFileSize);
    if (oversized) {
      setState("error");
      setStatus(
        `"${oversized.name}" is larger than 1 MB and cannot be uploaded.`,
      );
      return;
    }

    setState("uploading");
    setStatus(`Uploading 0 of ${selectedFiles.length} images…`);
    const urls: string[] = [];
    try {
      for (const [index, file] of selectedFiles.entries()) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", uploadPreset);
        uploadData.append(
          "folder",
          `alt-protein-gallery/${slugify(title)}__${slugify(tags || "community-moments")}`,
        );
        uploadData.append(
          "tags",
          [
            title,
            ...tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          ].join(","),
        );
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: uploadData },
        );
        if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
        const result = (await response.json()) as { secure_url: string };
        urls.push(result.secure_url);
        setStatus(`Uploading ${index + 1} of ${selectedFiles.length} images…`);
      }
      setUploaded(urls);
      saveUploadedGalleryEvent({
        title,
        meta: `Uploaded gallery · ${tags || "Community moments"}`,
        images: urls.map((url, index) => ({
          src: url,
          alt: `${title} moment ${index + 1}`,
        })),
      });
      setState("success");
      setStatus(`${urls.length} images uploaded to Cloudinary.`);
      form.reset();
      setFiles([]);
    } catch (error) {
      setState("error");
      setStatus(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-hero shell">
        <div className="eyebrow">
          <span className="eyebrow-line" /> Private workspace · Gallery manager
        </div>
        <h1>
          Publish a new
          <br />
          <em>gallery moment.</em>
        </h1>
        <p className="page-intro">
          Upload event photos to Cloudinary with a title and searchable tags.
          This workspace is intentionally not linked from the public navigation.
        </p>
      </section>
      <section className="admin-panel shell">
        <div className="admin-panel-heading">
          <Cloud color="currentColor" size={30} variant="Linear" />
          <div>
            <span className="section-label">UPLOAD CENTRE</span>
            <h2>Event details</h2>
          </div>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Event title
            <input
              name="title"
              type="text"
              placeholder="e.g. Alternative Protein Workshop"
              required
            />
          </label>
          <label>
            Tags
            <input
              name="tags"
              type="text"
              placeholder="research, workshop, outreach"
            />
            <small>Separate tags with commas.</small>
          </label>
          <label className="admin-file-field">
            Gallery images
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              required
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <span>
              <DocumentUpload color="currentColor" size={26} variant="Linear" />{" "}
              Choose one or more images (max 1 MB each)
            </span>
          </label>
          {files.length > 0 && (
            <div className="admin-file-previews" aria-label="Selected images">
              {files.map((file, index) => (
                <div
                  className="admin-file-preview"
                  key={`${file.name}-${file.lastModified}`}
                >
                  <img src={previews[index]} alt="" />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <CloseCircle
                      color="currentColor"
                      size={17}
                      variant="Linear"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            className="button button-dark"
            type="submit"
            disabled={state === "uploading"}
            style={{
              width: "fit-content",
            }}
          >
            {state === "uploading" ? "Uploading…" : "Upload images"}{" "}
            <Cloud color="currentColor" size={17} variant="Linear" />
          </button>
          {status && (
            <p className={`admin-status ${state}`} role="status">
              {state === "success" && (
                <TickCircle color="currentColor" size={17} variant="Linear" />
              )}
              {status}
            </p>
          )}
        </form>
        {uploaded.length > 0 && (
          <div className="uploaded-list">
            <strong>Uploaded URLs</strong>
            {uploaded.map((url) => (
              <a href={url} target="_blank" rel="noreferrer" key={url}>
                {url}
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
