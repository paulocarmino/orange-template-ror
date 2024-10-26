# orangeTemplate (Rails + Inertia.js + React)

Welcome to my personal Ruby on Rails template, designed to significantly boost productivity for developing MVPs, testing new ideas, or launching micro-SaaS solutions quickly. This setup combines the best of both worlds: the robustness of Rails in the backend with the modern capabilities of React on the frontend, thanks to the magic of Inertia.js.

## Why I Built This Template

I built this template to streamline my workflow using my favorite technologies. Ruby on Rails excels in backend processing, and with Inertia.js, I've seamlessly integrated React to bring in ShadcnUI, my go-to UI library. The default scaffolding wasn't cutting it, so I revamped it to work perfectly with ShadcnUI and TypeScript, allowing me to generate stunning, highly customizable CRUD interfaces with ease. Plus, each scaffold automatically updates a sleek sidebar to keep everything organized—it's a game-changer!

## Features at a Glance

- **🚀 Rails 8**: Harness the latest features of Rails for a powerful backend.
- **⚡ Vite**: Lightning-fast development with instant hot module reloading.
- **🔗 React & Inertia.js**: Smooth SPA-like experiences without the hassle of managing APIs.
- **🎨 TailwindCSS & 🖌️ ShadcnUI**: Quickly design beautiful, responsive UIs with my preferred UI toolkit.
- **🔐 Devise Authentication**: Secure user authentication out of the box.
- **✏️ Custom Scaffolding**: Enhanced generators for CRUD operations with auto-generated, custom data tables and sidebars.
- **🌑 Dark Mode**: Built-in dark mode support for better user experience.
- **🗄️ SQLite**: Simple, zero-configuration database for development.

## Getting Started

### Prerequisites

- **Ruby and Rails 8**: Make sure you have these installed.
- **NodeJS 21.5.0 & Yarn**: For managing JavaScript packages.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/paulocarmino/orange-template-ror YOUR_PROJECT
   cd YOUR_PROJECT
   ```

2. **Install dependencies**:

   ```bash
   bundle install
   yarn install
   ```

3. **Set up the database**:

   ```bash
   rails db:prepare
   ```

4. **Run the application**:

   ```bash
   bin/dev
   ```

5. **Access the application**:

   Navigate to [http://localhost:3100](http://localhost:3100) to view your app.

## Customization

This template is built to be as flexible as it is powerful. Customize components and design patterns to suit your project's unique needs. The enhanced CRUD generators ensure you'll have a beautiful interface ready in no time.

## Contributing

I'd love to see your contributions! If you have ideas for improvements or new features, check out the [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

## License

This project is licensed under the MIT License. Details can be found in the [LICENSE.md](LICENSE.md).

## Acknowledgments

A huge thank you to the creators of the amazing tools and libraries used in this template, making development both fun and efficient.
