import styles from "~/assets/scss/components/check-box.module.scss";
type RawProps = React.ComponentPropsWithoutRef<"input">;

type Props = Omit<RawProps, "id" | "type" | "placeholder"> & { id?: Numberish; label: React.ReactNode; name?: string };

const Item: React.FC<Props> = ({ id, label, name, className, ...rest }) => {
    const _id = id + "";

    return (
        <div className={`${styles.root} ${className}`}>
            <input type="checkbox" name={name} className={styles.input} id={_id} {...rest} />
            <label className={styles.label} htmlFor={_id}>
                {label}
            </label>
        </div>
    );
};

export default Item;
