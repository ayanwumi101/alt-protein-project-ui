export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryEvent = {
  title: string;
  meta: string;
  images: GalleryImage[];
};

const galleryStorageKey = "alt-protein-gallery-events";

export function readUploadedGalleryEvents(): GalleryEvent[] {
  try {
    const stored = localStorage.getItem(galleryStorageKey);
    if (!stored) return [];
    const events = JSON.parse(stored) as unknown;
    if (!Array.isArray(events)) return [];
    return events.filter(isGalleryEvent);
  } catch {
    return [];
  }
}

export function saveUploadedGalleryEvent(event: GalleryEvent) {
  const events = [event, ...readUploadedGalleryEvents()];
  localStorage.setItem(galleryStorageKey, JSON.stringify(events));
}

function isGalleryEvent(value: unknown): value is GalleryEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Record<string, unknown>;
  return (
    typeof event.title === "string" &&
    typeof event.meta === "string" &&
    Array.isArray(event.images) &&
    event.images.every(isGalleryImage)
  );
}

function isGalleryImage(value: unknown): value is GalleryImage {
  if (!value || typeof value !== "object") return false;
  const image = value as Record<string, unknown>;
  return typeof image.src === "string" && typeof image.alt === "string";
}
