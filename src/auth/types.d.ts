import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            svg: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>;
            path: DetailedHTMLProps<HTMLAttributes<SVGPathElement>, SVGPathElement>;
            p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
            span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
            h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            label: DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
            input: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
            button: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            form: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>;
        }
    }
} 