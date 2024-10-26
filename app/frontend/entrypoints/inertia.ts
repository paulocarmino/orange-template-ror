import { createInertiaApp } from "@inertiajs/react";
import { createElement, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import TemplateDefault from "@components/template";
import { ThemeProvider } from "../src/providers/theme-provider";
import { CableProvider } from "../src/providers/cable-provider";

type Component = {
  default: ReactNode & { layout?: (page: ReactNode) => ReactNode };
};

createInertiaApp({
  progress: {
    color: "#e97c2a",
  },
  resolve: (name) => {
    const pages = import.meta.glob("../../views/**/*.tsx", { eager: true });

    const page = pages[`../../views/${name}.tsx`] as Component;
    page.default.layout ||= (page) =>
      createElement(TemplateDefault, null, page);
    return page;
  },

  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      createElement(CableProvider, {
        children: createElement(ThemeProvider, {
          children: createElement(App, props),
        }),
      })
    );
  },
});
