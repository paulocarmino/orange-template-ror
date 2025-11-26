import { Card, CardContent } from "@ui/card";
import { Badge } from "@ui/badge";
import { Check, X } from "lucide-react";

export default function Article({ article }: any) {
  const formatValue = (value: any) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">Not set</span>;
    }

    // Boolean values
    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? "default" : "secondary"} className="gap-1">
          {value ? (
            <>
              <Check className="h-3 w-3" />
              Yes
            </>
          ) : (
            <>
              <X className="h-3 w-3" />
              No
            </>
          )}
        </Badge>
      );
    }

    // Date values (ISO string format)
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }

    // Default string/number
    return <span className="break-words">{value.toString()}</span>;
  };

  const formatLabel = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Filter out id and timestamps (created_at, updated_at)
  const displayFields = Object.entries(article).filter(
    ([key]) => key !== "id" && !key.match(/_(at)$/)
  );

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayFields.map(([key, value]) => (
            <div key={key} className="space-y-1.5">
              <dt className="text-sm font-medium text-muted-foreground">
                {formatLabel(key)}
              </dt>
              <dd className="text-base">{formatValue(value)}</dd>
            </div>
          ))}
        </div>

        {displayFields.length === 0 && (
          <p className="text-center text-muted-foreground italic py-8">
            No data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
