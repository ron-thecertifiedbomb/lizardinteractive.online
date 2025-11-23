import Link from "next/dist/client/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="mt-12 py-8 bg-dark-bg text-gray-200">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
                <div className="flex justify-center flex-row items-center mb-2 gap-2">
                    <h3 className="text-xl font-semibold text-white">
                        lizard interactive online
                    </h3>
                    <Link href="/">
                        <Image
                            src="/lizardinteractive.png"
                            alt="logo"
                            width={25}
                            height={25}
                            className="rounded-full"
                            priority
                        />
                    </Link>
                </div>
          
                {/* <p className="text-sm text-gray-200">
                    Built and designed by RonDevSolutions 
                </p> */}

                <p className="text-xs text-gray-200 mt-2">
                    © {new Date().getFullYear()} Lizard Interactive Online. All rights reserved.
                </p>

            </div>
        </footer>
    );
}
