import type { IncomingMessage, ServerResponse } from "node:http";

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  format?: string;
};

type CloudinaryResponse = {
  resources?: CloudinaryResource[];
  next_cursor?: string;
};

type GalleryImage = { src: string; alt: string };
type GalleryEvent = { title: string; meta: string; images: GalleryImage[] };

const galleryRoot = "alt-protein-gallery";

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  response.setHeader("Content-Type", "application/json");
  response.setHeader(
    "Cache-Control",
    "s-maxage=60, stale-while-revalidate=300",
  );

  if (request.method !== "GET") {
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const {
    CLOUDINARY_CLOUD_NAME: cloudName,
    CLOUDINARY_API_KEY: apiKey,
    CLOUDINARY_API_SECRET: apiSecret,
  } = process.env;
  if (!cloudName || !apiKey || !apiSecret) {
    response.statusCode = 500;
    response.end(
      JSON.stringify({ error: "Cloudinary server configuration is missing." }),
    );
    return;
  }

  try {
    const events = await getGalleryEvents(cloudName, apiKey, apiSecret);
    response.statusCode = 200;
    response.end(JSON.stringify({ events }));
  } catch (error) {
    response.statusCode = 502;
    response.end(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unable to fetch gallery images.",
      }),
    );
  }
}

async function getGalleryEvents(
  cloudName: string,
  apiKey: string,
  apiSecret: string,
) {
  const resources: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const params = new URLSearchParams({
      type: "upload",
      prefix: `${galleryRoot}/`,
      max_results: "500",
    });
    if (nextCursor) params.set("next_cursor", nextCursor);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?${params}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
      },
    );
    if (!cloudinaryResponse.ok) {
      throw new Error(`Cloudinary returned ${cloudinaryResponse.status}.`);
    }

    const result = (await cloudinaryResponse.json()) as CloudinaryResponse;
    resources.push(...(result.resources ?? []));
    nextCursor = result.next_cursor;
  } while (nextCursor);

  const grouped = new Map<string, GalleryEvent>();
  resources.forEach((resource) => {
    const folder = resource.public_id.split("/")[1];
    if (!folder || !resource.secure_url) return;
    const { title, tags } = parseFolderName(folder);
    const event = grouped.get(folder) ?? {
      title,
      meta: tags ? `Uploaded gallery · ${tags}` : "Uploaded gallery",
      images: [],
    };
    event.images.push({
      src: resource.secure_url,
      alt: `${title} moment ${event.images.length + 1}`,
    });
    grouped.set(folder, event);
  });

  return [...grouped.values()];
}

function parseFolderName(folder: string) {
  const [titleSlug, tagsSlug] = folder.split("__");
  return {
    title: titleSlug.split("-").filter(Boolean).map(capitalize).join(" "),
    tags: tagsSlug?.split("-").filter(Boolean).join(", ") ?? "",
  };
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
