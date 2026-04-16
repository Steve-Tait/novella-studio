export interface ShapeProps {
  size?: number;
  growth?: number;
  edges?: number;
  seed?: string | null;
}
export interface SvgBlobProps
  extends Omit<
    React.SVGAttributes<SVGSVGElement>,
    'viewBox' | 'xmlns' | 'xmlnsXlink'
  > {
  shapeProps?: ShapeProps;
  image?: string;
}

export type Paths = {
  slug: string[];
};

export type MetaProps = {
  params: Promise<Paths>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export type TSubscribeResponse = {
  wasSuccessful: boolean;
  data?: any;
  error?: any;
  fields?: any;
};
export interface TSVGProps {
  className?: string;
}
