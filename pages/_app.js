import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/style.css";
import "font-awesome/css/font-awesome.min.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
