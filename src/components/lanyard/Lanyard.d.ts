import type { FC } from "react";

type Vector3Tuple = [number, number, number];

export type LanyardProps = {
  position?: Vector3Tuple;
  gravity?: Vector3Tuple;
  fov?: number;
  transparent?: boolean;
  frontImage?: string;
  backImage?: string;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardColor?: string;
  lanyardWidth?: number;
  anchorPosition?: Vector3Tuple;
  jointPositions?: [Vector3Tuple, Vector3Tuple, Vector3Tuple];
  cardPosition?: Vector3Tuple;
  cardScale?: number;
  stabilizeCard?: boolean;
};

declare const Lanyard: FC<LanyardProps>;

export default Lanyard;
