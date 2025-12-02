import Sharp from "sharp";

interface ImageHandlerOptions {
  imgSize: number;
  quality: number;
  transparent: boolean;
  file?: File;
}

export const handleImage = async ({
  file,
  quality,
  transparent,
  imgSize,
}: ImageHandlerOptions) => {
  try {
    if (!file || !file.type.startsWith("image/")) {
      return null;
    }

    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    let compressedBuffer: Buffer;

    if (transparent && file.type === "image/png") {
      compressedBuffer = await Sharp(uint8Array)
        .rotate()
        .resize(imgSize)
        .png({ quality })
        .toBuffer();
    } else {
      compressedBuffer = await Sharp(uint8Array)
        .rotate()
        .resize(imgSize)
        .jpeg({ quality })
        .toBuffer();
    }

    return {
      buffer: compressedBuffer,
      originalName: file.name,
      mimetype:
        transparent && file.type === "image/png" ? "image/png" : "image/jpeg",
      size: compressedBuffer.length,
    };
  } catch (err) {
    console.error("Error processing image:", err);
    return null;
  }
};
