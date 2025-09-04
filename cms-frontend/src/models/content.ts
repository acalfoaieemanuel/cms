export type Alignment = "left" | "center" | "right";
export type LangCode = "en" | "da" | "sv";

export interface EditorValues {
  language: LangCode;
  image: string;
  text: string;
  textAlignment: Alignment;
}

export interface ContentDto {
  id?: string;
  language: LangCode;
  image: string;
  text: string;
  textAlignment: Alignment;
}
