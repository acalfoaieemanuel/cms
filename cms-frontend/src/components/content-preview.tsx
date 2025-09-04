"use client";

import { EditorValues } from "@/models/content";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentPreviewProps {
  values: EditorValues;
}

export default function ContentPreview({ values }: ContentPreviewProps) {
  const { image, text, textAlignment, language } = values;

  const langLabel =
    language === "en" ? "English" : language === "da" ? "Danish" : "Swedish";

  const alignmentClass =
    textAlignment === "center"
      ? "text-center"
      : textAlignment === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>{langLabel} Preview</span>
            <Badge variant="secondary">{language.toUpperCase()}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4"> {/* gap-4 adds spacing */}
          {image ? (
            <img
              src={image}
              alt={`${langLabel} preview`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center rounded-lg bg-muted text-muted-foreground">
              No image
            </div>
          )}
          <p className={alignmentClass}>
            {text || <span className="text-muted-foreground">No text</span>}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
