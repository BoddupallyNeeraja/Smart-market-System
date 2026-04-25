# Smart Marketplace Dashboard

A production-ready e-commerce dashboard built with React, JavaScript, Bootstrap 5, Axios, and React Router. The app supports resilient product fetching with multi-level fallbacks, advanced filtering, detailed product views, and persistent cart/wishlist state.

## Project Overview

Smart Marketplace Dashboard is a modular frontend application where users can:

- Browse and search products in a responsive grid
- Filter by category, price range, and rating
- Sort by price, rating, and newest products
- View complete product details using dynamic routes
- Add/remove products in cart and wishlist
- Persist state with localStorage
- Continue working even when APIs fail (fallback strategy)

## Features

- Multi-source product fetch strategy:
  - Primary: [Fake Store API](https://fakestoreapi.com/products)
  - Secondary: [DummyJSON Products](https://dummyjson.com/products)
  - Final fallback: local JSON data (`src/data/products.json`)
- Debounced product search (300ms)
- Real-time filtering and sorting
- Product detail route (`/product/:id`)
- Shopping cart with quantity controls, subtotal and total calculation
- Wishlist management with localStorage
- Bootstrap skeleton loaders and reusable error/empty states
- Toast notifications for cart/wishlist actions
- Lazy-loaded route pages for performance
- Clean, modular folder structure for scalability

## Tech Stack

- React
- JavaScript (ES6+)
- HTML5 / CSS3
- Bootstrap 5
- Axios
- React Router
- localStorage
- Vite

## Installation

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    Navbar/
      Navbar.jsx
    ProductCard/
      ProductCard.jsx
    ProductGrid/
      ProductGrid.jsx
    FilterSidebar/
      FilterSidebar.jsx
    SearchBar/
      SearchBar.jsx
    Loader/
      Loader.jsx
    ErrorMessage/
      ErrorMessage.jsx
    EmptyState/
      EmptyState.jsx
    CartDrawer/
      CartDrawer.jsx
    ToastNotifier/
      ToastNotifier.jsx
  pages/
    Home/
      Home.jsx
    Products/
      Products.jsx
    ProductDetails/
      ProductDetails.jsx
    Cart/
      Cart.jsx
    Wishlist/
      Wishlist.jsx
    About/
      About.jsx
  services/
    api.js
  context/
    CartContext.jsx
    WishlistContext.jsx
  data/
    products.json
  styles/
    global.css
  utils/
    toast.js
    useDebounce.js
  App.jsx
  main.jsx
```

## API Integration Notes

`src/services/api.js` handles all remote data logic:

1. Attempts Fake Store API first
2. Falls back to DummyJSON products if primary fails
3. Falls back to local product JSON if both APIs fail
4. Normalizes all product shapes to a consistent frontend model

This ensures the UI remains usable during API outages/timeouts.

## Routes

- `/` - Home
- `/products` - Product listing + search + filters
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/wishlist` - Wishlist
- `/about` - About page

## Deployment

This app is ready for deployment on:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

Both platforms work out-of-the-box with the existing scripts:

- `npm run build`
- `npm run preview`

## Screenshots

Add your screenshots here after running the app:

- Home page
- Product listing with filters
- Product details page
- Cart page
- Wishlist page

## Future Improvements

- Authentication and user accounts
- Pagination/infinite scrolling for products
- Coupon and checkout flow integration
- Unit/integration tests (Vitest + React Testing Library)
- Dark mode toggle

