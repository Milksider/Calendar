import {ImgHTMLAttributes, ReactElement} from "react";

export interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}
