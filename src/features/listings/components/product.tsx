import styles from "~/assets/scss/modules/listings.module.scss";
import { ExternalImg } from "@/image";

type Props = {
    name: string;
    price: Numberish;
};

const Product: React.FC<Props> = ({ name, price }) => {
    return (
        <div className={styles.listing}>
            <div className={styles.image}>
                <div className={styles.overlay}></div>
                <ExternalImg src="https://placeimg.com/640/480/tech" fill />
            </div>
            <div className={styles.content}>
                <p>name: {name}</p>
                <p>price: {price}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque?</p>
                <div>
                    <button>delete</button>
                    <button>edit</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
