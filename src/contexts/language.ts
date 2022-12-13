import React from "react";

const Language = React.createContext({
    lang: "en",
    set_lang: () => {},
});

export default Language;
