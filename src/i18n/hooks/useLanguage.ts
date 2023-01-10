import React, { useContext } from "react";
import { Context } from "~/i18n";

const useLanguage = () => {
    return useContext(Context) as Required<React.ContextType<typeof Context>>;
};

export default useLanguage;
