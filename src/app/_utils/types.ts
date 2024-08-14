export interface WorkProps {
    title: string;
    date: string;
    images: {
        src: string;
        alt: string;
    }[];
    content: string;
    links?: {
        text: string;
        url: string;
    }[];
    technologies: string[];
};