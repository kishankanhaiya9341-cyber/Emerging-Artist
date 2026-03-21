# Emerging Artist

## Current State
Single-page React/TypeScript app with Hero, Services, Book Your Project, Store, Cart, Team, and Admin sections. Bookings are saved to localStorage. No client login or account system exists.

## Requested Changes (Diff)

### Add
- Client account system using localStorage (register with name, email, password)
- Login / Sign Up buttons in the navigation bar (top right)
- Login / Sign Up popup modal (toggle between login and signup views)
- After login: profile greeting "Hi, [Name]" in the nav with a logout option
- Client dashboard accessible after login with three tabs:
  - Booking History: shows all bookings tied to the logged-in client's email
  - Exclusive Content: locked section with tips/resources only visible to logged-in clients
  - Order Status: shows status (pending/in_progress/done) of client's bookings
- When a logged-in client submits the booking form, the booking is tagged with their userId/email
- Bookings in admin panel and client dashboard are linked by email

### Modify
- BookingEntry type to include optional `clientEmail` field
- saveBooking function to accept and store `clientEmail`
- Booking form submission to pass logged-in client's email
- Navbar to show login/signup buttons OR profile info based on auth state

### Remove
- Nothing removed

## Implementation Plan
1. Add `ClientUser` type and localStorage helpers (loadUsers, saveUser, getLoggedInUser, logoutUser)
2. Add `clientEmail` field to BookingEntry and update saveBooking
3. Add auth state to App component (currentUser)
4. Build AuthModal component (login/signup toggle)
5. Add Login/Signup buttons to navbar; show profile greeting + logout when logged in
6. Build ClientDashboard component (Booking History, Exclusive Content, Order Status tabs)
7. Wire booking form to tag submissions with logged-in user's email
