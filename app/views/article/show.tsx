import { Link, Head } from "@inertiajs/react";
import Article from "./article";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import Edit from "./edit";
import { useState } from "react";
import { MoreVertical, Pencil, Trash2, ArrowLeft } from "lucide-react";

import * as routes from "@src/routes";
import { SiteHeader } from "@/frontend/src/components/common/site-header";

export default function Show({ article }: any) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Get display name from common fields
  const getDisplayName = () => {
    return article.title || article.name || article.model_name || `Article #${article.id}`;
  };

  const onDestroy = (e: any) => {
    if (!confirm(`Are you sure you want to delete this ${getDisplayName()}?`)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head title={getDisplayName()} />
      <SiteHeader title="Article" />

      <div className="w-full px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={routes.articles()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to articles
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit article
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={routes.article(article.id)}
                    method="delete"
                    onClick={onDestroy}
                    as="button"
                    className="text-destructive focus:text-destructive w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete article
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Article article={article} />
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <Edit
            article={article}
            isModal={true}
            onSuccess={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
