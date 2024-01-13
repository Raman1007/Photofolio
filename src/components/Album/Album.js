import styles from "./album.module.css";
export default function Album(props) {
	var { info, setOpenAlbum } = props;
	function handleClick() {
		setOpenAlbum({ albumId: info.id, open: true });
	}

	return (
		<>
			<div className={styles.cardContainer}>
				<div className={styles.cardImage} onClick={handleClick}></div>
				<div className={styles.cardName}>{info.Albumname}</div>
			</div>
		</>
	);
}
