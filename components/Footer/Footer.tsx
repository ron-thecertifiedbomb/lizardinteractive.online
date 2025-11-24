import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-4 bg-dark-bg text-gray-200">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-3">

                <div className="flex justify-center items-center gap-2">
                    <h3 className="text-xs sm:text-sm md:text-md lg:text-lg font-semibold text-white">
                        Lizard Interactive Online
                    </h3>

                    <Link href="/">
                        <Image
                            src="/lizardinteractive.png"
                            alt="logo"
                            width={24}
                            height={24}
                            className="
        rounded-full
        w-4 h-4        /* mobile */
        sm:w-4 sm:h-4  /* small screens */ *:{ ButtonHTMLAttributes
        md:w-5 md:h-5  /* medium */
        lg:w-6 lg:h-6   /* large screens */
    "
                            priority
                        />
                    </Link>
                </div>

                <p className="text-xs sm:text-sm md:text-md lg:text-lg  text-gray-300">
                    © {new Date().getFullYear()} Lizard Interactive Online. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
