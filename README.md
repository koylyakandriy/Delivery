# DeliveryApp

A food delivery mobile app built with **React Native**, **Expo Router** and **TypeScript**. It covers the core ordering flow: browse restaurants, open a menu, add dishes to a basket and place an order.

## Features

- **Home feed** with categories, "Top picks" and "Offers near you" carousels, and a search bar
- **Restaurant page** with a parallax header and sticky, animated category tabs (Reanimated)
- **Dish modal** to add items to the basket
- **Basket** with item list, subtotal, service and delivery fees, and an order confirmation screen
- **Filters modal** with animated checkboxes
- **Location search** with Google Places autocomplete and a map (react-native-maps)
- **Bottom sheet** to switch between delivery and pickup and confirm the delivery location
- **Global state** for the basket with Zustand

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React Native 0.72, Expo SDK 49, Expo Router (file-based routing, modals) |
| Language | TypeScript |
| State | Zustand |
| Animation and gestures | React Native Reanimated, Gesture Handler, @gorhom/bottom-sheet |
| Maps and places | react-native-maps, react-native-google-places-autocomplete |
| Testing | Jest (jest-expo preset) |

## Project structure

```
app/            Screens and routes (Expo Router)
  (modal)/      Modal routes: dish, filter, location search
components/     Reusable UI: header, search bar, categories, restaurants, bottom sheet
constants/      Colors and shared constants
assets/data/    Mock data for restaurants, menu and filters
```

## Getting started

```bash
git clone https://github.com/koylyakandriy/Delivery.git
cd Delivery
npm install
cp example.env .env   # add your Google Places API key
npx expo start
```

Open the app in Expo Go on your phone, or in an iOS simulator or Android emulator.

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_GOOGLE_API_KEY` | Google Places API key for location search |

## What I focused on

- Smooth native-feeling interactions: parallax scrolling, animated sticky tabs and a bottom sheet
- Typed navigation and modals with Expo Router
- Small, focused global store for the basket instead of prop drilling
