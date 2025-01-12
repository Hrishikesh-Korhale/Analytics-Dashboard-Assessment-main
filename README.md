## Electric Vehicle Dashboard

This project visualizes electric vehicle data using interactive charts. The dashboard includes insights like vehicle distribution by manufacturer, model, and year, as well as type distribution.

### Features

- **Interactive Bar Charts**: View the distribution of electric vehicles by manufacturer and year.
- **Pie Charts**: Analyze the distribution of vehicle types and models.
- **Responsive Design**: The charts adjust seamlessly to different screen sizes.
- **Loading Spinner**: Displays a spinner while the data is being fetched and processed.

### Technologies Used

- **React**: Core framework for building the user interface.
- **Recharts**: Charting library for creating interactive charts.
- **Papaparse**: CSV parsing library to process large datasets efficiently.
- **Material-UI**: For styling and components like the loading spinner.

### Getting Started

#### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above) or yarn

#### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Hrishikesh-Korhale/Analytics-Dashboard-Assessment-main
    cd electric-vehicle-dashboard
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and specify the path to the CSV file:

    ```bash
    REACT_APP_CSV_FILE_PATH=path/to/your/data.csv
    ```

4. Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

The dashboard will be accessible at `http://localhost:3000`.

### File Structure

```bash
src/
├── components/
│   ├── Dashboard.js      # Main dashboard component
│   ├── Chart.js          # Reusable chart component
├── styles/
│   ├── dashboard.css     # Custom styles
├── App.js                # Entry point
├── index.js              # React DOM rendering
public/
├── index.html            # HTML template
.env                      # Environment variables
```

### Usage

The dashboard displays insights about electric vehicles:

- **Bar Chart**: Vehicle distribution by manufacturer.
- **Pie Chart**: Vehicle type and model distribution.
- **Yearly Trends**: Number of vehicles by year.

Interact with charts by hovering over sections to see detailed tooltips.

### Troubleshooting

- **Chart Not Displaying Properly**: Ensure the CSV file is correctly formatted and matches the expected structure.
- **Dependency Errors**: Run `npm install` or `yarn install` to ensure all dependencies are installed.

