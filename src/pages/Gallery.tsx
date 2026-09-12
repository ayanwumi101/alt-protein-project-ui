import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseCircle, DocumentDownload, Maximize4 } from "iconsax-react";
import { Reveal } from "../components/Reveal";
import {
  readUploadedGalleryEvents,
  type GalleryEvent,
  type GalleryImage,
} from "../data/galleryStorage";

const events: GalleryEvent[] = [
  {
    title: "Campus conversations",
    meta: "University of Ibadan · 2024",
    images: [
      {
        src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85",
        alt: "Students collaborating around a table",
      },
      {
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85",
        alt: "Community discussion in a bright room",
      },
      {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85",
        alt: "Team meeting in a creative workspace",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
        alt: "People sharing ideas during an event",
      },
    ],
  },
  {
    title: "Research in motion",
    meta: "Labs, learning, and open questions",
    images: [
      {
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
        alt: "Researcher working in a laboratory",
      },
      {
        src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
        alt: "Laboratory glassware and research equipment",
      },
      {
        src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
        alt: "Scientists collaborating in a lab",
      },
    ],
  },
  {
    title: "Building the movement",
    meta: "Outreach · Partnerships · Community",
    images: [
      {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
        alt: "Speaker addressing an audience",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
        alt: "People gathered at a community event",
      },
      {
        src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85",
        alt: "Friends connecting at an outdoor event",
      },
    ],
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [uploadedEvents, setUploadedEvents] = useState<GalleryEvent[]>(
    readUploadedGalleryEvents,
  );
  useEffect(() => {
    async function loadUploadedEvents() {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) return;
        const result = (await response.json()) as {
          events?: GalleryEvent[];
        };
        if (result.events?.length) setUploadedEvents(result.events);
      } catch {
        // Local storage remains the development fallback when the API is unavailable.
      }
    }
    void loadUploadedEvents();
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const download = async (image: GalleryImage) => {
    const response = await fetch(image.src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `alt-protein-${image.alt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}.jpg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const allEvents = [...uploadedEvents, ...events];

  return (
    <main className="gallery-page">
      <section className="page-hero shell">
        <div className="eyebrow">
          <span className="eyebrow-line" /> Gallery · In the field
        </div>
        <h1>
          Moments worth
          <br />
          <em>remembering.</em>
        </h1>
        <p className="page-intro">
          A visual archive of the people, places, and conversations shaping a
          better food system.
        </p>
      </section>
      <section className="gallery-events shell">
        {allEvents.map((event) => (
          <section className="gallery-event" key={event.title}>
            <Reveal className="gallery-event-heading">
              <div>
                <div className="section-label">{event.meta}</div>
                <h2>{event.title}</h2>
              </div>
              <span>
                {String(event.images.length).padStart(2, "0")} moments
              </span>
            </Reveal>
            <div className="gallery-grid">
              {event.images.map((image, index) => (
                <Reveal
                  className={`gallery-card gallery-card-${index + 1}`}
                  key={image.src}
                >
                  <div
                    className="gallery-card-image-button"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(image);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        setSelected(image);
                      }
                    }}
                    aria-label={`View ${image.alt}`}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </div>
                  <div className="gallery-card-overlay">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelected(image);
                      }}
                      aria-label={`View ${image.alt}`}
                    >
                      <Maximize4
                        color="currentColor"
                        size={20}
                        variant="Linear"
                      />
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        void download(image);
                      }}
                      aria-label={`Download ${image.alt}`}
                    >
                      <DocumentDownload
                        color="currentColor"
                        size={20}
                        variant="Linear"
                      />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </section>
      {selected &&
        createPortal(
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.alt}
            onClick={() => setSelected(null)}
          >
            <button
              className="gallery-modal-close"
              onClick={(event) => {
                event.stopPropagation();
                setSelected(null);
              }}
              aria-label="Close image viewer"
            >
              <CloseCircle color="currentColor" size={30} variant="Linear" />
            </button>
            <img
              src={selected.src}
              alt={selected.alt}
              className="gallery-modal-image"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </main>
  );
}
