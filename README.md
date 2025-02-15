# React Coding Test Solutions

This repository contains solutions to the React coding test questions from the following article:
[Live Coding React Interview Questions](https://dev.to/allenarduino/live-coding-react-interview-questions-2ndh).

Each solution includes:

- **Problem Statement**: A brief description of the problem.
- **Implementation**: A React-based solution to the problem.
- **Testing**: E2E tests to validate the solution.

## Getting Started

### Prerequisites

To run the solutions and tests locally, ensure you have the following installed:

- Node.js (>= 18.0.0)
- npm or yarn or pnpm
- React (>= 18.2.0)

### Installation

Clone this repository and install dependencies:

```sh
git clone https://github.com/your-username/live-coding-react-practice.git
cd live-coding-react-practice
npm install
```

## Running the Solutions

Each problem is solved within the `src/solutions/` directory. You can run the React app to check the implementations by executing:

```sh
npm run dev
```

## Running Tests

E2E tests are written using Playwright. Run the tests with:

```sh
npm test:e2e
```

## Project Structure

```
live-coding-react-practice/
│── src/
│   ├── solutions/     # Solution components
│   ├── tests/        # E2E tests
│   ├── mocks/        # API mocks
│   ├── shared/       # Shared utilities
│   ├── types/        # TypeScript types
│   ├── App.tsx       # Main application file
│   ├── main.tsx      # Entry point
│── README.md         # Project documentation
│── package.json      # Dependencies and scripts
│── vite.config.ts    # Vite configuration
│── playwright.config.ts # Playwright configuration
```

## Contribution

Feel free to submit pull requests for improvements, bug fixes, or additional test cases.

## License

This project is licensed under the MIT License.
