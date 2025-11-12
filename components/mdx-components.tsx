import { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        img: (props) => <Image sizes="100vw" {...(props as ImageProps)} />
    }
};
