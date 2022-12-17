import useLocalStorage from "~/hooks/useLocalStorage";
import { SUPPORTED_LANGS, LOCAL_STORAGE_LANGUAGE_KEY } from "~/constants";
import { preferred_supported_language } from "~/i18n/utils";

const useLanguage = () => {
    return useLocalStorage<SUPPORTED_LANGS>(LOCAL_STORAGE_LANGUAGE_KEY, preferred_supported_language);
};

export default useLanguage;
