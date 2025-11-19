import Image from "next/image";
import Link from "next/link";

type GalleryImage = {
    src: string;
    alt: string;
};

type GalleryGridProps = {
    images: GalleryImage[];
    fancybox?: boolean;
    className?: string;

    cols?: {
        base?: number;
        sm?: number;
        lg?: number;
    };

    rowHeight?: number;
    gap?: number;

    pattern?: (index: number) => string | undefined;
};

export default function GalleryGrid({
    images,
    fancybox = true,
    className = "",
    cols = { base: 1, sm: 1, lg: 4 },
    rowHeight = 320,
    gap = 16,
    pattern,
}: GalleryGridProps) {

    // --- CLEAN PATTERN LOGIC ---
    const autoPattern = (index: number) => {
        if (index % 5 === 0) {
            // wide but normal height on desktop
            return "lg:col-span-2 row-span-1";
        }

        if (index % 5 != 0) {
            // big hero box
            return "";
        }

        return 
    };

    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
            <div
                className={`
                    grid
                    grid-cols-${cols.base}
                    sm:grid-cols-${cols.sm}
                    lg:grid-cols-${cols.lg}
                `}
                style={{
                    gap: `${gap}px`,
                    gridAutoRows: `${rowHeight}px`,
                }}
            >
                {images.map((img, index) => {
                    const isLast = index === images.length - 1;

                    // last image = hero 4x2
                    const span = isLast
                        ? "lg:col-span-2 row-span-1"
                        : pattern?.(index) || autoPattern(index);

                    return (
                        <Link
                            key={img.src}
                            href={img.src}
                            {...(fancybox ? { "data-fancybox": "gallery" } : {})}
                            className={`block rounded-xl ${span}`}
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-xl">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    loading={index === 0 ? "eager" : "lazy"}
                                    priority={index === 0}
                                    style={{ aspectRatio: "16 / 9" }}
                                    className=" object-cover transition duration-500 hover:scale-110"
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
