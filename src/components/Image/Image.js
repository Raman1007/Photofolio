/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from "./image.module.css";

export default function Image(props) {
	const { image, index, handleImageEdit, handleImageDelete, openLightbox } =
		props;

	return (
		<>
			<div className={styles.imageCard}>
				<div className={styles.imageBox}>
					<img
						src={image.link}
						alt="image"
						onClick={() => openLightbox(index)}
					/>
				</div>
				<div className={styles.imageInfo}>
					{image.name}
					<img
						src="https://stalwart-wisp-382f3c.netlify.app/assets/edit.png"
						className={`${styles.imageBtn}`}
						onClick={() => handleImageEdit(image)}
						alt="update"
						style={{ width: "20%" }}
					></img>
					<img
						src="https://stalwart-wisp-382f3c.netlify.app/assets/trash-bin.png"
						className={`${styles.imageBtn}`}
						onClick={() => handleImageDelete(image)}
						alt="delete"
						style={{ width: "20%" }}
					></img>
				</div>
			</div>
		</>
	);
}
