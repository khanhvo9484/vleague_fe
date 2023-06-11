import { library } from "@fortawesome/fontawesome-svg-core";
import { faFutbol, faShoePrints } from "@fortawesome/free-solid-svg-icons";

export const initializeFontAwesome = () => {
  // Add the desired Font Awesome icons to the library
  library.add(faFutbol, faShoePrints);
};
